#!/usr/bin/env python3
"""
遷移 Firestore 中的 mapId 命名：
  - "the-world" → "world-theworld"
  - "world-ACW" → "world-acw"

影響的 collections：
  - daily_challenge / staging_daily_challenge
  - video_explanations / staging_video_explanations

使用方式：
  # Dry run（預設，只顯示會改什麼，不寫入）
  python scripts/migrate_map_ids.py staging

  # 實際執行
  python scripts/migrate_map_ids.py staging --apply

注意：
  - 需要先設定 GCP 認證：gcloud auth application-default login
  - 需要設定正確的專案：gcloud config set project geopingkak
"""

import firebase_admin
from firebase_admin import firestore
import sys

GCP_PROJECT_ID = "geopingkak"

# 要替換的 mapId 對照表
RENAME_MAP = {
    "the-world": "world-theworld",
    "world-ACW": "world-acw",
}


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


def migrate_daily_challenge(db, collection_name, dry_run=True):
    """遷移 daily_challenge collection 中的 mapId"""
    print(f"\n📋 處理 collection: {collection_name}")

    docs = db.collection(collection_name).stream()
    total_updated = 0

    for doc in docs:
        data = doc.to_dict()
        doc_modified = False
        # data 結構: { "01": [...entries], "02": [...entries], ... }
        for day_key, entries in data.items():
            if not isinstance(entries, list):
                continue
            for entry in entries:
                old_id = entry.get("mapId", "")
                if old_id in RENAME_MAP:
                    new_id = RENAME_MAP[old_id]
                    print(f"  {doc.id}/{day_key}: {old_id} → {new_id}")
                    entry["mapId"] = new_id
                    doc_modified = True
                    total_updated += 1

        if doc_modified and not dry_run:
            db.collection(collection_name).document(doc.id).set(data)

    return total_updated


def migrate_video_explanations(db, collection_name, dry_run=True):
    """遷移 video_explanations collection 中的 mapId（作為欄位名）"""
    print(f"\n📋 處理 collection: {collection_name}")

    docs = db.collection(collection_name).stream()
    total_updated = 0

    for doc in docs:
        data = doc.to_dict()
        updates = {}
        deletes = []

        # data 結構: { "tw-urban": {...}, "the-world": {...}, ... }
        for field_name, value in data.items():
            if field_name in RENAME_MAP:
                new_name = RENAME_MAP[field_name]
                print(f"  {doc.id}: 欄位 {field_name} → {new_name}")
                updates[new_name] = value
                deletes.append(field_name)
                total_updated += 1

        if updates and not dry_run:
            doc_ref = db.collection(collection_name).document(doc.id)
            # 寫入新欄位名
            doc_ref.update(updates)
            # 刪除舊欄位名
            for old_field in deletes:
                doc_ref.update({old_field: firestore.DELETE_FIELD})

    return total_updated


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in ("staging", "production"):
        print("使用方式: python scripts/migrate_map_ids.py <staging|production> [--apply]")
        sys.exit(1)

    env = sys.argv[1]
    dry_run = "--apply" not in sys.argv
    prefix = "staging_" if env == "staging" else ""

    db = init_firebase()

    mode = "🔍 DRY RUN（不會寫入）" if dry_run else "⚡ APPLY（實際寫入）"
    print(f"\n{'=' * 60}")
    print(f"🚀 遷移 mapId — 環境: {env} — {mode}")
    print(f"{'=' * 60}")

    daily_count = migrate_daily_challenge(
        db, f"{prefix}daily_challenge", dry_run
    )
    video_count = migrate_video_explanations(
        db, f"{prefix}video_explanations", dry_run
    )

    total = daily_count + video_count
    print(f"\n{'=' * 60}")
    if dry_run:
        print(f"🔍 Dry run 完成：共 {total} 筆需要更新")
        print(f"   確認無誤後加 --apply 參數執行實際寫入")
    else:
        print(f"✅ 遷移完成：共更新 {total} 筆")
    print(f"   - daily_challenge: {daily_count} 筆")
    print(f"   - video_explanations: {video_count} 筆")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
