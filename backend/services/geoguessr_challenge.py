# services/geoguessr_challenge.py

import logging
import os

import requests
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

logger = logging.getLogger(__name__)

GEOGUESSR_API_URL = "https://www.geoguessr.com/api/v3/challenges"
NCFA_COOKIE = os.getenv("GEOGUESSR_NCFA")

MAX_RETRIES = 3


@retry(
    retry=retry_if_exception_type((requests.ConnectionError, requests.Timeout)),
    stop=stop_after_attempt(MAX_RETRIES),
    wait=wait_exponential(multiplier=1, min=1, max=8),
    reraise=True,
)
def _post_challenge(headers: dict, payload: dict) -> dict:
    """發送 POST 請求，連線失敗或 timeout 時自動重試（指數退避）。"""
    response = requests.post(
        GEOGUESSR_API_URL, headers=headers, json=payload, timeout=10
    )
    response.raise_for_status()
    return response.json()


def create_challenge(map_id: str) -> str | None:
    """
    呼叫 GeoGuessr API 建立挑戰，成功回傳 challenge URL，失敗回傳 None。
    網路瞬斷與 timeout 會自動重試最多 3 次（指數退避 1s → 2s → 4s）。
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
        data = _post_challenge(headers, payload)
        token = data.get("token")
        if not token:
            logger.error("❌ 回傳中未取得 token")
            return None
        return f"https://www.geoguessr.com/challenge/{token}"

    except (requests.ConnectionError, requests.Timeout):
        logger.error("❌ GeoGuessr API 連線失敗（已重試 %d 次）", MAX_RETRIES)
        return None
    except Exception:
        logger.error("❌ 建立 GeoGuessr 挑戰失敗", exc_info=True)
        return None
