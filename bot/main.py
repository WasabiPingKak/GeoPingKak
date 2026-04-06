"""Discord Daily Challenge Notification Bot

從後端 API 取得今天的每日挑戰連結，透過 Discord Webhook 發送到對應頻道。
設計為 Cloud Run Job 執行：啟動 → 發送 → 結束。
"""

import logging
import sys
from collections import defaultdict
from datetime import datetime, timedelta, timezone

import requests

from config import (
    API_BASE_URL,
    COUNTRY_DISPLAY_NAME,
    COUNTRY_EMBED_COLOR,
    COUNTRY_MAP_ORDER,
    COUNTRY_WEBHOOK_MAP,
    DIFFICULTY_EMOJI,
    MAP_METADATA,
    validate_env,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(message)s",
)
logger = logging.getLogger(__name__)

TZ_TW = timezone(timedelta(hours=8))


def fetch_today_challenges() -> list[dict]:
    """呼叫後端 API 取得當月每日挑戰，篩選今天的 entries。"""
    today_str = datetime.now(TZ_TW).strftime("%Y-%m-%d")
    url = f"{API_BASE_URL}/api/daily-challenge"

    logger.info("Fetching daily challenges from %s", url)
    resp = requests.get(url, timeout=30)
    resp.raise_for_status()

    all_entries = resp.json()
    today_entries = [e for e in all_entries if e.get("createdAt") == today_str]
    logger.info("Found %d entries for %s", len(today_entries), today_str)
    return today_entries


def group_by_country(entries: list[dict]) -> dict[str, list[dict]]:
    """依 country 分組，只保留 world/tw/jp。"""
    groups: dict[str, list[dict]] = defaultdict(list)
    for entry in entries:
        country = entry.get("country", "")
        if country in COUNTRY_WEBHOOK_MAP:
            groups[country].append(entry)
    return dict(groups)


def build_embed(country: str, entries: list[dict]) -> dict:
    """建構 Discord Embed payload。"""
    today_str = datetime.now(TZ_TW).strftime("%Y/%m/%d")
    display_name = COUNTRY_DISPLAY_NAME.get(country, country)

    # 依照設定的順序排列地圖（簡單在前）
    map_order = COUNTRY_MAP_ORDER.get(country, [])
    entry_map = {e["mapId"]: e for e in entries}
    sorted_entries = [entry_map[mid] for mid in map_order if mid in entry_map]
    # 加入不在排序清單中的 entries（防禦性）
    known_ids = {e["mapId"] for e in sorted_entries}
    sorted_entries.extend(e for e in entries if e["mapId"] not in known_ids)

    fields = []
    for entry in sorted_entries:
        map_id = entry["mapId"]
        meta = MAP_METADATA.get(map_id, {})
        title = meta.get("title", map_id)
        difficulty = meta.get("difficulty", "")
        emoji = DIFFICULTY_EMOJI.get(difficulty, "⚪")
        challenge_url = entry.get("challengeUrl", "")

        field_value = "不限時間 ｜ 不限制移動"
        if challenge_url:
            field_value += f"\n🔗 [進入遊戲]({challenge_url})"

        fields.append(
            {
                "name": f"{emoji} {difficulty}｜{title}",
                "value": field_value,
                "inline": False,
            }
        )

    return {
        "title": f"{display_name} 每日挑戰 — {today_str}",
        "description": "與 [GeoPingKak 網頁版](https://geopingkak.web.app/daily-challenge)題目相同，這裡是機器人同步過來的。",
        "color": COUNTRY_EMBED_COLOR.get(country, 0),
        "fields": fields,
        "footer": {"text": "GeoPingKak 每日挑戰"},
    }


def send_webhook(webhook_url: str, embed: dict) -> bool:
    """發送 Embed 到 Discord Webhook，回傳是否成功。"""
    payload = {"embeds": [embed]}
    try:
        resp = requests.post(webhook_url, json=payload, timeout=15)
        resp.raise_for_status()
        logger.info("Sent embed: %s", embed.get("title"))
        return True
    except requests.RequestException:
        logger.exception("Failed to send webhook for: %s", embed.get("title"))
        return False


def main() -> int:
    # 驗證環境變數
    missing = validate_env()
    if missing:
        logger.error("Missing environment variables: %s", ", ".join(missing))
        return 1

    # 取得今天的挑戰
    try:
        entries = fetch_today_challenges()
    except requests.RequestException:
        logger.exception("Failed to fetch daily challenges")
        return 1

    if not entries:
        logger.warning("No challenges found for today, nothing to send.")
        return 0

    # 分組 & 發送
    groups = group_by_country(entries)
    success_count = 0
    fail_count = 0

    for country, country_entries in groups.items():
        webhook_url = COUNTRY_WEBHOOK_MAP.get(country, "")
        if not webhook_url:
            logger.warning("No webhook configured for country: %s", country)
            continue

        embed = build_embed(country, country_entries)
        if send_webhook(webhook_url, embed):
            success_count += 1
        else:
            fail_count += 1

    logger.info("Done. Sent: %d, Failed: %d", success_count, fail_count)
    return 1 if fail_count > 0 else 0


if __name__ == "__main__":
    sys.exit(main())
