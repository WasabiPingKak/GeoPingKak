# routes/daily_challenge_writer.py

import os
import logging
from flask import Blueprint, request, jsonify
from datetime import datetime, timezone, timedelta

from services.geoguessr_challenge import create_challenge

logger = logging.getLogger(__name__)
bp = Blueprint("daily_challenge_writer", __name__)

ADMIN_API_KEY = os.getenv("ADMIN_API_KEY")

# ✅ 地圖對應表
DAILY_MAPS = {
    "world": [
        {"mapId": "the-world", "map": "66014417ff2366aa9a7504df"},
        {"mapId": "ACW", "map": "62a44b22040f04bd36e8a914"},
    ],
    "tw": [
        {"mapId": "tw-urban", "map": "628ba06e86224535a5956cae"},
        {"mapId": "tw-balanced", "map": "634ed0789d28f1547612b2cd"},
    ],
    "jp": [
        {"mapId": "jp-urban", "map": "679df3ca311b366ecb41e41b"},
        {"mapId": "jp-balanced", "map": "631a309ba54a618fca31960a"},
    ],
    "my": [
        {"mapId": "my-balanced", "map": "634050c7fc09dbb1e6c107c6"},
    ],
    "hk": [
        {"mapId": "hk-main", "map": "62ada63d0e12bba96e27fe40"},
    ],
}


def init_daily_challenge_writer_route(app, db):
    @bp.route("/api/admin/update-daily-challenge", methods=["POST"])
    def update_daily_challenge():
        # 驗證 API 金鑰
        auth_header = request.headers.get("Authorization", "")
        if (
            not auth_header.startswith("Bearer ")
            or auth_header.split(" ", 1)[1] != ADMIN_API_KEY
        ):
            return jsonify({"error": "Unauthorized"}), 401

        # 驗證 country
        body = request.get_json()
        country = body.get("country")
        if country not in DAILY_MAPS:
            return jsonify({"error": f"Invalid country: {country}"}), 400

        # ✅ 使用台灣時區（UTC+8）取得當地時間
        now_utc = datetime.now(timezone.utc)
        tz_tw = timezone(timedelta(hours=8))
        now_tw = now_utc.astimezone(tz_tw)

        year_month = now_tw.strftime("%Y-%m")
        day_key = now_tw.strftime("%d")
        created_at = now_tw.isoformat()

        # Firestore 文件與欄位參考
        doc_ref = db.collection("daily_challenge").document(year_month)
        doc_snapshot = doc_ref.get()
        existing_data = (
            doc_snapshot.to_dict().get(day_key, []) if doc_snapshot.exists else []
        )

        updated_list = existing_data.copy()
        map_id_set = {entry["mapId"] for entry in existing_data}

        # 執行每張地圖挑戰
        for item in DAILY_MAPS[country]:
            map_id = item["mapId"]
            challenge_url = create_challenge(item["map"])
            if not challenge_url:
                logger.warning(f"❌ mapId={map_id} 建立失敗，略過")
                continue

            # 移除舊的相同 mapId
            updated_list = [e for e in updated_list if e["mapId"] != map_id]

            updated_list.append(
                {
                    "country": country,
                    "mapId": map_id,
                    "challengeUrl": challenge_url,
                    "createdAt": created_at,
                }
            )

        # 寫入 Firestore
        try:
            doc_ref.set({day_key: updated_list}, merge=True)
            return jsonify({"status": "ok", "count": len(updated_list)})
        except Exception:
            logger.error("🔥 寫入 Firestore 失敗", exc_info=True)
            return jsonify({"error": "Firestore write failed"}), 500

    app.register_blueprint(bp)
