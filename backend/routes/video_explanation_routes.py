# routes/video_explanation_routes.py

import logging
import os

from flask import Blueprint, jsonify, request
from google.cloud.firestore import Client
from werkzeug.exceptions import HTTPException

from auth import verify_bearer_token
from error_codes import ErrorCode, json_error
from repositories.daily_challenge_repo import DailyChallengeRepo
from repositories.video_explanation_repo import VideoExplanationRepo
from utils.rate_limiter import limiter
from validators import validate_date, validate_youtube_url

logger = logging.getLogger(__name__)

# 地圖 ID 白名單
ALLOWED_MAP_IDS = [
    "jp-urban",
    "jp-balanced",
    "world-theworld",
    "world-acw",
    "world-figsy",
    "tw-balanced",
    "tw-urban",
]

VIDEO_ADMIN_TOKEN = os.getenv("VIDEO_EXPLANATIONS_ADMIN_TOKEN", "")


def _validate_maps(maps, date, daily_challenge_repo):
    """驗證並過濾地圖資料。

    Returns:
        (valid_maps, error_response): error_response 為 None 表示驗證通過
    """
    valid_maps = {}

    for map_id, map_data in maps.items():
        if map_id not in ALLOWED_MAP_IDS:
            allowed = ", ".join(ALLOWED_MAP_IDS)
            return None, json_error(400, ErrorCode.INVALID_FIELD, f"Invalid map ID: '{map_id}'. Allowed: {allowed}")

        if not isinstance(map_data, dict):
            return None, json_error(400, ErrorCode.INVALID_FORMAT, f"Map data for '{map_id}' must be an object")

        livestream = map_data.get("livestream", "")
        explanation = map_data.get("explanation", "")

        # 跳過所有欄位都是空字串的地圖
        if not livestream and not explanation:
            logger.info(f"⏭️  跳過 {map_id}（所有欄位為空）")
            continue

        # 驗證 YouTube URL 格式
        for field_name in ("livestream", "explanation"):
            value = map_data.get(field_name, "")
            if value and not validate_youtube_url(value):
                return None, json_error(
                    400,
                    ErrorCode.INVALID_FORMAT,
                    f"Invalid URL format for {field_name} in '{map_id}'. Must be a YouTube URL",
                )

        # 查找對應的 challengeUrl
        challenge_url = daily_challenge_repo.lookup_challenge_url(date, map_id)
        if not challenge_url:
            return None, json_error(
                404,
                ErrorCode.NOT_FOUND,
                f"Cannot find challengeUrl for date '{date}', map '{map_id}' in daily_challenge",
            )

        map_data["challengeUrl"] = challenge_url
        valid_maps[map_id] = map_data

    if not valid_maps:
        return None, json_error(400, ErrorCode.INVALID_FIELD, "No valid map data provided. All maps have empty fields.")

    return valid_maps, None


def init_video_explanation_routes(app, db: Client):  # noqa: C901
    bp = Blueprint("video_explanation", __name__, url_prefix="/api")
    repo = VideoExplanationRepo(db)
    daily_challenge_repo = DailyChallengeRepo(db)

    @bp.route("/video-explanations", methods=["GET"])
    def get_video_explanations():
        """取得所有日期的影片資料"""
        try:
            logger.info("📹 讀取影片說明資料")
            result = repo.get_all()
            logger.info(f"✅ 成功讀取 {len(result)} 個日期的影片資料")
            return jsonify(result), 200

        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"❌ 讀取影片說明資料失敗: {e}", exc_info=True)
            return json_error(500, ErrorCode.INTERNAL_ERROR, "Internal server error")

    @bp.route("/video-explanations", methods=["POST"])
    @limiter.limit("10 per minute")
    def update_video_explanations():
        """新增或更新特定日期的影片資料（部分更新）"""
        try:
            # 1. 權限驗證
            auth_header = request.headers.get("Authorization", "")
            if not verify_bearer_token(auth_header, VIDEO_ADMIN_TOKEN):
                logger.warning("未授權的影片資料更新嘗試")
                return json_error(401, ErrorCode.UNAUTHORIZED, "Invalid or missing token")

            # 2. 解析 body + 基本欄位檢查
            data = request.get_json()
            if not data:
                return json_error(400, ErrorCode.MISSING_FIELD, "Request body is required")

            date = data.get("date", "").strip()
            maps = data.get("maps", {})

            if not date:
                return json_error(400, ErrorCode.MISSING_FIELD, "Field 'date' is required")
            if not maps or not isinstance(maps, dict):
                return json_error(400, ErrorCode.MISSING_FIELD, "Field 'maps' is required and must be an object")

            # 3. 驗證日期格式
            if not validate_date(date):
                return json_error(400, ErrorCode.INVALID_FORMAT, "Invalid date format. Expected YYYY-MM-DD")

            # 4. 驗證地圖資料
            valid_maps, error_response = _validate_maps(maps, date, daily_challenge_repo)
            if error_response:
                return error_response

            # 5. 寫入 Firestore
            repo.save(date, valid_maps)

            logger.info(f"✅ 已更新 {date} 的影片資料（{len(valid_maps)} 個地圖）")
            return jsonify(
                {
                    "success": True,
                    "message": f"Video explanations updated for {date}",
                    "date": date,
                    "updated_maps": list(valid_maps.keys()),
                }
            ), 200

        except HTTPException:
            raise
        except Exception as e:
            logger.error(f"❌ 更新影片說明資料失敗: {e}", exc_info=True)
            return json_error(500, ErrorCode.INTERNAL_ERROR, "Internal server error")

    app.register_blueprint(bp)
