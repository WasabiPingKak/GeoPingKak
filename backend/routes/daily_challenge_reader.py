# routes/daily_challenge_reader.py

import logging
from flask import Blueprint, jsonify
from datetime import datetime, timezone, timedelta
from google.cloud.firestore import Client

bp = Blueprint("daily_challenge_reader", __name__)
logger = logging.getLogger(__name__)


def init_daily_challenge_reader_route(app, db: Client):
    @bp.route("/api/daily-challenge", methods=["GET"])
    def get_daily_challenge():
        try:
            tz_taiwan = timezone(timedelta(hours=8))
            today = datetime.now(tz=tz_taiwan)

            # 🔹 取得本月與上月的年月代碼
            this_month = today.strftime("%Y-%m")
            last_month_dt = today.replace(day=1) - timedelta(days=1)
            last_month = last_month_dt.strftime("%Y-%m")

            logger.info(f"📅 讀取月份: {last_month}, {this_month}")

            entries = []

            for month_id in [this_month, last_month]:
                logger.info(f"📄 查詢 Firestore 文件: daily_challenge/{month_id}")
                doc_ref = db.collection("daily_challenge").document(month_id)
                doc_snapshot = doc_ref.get()
                if not doc_snapshot.exists:
                    logger.warning(f"⚠️ 文件不存在: {month_id}")
                    continue

                doc_data = doc_snapshot.to_dict()
                if not doc_data:
                    logger.warning(f"⚠️ 文件內容為空: {month_id}")
                    continue

                for day_key, entry_list in doc_data.items():
                    if not isinstance(entry_list, list):
                        logger.warning(f"⛔ 無效資料格式: {month_id}-{day_key}")
                        continue

                    logger.info(f"✅ 讀取 {month_id}-{day_key} 共 {len(entry_list)} 筆")

                    for entry in entry_list:
                        # 強制統一 createdAt 格式
                        entry["createdAt"] = f"{month_id}-{day_key}"
                        entries.append(entry)

            logger.info(f"📦 總共回傳 {len(entries)} 筆資料")
            return jsonify(entries)

        except Exception:
            logger.error("❌ 讀取每日題目資料失敗", exc_info=True)
            return jsonify({"error": "Internal server error"}), 500

    app.register_blueprint(bp)
