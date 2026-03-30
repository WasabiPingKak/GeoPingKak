# routes/daily_challenge_writer.py

import logging
import os
from datetime import datetime, timedelta, timezone

from flask import Blueprint, jsonify, request

from auth import verify_bearer_token
from error_codes import ErrorCode, json_error
from repositories.daily_challenge_repo import DailyChallengeRepo
from services.geoguessr_challenge import create_challenge
from utils.rate_limiter import limiter

logger = logging.getLogger(__name__)
bp = Blueprint("daily_challenge_writer", __name__, url_prefix="/api")

ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "")

# ✅ 地圖對應表
DAILY_MAPS = {
    "world": [
        {"mapId": "world-theworld", "map": "66014417ff2366aa9a7504df"},
        {"mapId": "world-figsy", "map": "6983611e411dbe3f3b2a8c5b"},
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
    repo = DailyChallengeRepo(db)

    @bp.route("/admin/update-daily-challenge", methods=["POST"])
    @limiter.limit("10 per minute")
    def update_daily_challenge():
        # 驗證 API 金鑰
        auth_header = request.headers.get("Authorization", "")
        if not verify_bearer_token(auth_header, ADMIN_API_KEY):
            return json_error(401, ErrorCode.UNAUTHORIZED, "Invalid or missing token")

        # 驗證 country
        body = request.get_json()
        if not body:
            return json_error(400, ErrorCode.MISSING_FIELD, "Request body is required")
        country = body.get("country")
        if country not in DAILY_MAPS:
            return json_error(400, ErrorCode.INVALID_FIELD, f"Invalid country: {country}")

        # ✅ 使用台灣時區（UTC+8）取得當地時間
        now_utc = datetime.now(timezone.utc)
        tz_tw = timezone(timedelta(hours=8))
        now_tw = now_utc.astimezone(tz_tw)

        year_month = now_tw.strftime("%Y-%m")
        day_key = now_tw.strftime("%d")
        created_at = now_tw.isoformat()

        existing_data = repo.read_day_entries(year_month, day_key)
        updated_list = existing_data.copy()

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
            repo.write_day_entries(year_month, day_key, updated_list)
            return jsonify({"status": "ok", "count": len(updated_list)})
        except Exception:
            logger.error("🔥 寫入 Firestore 失敗", exc_info=True)
            return json_error(500, ErrorCode.INTERNAL_ERROR, "Firestore write failed")

    app.register_blueprint(bp)
