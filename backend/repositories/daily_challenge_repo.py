import logging

from config import get_collection_name

logger = logging.getLogger(__name__)


class DailyChallengeRepo:
    def __init__(self, db):
        self.db = db

    def _collection(self):
        return self.db.collection(get_collection_name("daily_challenge"))

    def list_months(self):
        """回傳所有已存在的月份 ID 列表（降冪排序）"""
        docs = self._collection().list_documents()
        return sorted([doc.id for doc in docs], reverse=True)

    def read_month(self, month_id):
        """讀取指定月份的所有 entries，注入 createdAt"""
        entries = []
        doc = self._collection().document(month_id).get()
        if not doc.exists:
            logger.info(f"📄 文件不存在: daily_challenge/{month_id}")
            return entries

        doc_data = doc.to_dict()
        if not doc_data:
            logger.warning(f"⚠️ 文件內容為空: {month_id}")
            return entries

        for day_key, entry_list in doc_data.items():
            if not isinstance(entry_list, list):
                logger.warning(f"⛔ 無效資料格式: {month_id}-{day_key}")
                continue
            for entry in entry_list:
                entry["createdAt"] = f"{month_id}-{day_key}"
                entries.append(entry)

        logger.info(f"📄 讀取 {month_id} 共 {len(entries)} 筆")
        return entries

    def read_day_entries(self, year_month, day_key):
        """讀取指定日期的 entries（不注入 createdAt）"""
        doc = self._collection().document(year_month).get()
        if not doc.exists:
            return []
        data = doc.to_dict()
        return data.get(day_key, []) if data else []

    def write_day_entries(self, year_month, day_key, entries):
        """寫入指定日期的 entries（merge 模式）"""
        doc_ref = self._collection().document(year_month)
        doc_ref.set({day_key: entries}, merge=True)

    def lookup_challenge_url(self, date, map_id):
        """從 daily_challenge 查找對應的 challengeUrl"""
        month = date[:7]  # "2026-01-15" → "2026-01"
        day = date[8:]  # "2026-01-15" → "15"

        entries = self.read_day_entries(month, day)
        if not isinstance(entries, list):
            return None

        for entry in entries:
            if entry.get("mapId") == map_id:
                return entry.get("challengeUrl")
        return None
