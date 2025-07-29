from flask import Blueprint, request, jsonify
import logging
from firebase_admin import firestore

logger = logging.getLogger(__name__)


def init_geoguessr_map_routes(app, db: firestore.Client):
    bp = Blueprint("geoguessr_maps", __name__, url_prefix="/api/geoguessr/maps")

    @bp.route("", methods=["GET"])
    def get_all_maps():
        try:
            doc_ref = db.collection("geoguessr_map_index").document("map_list")
            doc = doc_ref.get()
            if doc.exists:
                return jsonify(doc.to_dict())
            else:
                return jsonify({})  # 空對應表
        except Exception as e:
            logger.exception("🔥 無法讀取地圖對應表")
            return jsonify({"error": "無法讀取地圖對應表", "detail": str(e)}), 500

    @bp.route("", methods=["POST"])
    def add_or_update_map():
        try:
            data = request.get_json()
            map_name = data.get("mapName")
            map_id = data.get("mapId")

            if not map_name or not map_id:
                return jsonify({"error": "缺少 mapName 或 mapId"}), 400

            doc_ref = db.collection("geoguessr_map_index").document("map_list")
            doc_ref.set({map_name: map_id}, merge=True)

            updated_doc = doc_ref.get()
            return jsonify(updated_doc.to_dict())

        except Exception as e:
            logger.exception("🔥 寫入地圖對應失敗")
            return jsonify({"error": "無法寫入地圖對應", "detail": str(e)}), 500

    app.register_blueprint(bp)
