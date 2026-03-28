# routes/daily_challenge_reader.py

import logging
import re
from datetime import datetime, timedelta, timezone

from flask import Blueprint, jsonify, request
from google.cloud.firestore import Client

from config import get_collection_name

MONTH_PATTERN = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")

bp = Blueprint("daily_challenge_reader", __name__)
logger = logging.getLogger(__name__)


def init_daily_challenge_reader_route(app, db: Client):  # noqa: C901
    def read_month(collection_name, month_id):
        """讀取指定月份的所有 entries"""
        entries = []
        doc = db.collection(collection_name).document(month_id).get()
        if not doc.exists:
            logger.info(f"📄 文件不存在: daily_challenge/{month_id}")
            return entries

        doc_data = doc.to_dict()
        if not doc_data:
            logger.warning(f"⚠️ 文件內容為空: {month_id}")
            return entries

        for day_key, entry_list in doc_data.items():
            if not isinstance(entry_list, list):
                logger.warning(f"⛔ 無效資料格式: {month_id}-{day_key}")
                continue

            for entry in entry_list:
                entry["createdAt"] = f"{month_id}-{day_key}"
                entries.append(entry)

        logger.info(f"📄 讀取 {month_id} 共 {len(entries)} 筆")
        return entries

    def get_prev_month(year, month):
        """取得上一個月的 year, month"""
        if month == 1:
            return year - 1, 12
        return year, month - 1

    @bp.route("/api/daily-challenge/months", methods=["GET"])
    def get_available_months():
        """回傳所有已存在的月份 ID 列表（降冪排序）"""
        try:
            collection_name = get_collection_name("daily_challenge")
            docs = db.collection(collection_name).list_documents()
            months = sorted([doc.id for doc in docs], reverse=True)
            logger.info(f"📅 回傳 {len(months)} 個可用月份")
            return jsonify(months)
        except Exception:
            logger.error("❌ 讀取可用月份失敗", exc_info=True)
            return jsonify({"error": "Internal server error"}), 500

    @bp.route("/api/daily-challenge", methods=["GET"])
    def get_daily_challenge():
        """
        取得每日挑戰資料（按月份分批載入）

        Query params:
            month: 指定月份 (YYYY-MM)，回傳該月資料
                   不帶此參數則回傳當月 + 上月
        """
        try:
            collection_name = get_collection_name("daily_challenge")
            month_param = request.args.get("month")

            if month_param:
                if not MONTH_PATTERN.match(month_param):
                    return jsonify({"error": "Invalid month format, expected YYYY-MM"}), 400
                # 指定月份：只撈該月
                entries = read_month(collection_name, month_param)
                logger.info(f"📦 回傳 {month_param} 共 {len(entries)} 筆")
                return jsonify(entries)
            else:
                # 預設：當月 + 上月
                tz_taiwan = timezone(timedelta(hours=8))
                today = datetime.now(tz=tz_taiwan)
                curr_year, curr_month = today.year, today.month
                prev_year, prev_month = get_prev_month(curr_year, curr_month)

                curr_month_id = f"{curr_year}-{curr_month:02d}"
                prev_month_id = f"{prev_year}-{prev_month:02d}"

                entries = read_month(collection_name, curr_month_id)
                entries += read_month(collection_name, prev_month_id)

                logger.info(f"📦 回傳 {curr_month_id} + {prev_month_id} 共 {len(entries)} 筆")
                return jsonify(entries)

        except Exception:
            logger.error("❌ 讀取每日題目資料失敗", exc_info=True)
            return jsonify({"error": "Internal server error"}), 500

    app.register_blueprint(bp)
