# routes/video_explanation_routes.py

from flask import Blueprint, request, jsonify
from google.cloud.firestore import Client
from datetime import datetime
import os
import hmac
import re
import logging

from config import get_collection_name

logger = logging.getLogger(__name__)


def init_video_explanation_routes(app, db: Client):
    bp = Blueprint("video_explanation", __name__, url_prefix="/api")

    # 地圖 ID 白名單
    ALLOWED_MAP_IDS = [
        "jp-urban",
        "jp-balanced",
        "the-world",
        "world-ACW",
        "tw-balanced",
        "tw-urban",
    ]

    def verify_token(request):
        """驗證 Bearer Token"""
        auth_header = request.headers.get("Authorization", "")

        if not auth_header.startswith("Bearer "):
            return False

        provided_token = auth_header[7:]  # Remove 'Bearer ' prefix
        correct_token = os.getenv("VIDEO_EXPLANATIONS_ADMIN_TOKEN", "")

        if not correct_token:
            logger.error("❌ VIDEO_EXPLANATIONS_ADMIN_TOKEN 環境變數未設定")
            return False

        # Constant-time comparison
        return hmac.compare_digest(provided_token, correct_token)

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
        新增或更新特定日期的影片資料（覆蓋式更新）

        Request Body:
            {
                "date": "2026-01-15",
                "maps": {
                    "tw-urban": {
                        "livestream": "https://...",
                        "explanation": "https://..."
                    }
                }
            }

        Returns:
            JSON: {"success": true, "message": "...", "date": "..."}
        """
        try:
            # 🔐 權限驗證
            if not verify_token(request):
                logger.warning("⚠️ 未授權的影片資料更新嘗試")
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

            # 驗證地圖 ID 和資料
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

                # 驗證至少有一個非空欄位
                if not validate_map_entry(map_data):
                    return (
                        jsonify(
                            {
                                "error": "Bad Request",
                                "message": f"Map '{map_id}' must have at least one of livestream or explanation",
                            }
                        ),
                        400,
                    )

                # 驗證 URL 格式
                livestream = map_data.get("livestream", "")
                explanation = map_data.get("explanation", "")

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

            # 寫入 Firestore
            collection_name = get_collection_name("video_explanations")
            doc_ref = db.collection(collection_name).document(date)
            doc_ref.set(maps)

            logger.info(f"✅ 已更新 {date} 的影片資料（{len(maps)} 個地圖）")

            return (
                jsonify(
                    {
                        "success": True,
                        "message": f"Video explanations updated for {date}",
                        "date": date,
                    }
                ),
                200,
            )

        except Exception as e:
            logger.error(f"❌ 更新影片說明資料失敗: {e}", exc_info=True)
            return jsonify({"error": "Internal server error"}), 500

    app.register_blueprint(bp)
