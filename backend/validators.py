# validators.py
# 共用驗證工具

import re
from datetime import datetime

_YOUTUBE_URL_PATTERN = re.compile(
    r"^https://(www\.)?(youtube\.com|youtu\.be)/.*$"
)

_GEOGUESSR_URL_PATTERN = re.compile(
    r"^https://(www\.)?geoguessr\.com/challenge/[A-Za-z0-9]+$"
)


def validate_date(date_str: str) -> bool:
    """驗證日期格式 YYYY-MM-DD"""
    try:
        datetime.strptime(date_str, "%Y-%m-%d")
        return True
    except ValueError:
        return False


def validate_youtube_url(url: str) -> bool:
    """驗證 YouTube URL 格式，空字串視為合法（表示未填寫）"""
    if url == "":
        return True
    return bool(_YOUTUBE_URL_PATTERN.match(url))


def validate_geoguessr_url(url: str) -> bool:
    """驗證 GeoGuessr challenge URL 格式"""
    return bool(_GEOGUESSR_URL_PATTERN.match(url))
