import os
import sys

# --- Environment Variables ---

API_BASE_URL = os.getenv("API_BASE_URL", "")
DISCORD_WEBHOOK_WORLD = os.getenv("DISCORD_WEBHOOK_WORLD", "")
DISCORD_WEBHOOK_TW = os.getenv("DISCORD_WEBHOOK_TW", "")
DISCORD_WEBHOOK_JP = os.getenv("DISCORD_WEBHOOK_JP", "")


def validate_env() -> list[str]:
    """驗證必要環境變數，回傳缺少的變數名稱。"""
    required = {
        "API_BASE_URL": API_BASE_URL,
        "DISCORD_WEBHOOK_WORLD": DISCORD_WEBHOOK_WORLD,
        "DISCORD_WEBHOOK_TW": DISCORD_WEBHOOK_TW,
        "DISCORD_WEBHOOK_JP": DISCORD_WEBHOOK_JP,
    }
    return [name for name, value in required.items() if not value]


# --- Map Metadata (synced from frontend/components/daily-challenge/mapTitles.ts) ---

MAP_METADATA: dict[str, dict[str, str]] = {
    "world-theworld": {"title": "世界地圖 - The World", "difficulty": "簡單"},
    "world-figsy": {"title": "世界地圖 - A Figsy World", "difficulty": "困難"},
    "tw-urban": {"title": "繁榮的台灣", "difficulty": "簡單"},
    "tw-balanced": {"title": "平衡的台灣", "difficulty": "困難"},
    "jp-urban": {"title": "日本の都会", "difficulty": "簡單"},
    "jp-balanced": {"title": "日本", "difficulty": "困難"},
}

# 難度對應的 emoji
DIFFICULTY_EMOJI: dict[str, str] = {
    "簡單": "🟢",
    "困難": "🔴",
}

# 地區 → Webhook URL
COUNTRY_WEBHOOK_MAP: dict[str, str] = {
    "world": DISCORD_WEBHOOK_WORLD,
    "tw": DISCORD_WEBHOOK_TW,
    "jp": DISCORD_WEBHOOK_JP,
}

# 地區 → 顯示名稱
COUNTRY_DISPLAY_NAME: dict[str, str] = {
    "world": "🌍 世界",
    "tw": "🇹🇼 台灣",
    "jp": "🇯🇵 日本",
}

# 地區 → Embed 顏色 (decimal)
COUNTRY_EMBED_COLOR: dict[str, int] = {
    "world": 3447003,  # 藍色 #3498DB
    "tw": 3447003,  # 藍色 #3498DB
    "jp": 3447003,  # 藍色 #3498DB
}

# 每個地區的地圖排序（簡單在前）
COUNTRY_MAP_ORDER: dict[str, list[str]] = {
    "world": ["world-theworld", "world-figsy"],
    "tw": ["tw-urban", "tw-balanced"],
    "jp": ["jp-urban", "jp-balanced"],
}


if __name__ == "__main__":
    missing = validate_env()
    if missing:
        print(f"Missing env vars: {', '.join(missing)}")
        sys.exit(1)
    print("All environment variables are set.")
