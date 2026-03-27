# routes/video_explanation_routes.py

import logging
import os
import re
from datetime import datetime

from flask import Blueprint, jsonify, request
from google.cloud.firestore import Client

from auth import verify_bearer_token
from config import get_collection_name

logger = logging.getLogger(__name__)


def init_video_explanation_routes(app, db: Client):
    bp = Blueprint("video_explanation", __name__, url_prefix="/api")

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

    def validate_date(date_str):
        """驗證日期格式 YYYY-MM-DD"""
        try:
            datetime.strptime(date_str, "%Y-%m-%d")
            return True
        except ValueError:
            return False

    def validate_youtube_url(url):
        """驗證 YouTube URL 格式"""
        if url == "":
            return True
        pattern = r"^https://(www\.)?(youtube\.com|youtu\.be)/.*$"
        return bool(re.match(pattern, url))

    def validate_map_entry(map_data):
        """驗證地圖資料至少有一個非空欄位"""
        livestream = map_data.get("livestream", "")
        explanation = map_data.get("explanation", "")

        if not livestream and not explanation:
            return False
        return True

    def lookup_challenge_url(date, map_id):
        """從 daily_challenge 查找對應的 challengeUrl"""
        month = date[:7]  # "2026-01-15" → "2026-01"
        day = date[8:]    # "2026-01-15" → "15"

        collection_name = get_collection_name("daily_challenge")
        doc = db.collection(collection_name).document(month).get()
        if not doc.exists:
            return None

        data = doc.to_dict()
        entries = data.get(day, [])
        if not isinstance(entries, list):
            return None

        for entry in entries:
            if entry.get("mapId") == map_id:
                return entry.get("challengeUrl")
        return None

    @bp.route("/video-explanations", methods=["GET"])
    def get_video_explanations():
        """
        取得所有日期的影片資料

        Returns:
            JSON: {
                "2026-01-15": {
                    "tw-urban": {
                        "livestream": "...",
                        "explanation": "..."
                    }
                }
            }
        """
        try:
            collection_name = get_collection_name("video_explanations")
            logger.info(f"📹 讀取影片說明資料: {collection_name}")

            result = {}
            docs = db.collection(collection_name).stream()

            for doc in docs:
                date = doc.id
                maps_data = doc.to_dict()
                if maps_data:
                    result[date] = maps_data

            logger.info(f"✅ 成功讀取 {len(result)} 個日期的影片資料")
            return jsonify(result), 200

        except Exception as e:
            logger.error(f"❌ 讀取影片說明資料失敗: {e}", exc_info=True)
            return jsonify({"error": "Internal server error"}), 500

    @bp.route("/video-explanations", methods=["POST"])
    def update_video_explanations():
        """
        新增或更新特定日期的影片資料（部分更新）

        空白欄位會被忽略，只更新有提供值的地圖

        Request Body:
            {
                "date": "2026-01-15",
                "maps": {
                    "tw-urban": {
                        "livestream": "https://...",
                        "explanation": "https://..."
                    },
                    "jp-balanced": {
                        "livestream": "",
                        "explanation": ""
                    }  // 此地圖會被忽略（兩個欄位都是空字串）
                }
            }

        Returns:
            JSON: {"success": true, "message": "...", "date": "...", "updated_maps": [...]}
        """
        try:
            # 權限驗證
            auth_header = request.headers.get("Authorization", "")
            if not verify_bearer_token(auth_header, VIDEO_ADMIN_TOKEN):
                logger.warning("未授權的影片資料更新嘗試")
                return (
                    jsonify({"error": "Unauthorized", "message": "Invalid or missing token"}),
                    401,
                )

            data = request.get_json()

            # 驗證必填欄位
            if not data:
                return (
                    jsonify({"error": "Bad Request", "message": "Request body is required"}),
                    400,
                )

            date = data.get("date", "").strip()
            maps = data.get("maps", {})

            if not date:
                return (
                    jsonify({"error": "Bad Request", "message": "Field 'date' is required"}),
                    400,
                )

            if not maps or not isinstance(maps, dict):
                return (
                    jsonify(
                        {
                            "error": "Bad Request",
                            "message": "Field 'maps' is required and must be an object",
                        }
                    ),
                    400,
                )

            # 驗證日期格式
            if not validate_date(date):
                return (
                    jsonify(
                        {
                            "error": "Bad Request",
                            "message": "Invalid date format. Expected YYYY-MM-DD",
                        }
                    ),
                    400,
                )

            # 過濾並驗證地圖資料
            valid_maps = {}

            for map_id, map_data in maps.items():
                # 驗證地圖 ID
                if map_id not in ALLOWED_MAP_IDS:
                    return (
                        jsonify(
                            {
                                "error": "Bad Request",
                                "message": f"Invalid map ID: '{map_id}'. Allowed: {', '.join(ALLOWED_MAP_IDS)}",
                            }
                        ),
                        400,
                    )

                # 驗證地圖資料格式
                if not isinstance(map_data, dict):
                    return (
                        jsonify(
                            {
                                "error": "Bad Request",
                                "message": f"Map data for '{map_id}' must be an object",
                            }
                        ),
                        400,
                    )

                livestream = map_data.get("livestream", "")
                explanation = map_data.get("explanation", "")

                # 跳過所有欄位都是空字串的地圖
                if not livestream and not explanation:
                    logger.info(f"⏭️  跳過 {map_id}（所有欄位為空）")
                    continue

                # 驗證 URL 格式
                if livestream and not validate_youtube_url(livestream):
                    return (
                        jsonify(
                            {
                                "error": "Bad Request",
                                "message": f"Invalid URL format for livestream in '{map_id}'. Must be a YouTube URL",
                            }
                        ),
                        400,
                    )

                if explanation and not validate_youtube_url(explanation):
                    return (
                        jsonify(
                            {
                                "error": "Bad Request",
                                "message": f"Invalid URL format for explanation in '{map_id}'. Must be a YouTube URL",
                            }
                        ),
                        400,
                    )

                # 查找對應的 challengeUrl
                challenge_url = lookup_challenge_url(date, map_id)
                if not challenge_url:
                    return (
                        jsonify(
                            {
                                "error": "Not Found",
                                "message": f"Cannot find challengeUrl for date '{date}',"
                                f" map '{map_id}' in daily_challenge",
                            }
                        ),
                        404,
                    )

                map_data["challengeUrl"] = challenge_url

                # 加入有效地圖列表
                valid_maps[map_id] = map_data

            # 如果沒有任何有效的地圖資料，返回錯誤
            if not valid_maps:
                return (
                    jsonify(
                        {
                            "error": "Bad Request",
                            "message": "No valid map data provided. All maps have empty fields.",
                        }
                    ),
                    400,
                )

            # 寫入 Firestore（使用 merge=True 進行部分更新）
            collection_name = get_collection_name("video_explanations")
            doc_ref = db.collection(collection_name).document(date)
            doc_ref.set(valid_maps, merge=True)

            logger.info(f"✅ 已更新 {date} 的影片資料（{len(valid_maps)} 個地圖）")

            return (
                jsonify(
                    {
                        "success": True,
                        "message": f"Video explanations updated for {date}",
                        "date": date,
                        "updated_maps": list(valid_maps.keys()),
                    }
                ),
                200,
            )

        except Exception as e:
            logger.error(f"❌ 更新影片說明資料失敗: {e}", exc_info=True)
            return jsonify({"error": "Internal server error"}), 500

    app.register_blueprint(bp)
