"""從 Plonk It 公開 API 下載所有國家的線索 JSON。

Rate limit: 30 req/min，本腳本控制在 25 req/min（每 2.5 秒一次）。
輸出: assistant/data/raw/{slug}.json
"""

import json
import time
from pathlib import Path
from urllib.request import Request, urlopen
from urllib.error import HTTPError

BASE_URL = "https://www.plonkit.net/api/guides"
OUTPUT_DIR = Path(__file__).resolve().parent.parent / "data" / "raw"
REQUEST_INTERVAL = 2.5  # 秒，25 req/min


def fetch_json(url: str) -> dict:
    req = Request(url, headers={"User-Agent": "PlonkIt-RAG-Fetcher/1.0"})
    with urlopen(req, timeout=15) as resp:
        return json.loads(resp.read().decode("utf-8"))


def fetch_guide_list() -> list[dict]:
    print("取得國家列表...")
    data = fetch_json(BASE_URL)
    guides = data["data"]
    print(f"共 {len(guides)} 個國家/指南")
    return guides


def fetch_and_save(slug: str, index: int, total: int) -> bool:
    output_path = OUTPUT_DIR / f"{slug}.json"
    if output_path.exists():
        print(f"  [{index}/{total}] {slug} — 已存在，跳過")
        return True

    url = f"{BASE_URL}/{slug}"
    try:
        data = fetch_json(url)
        output_path.write_text(
            json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        print(f"  [{index}/{total}] {slug} — OK")
        return True
    except HTTPError as e:
        print(f"  [{index}/{total}] {slug} — HTTP {e.code}, 跳過")
        return False
    except Exception as e:
        print(f"  [{index}/{total}] {slug} — 錯誤: {e}")
        return False


def main():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    guides = fetch_guide_list()
    time.sleep(REQUEST_INTERVAL)

    success = 0
    failed = []

    for i, guide in enumerate(guides, 1):
        slug = guide["slug"]
        if fetch_and_save(slug, i, len(guides)):
            success += 1
        else:
            failed.append(slug)

        if i < len(guides):
            time.sleep(REQUEST_INTERVAL)

    print(f"\n完成: {success} 成功, {len(failed)} 失敗")
    if failed:
        print(f"失敗清單: {failed}")


if __name__ == "__main__":
    main()
