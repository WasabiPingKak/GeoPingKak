#!/usr/bin/env python3
"""
為 video_explanations 補上對應的 challengeUrl。

從 daily_challenge collection 中比對 date + mapId，
將 challengeUrl 寫入 video_explanations 的對應欄位。

使用方式：
  # Dry run（預設，只顯示會改什麼，不寫入）
  python scripts/migrate_video_challenge_urls.py --staging

  # 實際執行
  python scripts/migrate_video_challenge_urls.py --staging --apply

注意：
  - 需要先設定 GCP 認證：gcloud auth application-default login
  - 需要設定正確的專案：gcloud config set project geopingkak
"""

import firebase_admin
from firebase_admin import firestore
import sys

GCP_PROJECT_ID = "geopingkak"


def init_firebase():
    if not firebase_admin._apps:
        try:
            firebase_admin.initialize_app(options={"projectId": GCP_PROJECT_ID})
            print("✅ Firebase Admin SDK 初始化成功")
        except Exception as e:
            print(f"❌ Firebase 初始化失敗: {e}")
            print("  請先執行: gcloud auth application-default login")
            print("  並設定專案: gcloud config set project geopingkak")
            sys.exit(1)
    return firestore.client()


def build_challenge_url_index(db, collection_name):
    """從 daily_challenge 建立 (date, mapId) → challengeUrl 的索引"""
    print(f"\n📋 讀取 {collection_name} 建立索引...")

    index = {}
    docs = db.collection(collection_name).stream()

    for doc in docs:
        month_id = doc.id
        data = doc.to_dict()
        if not data:
            continue

        for day_key, entries in data.items():
            if not isinstance(entries, list):
                continue
            date = f"{month_id}-{day_key}"
            for entry in entries:
                map_id = entry.get("mapId", "")
                challenge_url = entry.get("challengeUrl", "")
                if map_id and challenge_url:
                    index[(date, map_id)] = challenge_url

    print(f"  共建立 {len(index)} 筆索引")
    return index


def migrate_video_explanations(db, video_collection, url_index, dry_run=True):
    """為 video_explanations 補上 challengeUrl"""
    print(f"\n📋 處理 collection: {video_collection}")

    docs = db.collection(video_collection).stream()
    updated = 0
    missing = 0

    for doc in docs:
        date = doc.id
        data = doc.to_dict()
        if not data:
            continue

        doc_modified = False
        for map_id, map_data in data.items():
            if not isinstance(map_data, dict):
                continue

            # 已經有 challengeUrl 就跳過
            if map_data.get("challengeUrl"):
                continue

            # 沒有實際影片資料的 entry 跳過（例如只有 livestream: ""）
            livestream = map_data.get("livestream", "")
            explanation = map_data.get("explanation", "")
            if not livestream and not explanation:
                continue

            key = (date, map_id)
            if key in url_index:
                print(f"  ✅ {date}/{map_id} → {url_index[key]}")
                map_data["challengeUrl"] = url_index[key]
                doc_modified = True
                updated += 1
            else:
                print(f"  ⚠️ {date}/{map_id} — 找不到對應的 challengeUrl")
                missing += 1

        if doc_modified and not dry_run:
            db.collection(video_collection).document(date).set(data)

    return updated, missing


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in ("--staging", "--production"):
        print("使用方式: python scripts/migrate_video_challenge_urls.py <--staging|--production> [--apply]")
        sys.exit(1)

    env = sys.argv[1].lstrip("-")
    dry_run = "--apply" not in sys.argv
    prefix = "staging_" if env == "staging" else ""

    db = init_firebase()

    mode = "🔍 DRY RUN（不會寫入）" if dry_run else "⚡ APPLY（實際寫入）"
    print(f"\n{'=' * 60}")
    print(f"🚀 補 challengeUrl 到 video_explanations — 環境: {env} — {mode}")
    print(f"{'=' * 60}")

    # 先從 daily_challenge 建立索引
    url_index = build_challenge_url_index(db, f"{prefix}daily_challenge")

    # 補寫到 video_explanations
    updated, missing = migrate_video_explanations(
        db, f"{prefix}video_explanations", url_index, dry_run
    )

    print(f"\n{'=' * 60}")
    if dry_run:
        print(f"🔍 Dry run 完成：{updated} 筆可補上，{missing} 筆找不到對應")
        print(f"   確認無誤後加 --apply 參數執行實際寫入")
    else:
        print(f"✅ 遷移完成：共更新 {updated} 筆，{missing} 筆找不到對應")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
