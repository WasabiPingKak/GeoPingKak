# routes/video_explanation_routes.py

import logging
import os

from flask import Blueprint, jsonify, request
from google.cloud.firestore import Client

from auth import verify_bearer_token
from config import get_collection_name
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


def _lookup_challenge_url(db, date, map_id):
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


def _validate_maps(maps, date, db):
    """驗證並過濾地圖資料。

    Returns:
        (valid_maps, error_response): error_response 為 None 表示驗證通過
    """
    valid_maps = {}

    for map_id, map_data in maps.items():
        if map_id not in ALLOWED_MAP_IDS:
            allowed = ", ".join(ALLOWED_MAP_IDS)
            return None, (
                jsonify({"error": "Bad Request", "message": f"Invalid map ID: '{map_id}'. Allowed: {allowed}"}),
                400,
            )

        if not isinstance(map_data, dict):
            return None, (
                jsonify({"error": "Bad Request", "message": f"Map data for '{map_id}' must be an object"}),
                400,
            )

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
                return None, (
                    jsonify({
                        "error": "Bad Request",
                        "message": f"Invalid URL format for {field_name} in '{map_id}'. Must be a YouTube URL",
                    }),
                    400,
                )

        # 查找對應的 challengeUrl
        challenge_url = _lookup_challenge_url(db, date, map_id)
        if not challenge_url:
            return None, (
                jsonify({
                    "error": "Not Found",
                    "message": f"Cannot find challengeUrl for date '{date}', map '{map_id}' in daily_challenge",
                }),
                404,
            )

        map_data["challengeUrl"] = challenge_url
        valid_maps[map_id] = map_data

    if not valid_maps:
        return None, (
            jsonify({"error": "Bad Request", "message": "No valid map data provided. All maps have empty fields."}),
            400,
        )

    return valid_maps, None


def init_video_explanation_routes(app, db: Client):  # noqa: C901
    bp = Blueprint("video_explanation", __name__, url_prefix="/api")

    @bp.route("/video-explanations", methods=["GET"])
    def get_video_explanations():
        """取得所有日期的影片資料"""
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
        """新增或更新特定日期的影片資料（部分更新）"""
        try:
            # 1. 權限驗證
            auth_header = request.headers.get("Authorization", "")
            if not verify_bearer_token(auth_header, VIDEO_ADMIN_TOKEN):
                logger.warning("未授權的影片資料更新嘗試")
                return jsonify({"error": "Unauthorized", "message": "Invalid or missing token"}), 401

            # 2. 解析 body + 基本欄位檢查
            data = request.get_json()
            if not data:
                return jsonify({"error": "Bad Request", "message": "Request body is required"}), 400

            date = data.get("date", "").strip()
            maps = data.get("maps", {})

            if not date:
                return jsonify({"error": "Bad Request", "message": "Field 'date' is required"}), 400
            if not maps or not isinstance(maps, dict):
                return (
                    jsonify({"error": "Bad Request", "message": "Field 'maps' is required and must be an object"}),
                    400,
                )

            # 3. 驗證日期格式
            if not validate_date(date):
                return jsonify({"error": "Bad Request", "message": "Invalid date format. Expected YYYY-MM-DD"}), 400

            # 4. 驗證地圖資料
            valid_maps, error_response = _validate_maps(maps, date, db)
            if error_response:
                return error_response

            # 5. 寫入 Firestore
            collection_name = get_collection_name("video_explanations")
            doc_ref = db.collection(collection_name).document(date)
            doc_ref.set(valid_maps, merge=True)

            logger.info(f"✅ 已更新 {date} 的影片資料（{len(valid_maps)} 個地圖）")
            return jsonify({
                "success": True,
                "message": f"Video explanations updated for {date}",
                "date": date,
                "updated_maps": list(valid_maps.keys()),
            }), 200

        except Exception as e:
            logger.error(f"❌ 更新影片說明資料失敗: {e}", exc_info=True)
            return jsonify({"error": "Internal server error"}), 500

    app.register_blueprint(bp)
