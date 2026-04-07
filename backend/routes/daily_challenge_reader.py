# routes/daily_challenge_reader.py

import logging
import re
from datetime import datetime, timedelta, timezone

from flask import Blueprint, jsonify, request
from google.cloud.firestore import Client

from error_codes import ErrorCode, json_error
from repositories.daily_challenge_repo import DailyChallengeRepo

MONTH_PATTERN = re.compile(r"^\d{4}-(0[1-9]|1[0-2])$")

bp = Blueprint("daily_challenge_reader", __name__, url_prefix="/api")
logger = logging.getLogger(__name__)


def init_daily_challenge_reader_route(app, db: Client):
    repo = DailyChallengeRepo(db)

    def get_prev_month(year, month):
        """取得上一個月的 year, month"""
        if month == 1:
            return year - 1, 12
        return year, month - 1

    @bp.route("/daily-challenge/months", methods=["GET"])
    def get_available_months():
        """回傳所有已存在的月份 ID 列表（降冪排序）"""
        try:
            months = repo.list_months()
            logger.info(f"📅 回傳 {len(months)} 個可用月份")
            return jsonify(months)
        except Exception:
            logger.exception("❌ 讀取可用月份失敗")
            return json_error(500, ErrorCode.INTERNAL_ERROR, "Internal server error")

    @bp.route("/daily-challenge", methods=["GET"])
    def get_daily_challenge():
        """
        取得每日挑戰資料（按月份分批載入）

        Query params:
            month: 指定月份 (YYYY-MM)，回傳該月資料
                   不帶此參數則回傳當月 + 上月
        """
        try:
            month_param = request.args.get("month")

            if month_param:
                if not MONTH_PATTERN.match(month_param):
                    return json_error(400, ErrorCode.INVALID_FORMAT, "Invalid month format, expected YYYY-MM")
                entries = repo.read_month(month_param)
                logger.info(f"📦 回傳 {month_param} 共 {len(entries)} 筆")
                return jsonify(entries)
            else:
                tz_taiwan = timezone(timedelta(hours=8))
                today = datetime.now(tz=tz_taiwan)
                curr_year, curr_month = today.year, today.month
                prev_year, prev_month = get_prev_month(curr_year, curr_month)

                curr_month_id = f"{curr_year}-{curr_month:02d}"
                prev_month_id = f"{prev_year}-{prev_month:02d}"

                entries = repo.read_month(curr_month_id)
                entries += repo.read_month(prev_month_id)

                logger.info(f"📦 回傳 {curr_month_id} + {prev_month_id} 共 {len(entries)} 筆")
                return jsonify(entries)

        except Exception:
            logger.exception("❌ 讀取每日題目資料失敗")
            return json_error(500, ErrorCode.INTERNAL_ERROR, "Internal server error")

    app.register_blueprint(bp)
