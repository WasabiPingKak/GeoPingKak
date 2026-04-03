# config.py
# 環境配置管理模組

import logging
import os

logger = logging.getLogger(__name__)

# 從環境變數讀取部署環境，預設為 production
DEPLOY_ENV = os.getenv("DEPLOY_ENV", "production")

VALID_ENVS = {"production", "staging"}
if DEPLOY_ENV not in VALID_ENVS:
    raise ValueError(f"Invalid DEPLOY_ENV: {DEPLOY_ENV!r}, must be one of {VALID_ENVS}")

logger.info(f"🌍 當前部署環境: {DEPLOY_ENV}")


def get_collection_name(base_name: str) -> str:
    """
    根據部署環境動態生成 Firestore collection 名稱

    Args:
        base_name: 基礎 collection 名稱 (如 'daily_challenge', 'special_maps')

    Returns:
        完整的 collection 名稱
        - production: 返回原始名稱
        - staging: 返回 'staging_{base_name}'

    Examples:
        >>> get_collection_name('daily_challenge')
        'daily_challenge'  # 若 DEPLOY_ENV=production
        'staging_daily_challenge'  # 若 DEPLOY_ENV=staging
    """
    if DEPLOY_ENV == "staging":
        collection_name = f"staging_{base_name}"
        logger.debug(f"📦 使用 staging collection: {collection_name}")
        return collection_name

    logger.debug(f"📦 使用 production collection: {base_name}")
    return base_name
