#!/usr/bin/env python3
"""
影片說明資料遷移腳本

將 frontend/data/videoExplanations.ts 的資料遷移到 Firestore

使用方式:
    python migrate_video_data.py production   # 遷移到 production
    python migrate_video_data.py staging      # 遷移到 staging
"""

import json
import os
import sys
import firebase_admin
from firebase_admin import credentials, firestore


def migrate_data(environment="production"):
    """
    遷移影片說明資料到 Firestore

    Args:
        environment: 'production' 或 'staging'
    """
    # 初始化 Firebase（如果尚未初始化）
    if not firebase_admin._apps:
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred, {"projectId": "geopingkak"})

    db = firestore.client()

    # 讀取現有資料（從 videoExplanations.ts 手動轉換成 JSON）
    json_file = "video_data.json"
    if not os.path.exists(json_file):
        print(f"❌ 找不到檔案: {json_file}")
        print(f"請先將 videoExplanations.ts 的資料轉換成 JSON 格式並儲存為 {json_file}")
        sys.exit(1)

    with open(json_file, "r", encoding="utf-8") as f:
        data = json.load(f)

    # 根據環境決定 collection 名稱
    collection_name = "video_explanations"
    if environment == "staging":
        collection_name = "staging_video_explanations"

    collection_ref = db.collection(collection_name)

    print(f"\n📦 遷移資料到 {collection_name}...")
    print(f"   專案: geopingkak")
    print(f"   環境: {environment}")
    print(f"   資料筆數: {len(data)}\n")

    # 詢問確認
    confirm = input(f"⚠️  確定要將 {len(data)} 筆資料寫入 {collection_name}? (y/N): ")
    if confirm.lower() != "y":
        print("❌ 已取消遷移")
        sys.exit(0)

    # 執行遷移
    success_count = 0
    error_count = 0

    for date, maps in data.items():
        try:
            doc_ref = collection_ref.document(date)
            doc_ref.set(maps)
            print(f"✅ 已遷移 {date} ({len(maps)} 個地圖)")
            success_count += 1
        except Exception as e:
            print(f"❌ 遷移 {date} 失敗: {e}")
            error_count += 1

    print(f"\n{'='*60}")
    print(f"🎉 遷移完成！")
    print(f"   成功: {success_count} 筆")
    print(f"   失敗: {error_count} 筆")
    print(f"   Collection: {collection_name}")
    print(f"{'='*60}\n")


if __name__ == "__main__":
    # 從命令列參數讀取環境
    env = sys.argv[1] if len(sys.argv) > 1 else "production"

    if env not in ["production", "staging"]:
        print("❌ 環境參數必須是 'production' 或 'staging'")
        print("\n使用方式:")
        print("  python migrate_video_data.py production")
        print("  python migrate_video_data.py staging")
        sys.exit(1)

    migrate_data(env)
