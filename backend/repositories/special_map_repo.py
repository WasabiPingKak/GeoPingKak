import logging

from config import get_collection_name

logger = logging.getLogger(__name__)


class SpecialMapRepo:
    def __init__(self, db):
        self.db = db

    def _collection(self):
        return self.db.collection(get_collection_name("special_maps"))

    def get_document(self, doc_id):
        """讀取指定文件的完整資料，不存在回傳空 dict"""
        doc = self._collection().document(doc_id).get()
        if not doc.exists:
            return {}
        return doc.to_dict() or {}

    def save_entries(self, doc_id, field_name, entries):
        """寫入指定欄位的 entries（merge 模式）"""
        doc_ref = self._collection().document(doc_id)
        doc_ref.set({field_name: entries}, merge=True)
