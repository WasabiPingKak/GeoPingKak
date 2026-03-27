#!/usr/bin/env python3
"""
遷移 special_maps collection 的 Firestore 欄位名：
  - "FunnyTW" → "tw-funny"
  - "PunTW"   → "tw-pun"
  - "Other"   → "other"

mapId 值不變（維持 special-tw-funny、special-tw-pun、special-other）。

使用方式：
  # Dry run（預設）
  python scripts/migrate_special_map_fields.py --staging

  # 實際執行
  python scripts/migrate_special_map_fields.py --staging --apply

注意：
  - 需要先設定 GCP 認證：gcloud auth application-default login
"""

import sys

import firebase_admin
from firebase_admin import firestore

GCP_PROJECT_ID = "geopingkak"

RENAME_FIELDS = {
    "FunnyTW": "tw-funny",
    "PunTW": "tw-pun",
    "Other": "other",
}


def init_firebase():
    if not firebase_admin._apps:
        try:
            firebase_admin.initialize_app(options={"projectId": GCP_PROJECT_ID})
            print("✅ Firebase Admin SDK 初始化成功")
        except Exception as e:
            print(f"❌ Firebase 初始化失敗: {e}")
            print("  請先執行: gcloud auth application-default login")
            sys.exit(1)
    return firestore.client()


def migrate_special_maps(db, collection_name, dry_run=True):
    print(f"\n📋 處理 collection: {collection_name}")

    docs = db.collection(collection_name).stream()
    total_updated = 0

    for doc in docs:
        data = doc.to_dict()
        updates = {}
        deletes = []

        for old_field, new_field in RENAME_FIELDS.items():
            if old_field in data:
                print(f"  {doc.id}: 欄位 {old_field} → {new_field} ({len(data[old_field])} entries)")
                updates[new_field] = data[old_field]
                deletes.append(old_field)
                total_updated += 1

        if updates and not dry_run:
            doc_ref = db.collection(collection_name).document(doc.id)
            doc_ref.update(updates)
            for old_field in deletes:
                doc_ref.update({old_field: firestore.DELETE_FIELD})

    return total_updated


def main():
    if len(sys.argv) < 2 or sys.argv[1] not in ("--staging", "--production"):
        print("使用方式: python scripts/migrate_special_map_fields.py <--staging|--production> [--apply]")
        sys.exit(1)

    env = sys.argv[1].lstrip("-")
    dry_run = "--apply" not in sys.argv
    prefix = "staging_" if env == "staging" else ""

    db = init_firebase()

    mode = "🔍 DRY RUN（不會寫入）" if dry_run else "⚡ APPLY（實際寫入）"
    print(f"\n{'=' * 60}")
    print(f"🚀 遷移 special_maps 欄位名 — 環境: {env} — {mode}")
    print(f"{'=' * 60}")

    count = migrate_special_maps(db, f"{prefix}special_maps", dry_run)

    print(f"\n{'=' * 60}")
    if dry_run:
        print(f"🔍 Dry run 完成：共 {count} 個欄位需要重命名")
        print(f"   確認無誤後加 --apply 參數執行實際寫入")
    else:
        print(f"✅ 遷移完成：共重命名 {count} 個欄位")
    print(f"{'=' * 60}")


if __name__ == "__main__":
    main()
