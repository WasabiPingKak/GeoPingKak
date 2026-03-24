from flask import Blueprint, jsonify
import logging
from firebase_admin import firestore

from config import get_collection_name

logger = logging.getLogger(__name__)


def init_geoguessr_map_routes(app, db: firestore.Client):
    bp = Blueprint("geoguessr_maps", __name__, url_prefix="/api/geoguessr/maps")

    @bp.route("", methods=["GET"])
    def get_all_maps():
        try:
            collection_name = get_collection_name("geoguessr_map_index")
            doc_ref = db.collection(collection_name).document("map_list")
            doc = doc_ref.get()
            if doc.exists:
                return jsonify(doc.to_dict())
            else:
                return jsonify({})
        except Exception as e:
            logger.exception("無法讀取地圖對應表")
            return jsonify({"error": "無法讀取地圖對應表"}), 500

    app.register_blueprint(bp)
