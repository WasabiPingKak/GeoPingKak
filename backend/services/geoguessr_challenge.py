# services/geoguessr_challenge.py

import logging
import os
from dataclasses import dataclass
from enum import Enum

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


class ChallengeFailure(str, Enum):
    """GeoGuessr challenge 建立失敗的分類。"""

    MISSING_TOKEN_ENV = "missing_token_env"
    TIMEOUT = "timeout"
    CONNECTION_ERROR = "connection_error"
    HTTP_4XX = "http_4xx"
    HTTP_5XX = "http_5xx"
    INVALID_JSON = "invalid_json"
    MISSING_TOKEN = "missing_token"


@dataclass
class ChallengeResult:
    """create_challenge 的回傳結果，包含失敗分類與重試資訊。"""

    url: str | None = None
    failure: ChallengeFailure | None = None
    status_code: int | None = None
    retry_count: int = 0


@retry(
    retry=retry_if_exception_type((requests.ConnectionError, requests.Timeout)),
    stop=stop_after_attempt(MAX_RETRIES),
    wait=wait_exponential(multiplier=1, min=1, max=8),
    reraise=True,
)
def _post_challenge(headers: dict, payload: dict) -> dict:
    """發送 POST 請求，連線失敗或 timeout 時自動重試（指數退避）。"""
    response = requests.post(GEOGUESSR_API_URL, headers=headers, json=payload, timeout=10)
    response.raise_for_status()
    return response.json()


def create_challenge(map_id: str) -> ChallengeResult:
    """
    呼叫 GeoGuessr API 建立挑戰。
    回傳 ChallengeResult，包含 URL（成功時）或失敗分類（失敗時）。
    網路瞬斷與 timeout 會自動重試最多 3 次（指數退避 1s → 2s → 4s）。
    """
    if not NCFA_COOKIE:
        logger.error("❌ GEOGUESSR_NCFA 未設定於環境變數中")
        return ChallengeResult(failure=ChallengeFailure.MISSING_TOKEN_ENV)

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
        retry_count = _post_challenge.statistics.get("attempt_number", 1) - 1
        token = data.get("token")
        if not token:
            logger.error("❌ 回傳中未取得 token")
            return ChallengeResult(
                failure=ChallengeFailure.MISSING_TOKEN, retry_count=retry_count
            )
        return ChallengeResult(
            url=f"https://www.geoguessr.com/challenge/{token}", retry_count=retry_count
        )

    except requests.Timeout:
        logger.error("❌ GeoGuessr API timeout（已重試 %d 次）", MAX_RETRIES)
        return ChallengeResult(
            failure=ChallengeFailure.TIMEOUT, retry_count=MAX_RETRIES - 1
        )
    except requests.ConnectionError:
        logger.error("❌ GeoGuessr API 連線失敗（已重試 %d 次）", MAX_RETRIES)
        return ChallengeResult(
            failure=ChallengeFailure.CONNECTION_ERROR, retry_count=MAX_RETRIES - 1
        )
    except requests.HTTPError as e:
        sc = e.response.status_code if e.response is not None else None
        failure = (
            ChallengeFailure.HTTP_4XX
            if sc is not None and sc < 500
            else ChallengeFailure.HTTP_5XX
        )
        logger.error("❌ GeoGuessr API HTTP 錯誤 (status=%s)", sc, exc_info=True)
        return ChallengeResult(failure=failure, status_code=sc)
    except (ValueError, KeyError):
        logger.error("❌ GeoGuessr API 回傳非 JSON 內容", exc_info=True)
        return ChallengeResult(failure=ChallengeFailure.INVALID_JSON)
    except Exception:
        logger.error("❌ 建立 GeoGuessr 挑戰失敗（未預期錯誤）", exc_info=True)
        return ChallengeResult(failure=ChallengeFailure.CONNECTION_ERROR)
