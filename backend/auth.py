# auth.py
# 共用認證工具

import hmac
import logging

logger = logging.getLogger(__name__)


def extract_bearer_token(auth_header: str) -> str | None:
    """
    從 Authorization header 提取 Bearer token

    Args:
        auth_header: Authorization header 值

    Returns:
        token 字串，若格式不正確則回傳 None
    """
    if not auth_header or not auth_header.startswith("Bearer "):
        return None
    return auth_header[7:]


def verify_bearer_token(auth_header: str, expected_token: str) -> bool:
    """
    驗證 Bearer token 是否正確（使用 constant-time comparison）

    Args:
        auth_header: Authorization header 值
        expected_token: 預期的 token

    Returns:
        驗證是否通過
    """
    if not expected_token:
        logger.error("驗證用的 token 環境變數未設定")
        return False

    token = extract_bearer_token(auth_header)
    if token is None:
        return False

    return hmac.compare_digest(token, expected_token)
