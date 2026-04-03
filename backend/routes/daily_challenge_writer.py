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
        if not body or not isinstance(body, dict):
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
        failed_maps = []

        # 執行每張地圖挑戰
        for item in DAILY_MAPS[country]:
            map_id = item["mapId"]
            result = create_challenge(item["map"])
            if not result.url:
                logger.warning(
                    "Challenge creation failed for map",
                    extra={
                        "event": "daily_challenge_update",
                        "map_id": map_id,
                        "failure_reason": result.failure.value if result.failure else "unknown",
                    },
                )
                failed_maps.append({"mapId": map_id, "reason": result.failure.value if result.failure else "unknown"})
                continue

            # 移除舊的相同 mapId
            updated_list = [e for e in updated_list if e["mapId"] != map_id]

            updated_list.append(
                {
                    "country": country,
                    "mapId": map_id,
                    "challengeUrl": result.url,
                    "createdAt": created_at,
                }
            )

        total_maps = len(DAILY_MAPS[country])
        all_failed = len(failed_maps) == total_maps

        success_count = total_maps - len(failed_maps)
        outcome = "success" if not failed_maps else ("all_failed" if all_failed else "partial")

        # 全部失敗：不寫入 Firestore，回 502
        if all_failed:
            logger.error(
                "Daily challenge update failed",
                extra={
                    "event": "daily_challenge_update",
                    "outcome": outcome,
                    "country": country,
                    "success_count": 0,
                    "fail_count": len(failed_maps),
                },
            )
            return (
                jsonify(
                    {
                        "error_code": ErrorCode.UPSTREAM_FAILURE.value,
                        "error": "Bad Gateway",
                        "message": "All challenge creations failed",
                        "failed_maps": failed_maps,
                    }
                ),
                502,
            )

        # 寫入 Firestore（全成功或部分成功）
        try:
            repo.write_day_entries(year_month, day_key, updated_list)
        except Exception:
            logger.error(
                "Firestore write failed",
                exc_info=True,
                extra={"event": "daily_challenge_update", "outcome": "firestore_error", "country": country},
            )
            return json_error(500, ErrorCode.INTERNAL_ERROR, "Firestore write failed")

        logger.info(
            "Daily challenge update completed",
            extra={
                "event": "daily_challenge_update",
                "outcome": outcome,
                "country": country,
                "success_count": success_count,
                "fail_count": len(failed_maps),
            },
        )

        if failed_maps:
            return jsonify({"status": "partial", "count": len(updated_list), "failed_maps": failed_maps})

        return jsonify({"status": "ok", "count": len(updated_list)})

    app.register_blueprint(bp)
