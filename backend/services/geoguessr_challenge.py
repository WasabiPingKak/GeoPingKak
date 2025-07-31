# services/geoguessr_challenge.py

import os
import logging
import requests
from datetime import datetime, timezone

logger = logging.getLogger(__name__)

GEOGUESSR_API_URL = "https://www.geoguessr.com/api/v3/challenges"
NCFA_COOKIE = os.getenv("GEOGUESSR_NCFA")


def create_challenge(map_id: str) -> str | None:
    """
    呼叫 GeoGuessr API 建立挑戰，成功回傳 challenge URL，失敗回傳 None。
    """
    if not NCFA_COOKIE:
        logger.error("❌ GEOGUESSR_NCFA 未設定於環境變數中")
        return None

    headers = {"Content-Type": "application/json", "Cookie": f"_ncfa={NCFA_COOKIE}"}

    payload = {
        "map": map_id,
        "timeLimit": 0,
        "forbidMoving": False,
        "forbidZooming": False,
        "forbidRotating": False,
    }

    try:
        response = requests.post(
            GEOGUESSR_API_URL, headers=headers, json=payload, timeout=10
        )
        response.raise_for_status()
        data = response.json()
        token = data.get("token")
        if not token:
            logger.error("❌ 回傳中未取得 token")
            return None
        return f"https://www.geoguessr.com/challenge/{token}"

    except Exception as e:
        logger.error("❌ 建立 GeoGuessr 挑戰失敗", exc_info=True)
        return None
