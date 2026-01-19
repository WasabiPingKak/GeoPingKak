#!/usr/bin/env python3
"""
複製 Production Firestore 資料到 Staging 環境

此腳本會將以下 collections 複製到 staging 環境：
- daily_challenge → staging_daily_challenge
- special_maps → staging_special_maps
- geoguessr_map_index → staging_geoguessr_map_index

使用方式：
  python scripts/copy_to_staging.py

注意：
- 需要先設定 GCP 認證：gcloud auth application-default login
- 需要設定正確的專案：gcloud config set project geopingkak
- 如果 staging collections 已存在，會覆蓋同名文件
"""

import firebase_admin
from firebase_admin import credentials, firestore
import sys

# 初始化 Firebase（使用應用預設憑證）
if not firebase_admin._apps:
    try:
        firebase_admin.initialize_app()
        print("✅ Firebase Admin SDK 初始化成功\n")
    except Exception as e:
        print(f"❌ Firebase 初始化失敗: {e}")
        print("\n請確認已執行：")
        print("  gcloud auth application-default login")
        print("  gcloud config set project geopingkak")
        sys.exit(1)

db = firestore.client()


def copy_collection(source_name, target_name):
    """
    複製整個 collection 到新名稱

    Args:
        source_name: 來源 collection 名稱
        target_name: 目標 collection 名稱

    Returns:
        int: 複製的文件數量
    """
    print(f"📋 開始複製: {source_name} → {target_name}")

    source_ref = db.collection(source_name)
    target_ref = db.collection(target_name)

    try:
        docs = source_ref.stream()
        count = 0

        for doc in docs:
            # 複製文件資料
            doc_data = doc.to_dict()
            target_ref.document(doc.id).set(doc_data)
            count += 1
            print(f"  ✓ 已複製文件: {doc.id}")

        if count == 0:
            print(f"  ⚠️  來源 collection '{source_name}' 沒有資料")
        else:
            print(f"✅ 完成！共複製 {count} 個文件\n")

        return count

    except Exception as e:
        print(f"❌ 複製失敗: {e}\n")
        return 0


def main():
    """主程式"""
    print("=" * 70)
    print("🚀 開始複製 Production 資料到 Staging 環境")
    print("=" * 70 + "\n")

    # 定義要複製的 collections
    collections_to_copy = [
        ("daily_challenge", "staging_daily_challenge"),
        ("special_maps", "staging_special_maps"),
        ("geoguessr_map_index", "staging_geoguessr_map_index"),
    ]

    total = 0
    success_count = 0

    for source, target in collections_to_copy:
        count = copy_collection(source, target)
        if count > 0:
            success_count += 1
        total += count

    print("=" * 70)
    if total > 0:
        print(f"🎉 全部完成！")
        print(f"   - 成功複製 {success_count}/{len(collections_to_copy)} 個 collections")
        print(f"   - 總共複製了 {total} 個文件")
    else:
        print("⚠️  沒有複製任何資料")
        print("   請確認 Production 環境是否有資料")
    print("=" * 70)


if __name__ == "__main__":
    main()
