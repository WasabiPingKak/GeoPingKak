import logging

from config import get_collection_name

logger = logging.getLogger(__name__)


class VideoExplanationRepo:
    def __init__(self, db):
        self.db = db

    def _collection(self):
        return self.db.collection(get_collection_name("video_explanations"))

    def get_all(self):
        """取得所有日期的影片資料，回傳 {date: maps_data}"""
        result = {}
        for doc in self._collection().stream():
            maps_data = doc.to_dict()
            if maps_data:
                result[doc.id] = maps_data
        return result

    def save(self, date, maps_data):
        """寫入指定日期的影片資料（merge 模式）"""
        doc_ref = self._collection().document(date)
        doc_ref.set(maps_data, merge=True)
