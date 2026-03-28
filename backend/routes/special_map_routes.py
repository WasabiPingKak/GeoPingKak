# routes/special_map_routes.py

import logging
import os
import re
from datetime import datetime, timezone

from flask import Blueprint, jsonify, request
from google.cloud.firestore import Client

from auth import verify_bearer_token
from config import get_collection_name

logger = logging.getLogger(__name__)


def init_special_map_routes(app, db: Client):  # noqa: C901
    bp = Blueprint("special_map", __name__, url_prefix="/api")

    # mapId → Firestore 欄位名、document ID、顯示用 metadata
    MAP_ID_TO_META = {
        "special-tw-funny": {
            "field": "tw-funny",
            "doc_id": "tw_maps",
            "country": "台灣主題",
            "title_prefix": "奇怪地名",
        },
        "special-tw-pun": {
            "field": "tw-pun",
            "doc_id": "tw_maps",
            "country": "台灣主題",
            "title_prefix": "諧音招牌",
        },
        "special-other": {
            "field": "other",
            "doc_id": "other_maps",
            "country": "其他主題",
            "title_prefix": "",
        },
    }

    GEOGUESSR_URL_PATTERN = re.compile(
        r"^https://(www\.)?geoguessr\.com/challenge/[A-Za-z0-9]+$"
    )

    @bp.route("/special-map", methods=["POST"])
    def add_special_map_entry():
        try:
            auth_header = request.headers.get("Authorization", "")
            if not verify_bearer_token(auth_header, os.getenv("ADMIN_API_KEY", "")):
                return jsonify({"error": "Unauthorized"}), 401

            data = request.get_json()
            if not data or not isinstance(data, dict):
                return jsonify({"error": "Request body is required"}), 400

            challenge_url = data.get("challengeUrl", "").strip()
            map_id = data.get("mapId", "").strip()

            if not challenge_url or not map_id:
                return jsonify({"error": "Missing required fields"}), 400

            if not GEOGUESSR_URL_PATTERN.match(challenge_url):
                return jsonify({"error": "Invalid challengeUrl format. Must be a GeoGuessr challenge URL"}), 400

            meta = MAP_ID_TO_META.get(map_id)
            if not meta:
                return jsonify({"error": f"Unknown mapId: {map_id}"}), 400

            field_name = meta["field"]
            doc_id = meta["doc_id"]

            collection_name = get_collection_name("special_maps")
            doc_ref = db.collection(collection_name).document(doc_id)
            doc = doc_ref.get()
            existing_data = doc.to_dict() if doc.exists else {}

            entries = existing_data.get(field_name, [])

            if any(entry.get("challengeUrl") == challenge_url for entry in entries):
                return jsonify({"status": "duplicate"}), 200

            new_entry = {
                "challengeUrl": challenge_url,
                "country": meta["country"],
                "mapId": map_id,
                "createdAt": datetime.now(timezone.utc).isoformat(),
            }

            entries.append(new_entry)
            doc_ref.set({field_name: entries}, merge=True)

            return (
                jsonify(
                    {"added": new_entry, "field": field_name, "length": len(entries)}
                ),
                200,
            )

        except Exception:
            logger.exception("寫入特殊地圖失敗")
            return jsonify({"error": "寫入特殊地圖失敗"}), 500

    @bp.route("/special-map", methods=["GET"])
    def get_special_map_entries():
        try:
            results = []
            collection_name = get_collection_name("special_maps")

            for map_id, meta in MAP_ID_TO_META.items():
                field_name = meta["field"]
                doc_id = meta["doc_id"]

                doc_ref = db.collection(collection_name).document(doc_id)
                doc = doc_ref.get()

                if not doc.exists:
                    continue

                data = doc.to_dict()
                entries = data.get(field_name, [])

                for i, entry in enumerate(entries):
                    created_date = entry.get("createdAt", "")[:10]
                    title_prefix = meta["title_prefix"]
                    results.append(
                        {
                            "mapId": entry.get("mapId", map_id),
                            "challengeUrl": entry.get("challengeUrl", ""),
                            "createdAt": created_date,
                            "country": meta["country"],
                            "title": (
                                f"{title_prefix} {str(i+1).zfill(2)}"
                                if title_prefix
                                else ""
                            ),
                        }
                    )

            return jsonify(results), 200

        except Exception:
            logger.exception("讀取特殊地圖失敗")
            return jsonify({"error": "讀取特殊地圖失敗"}), 500

    app.register_blueprint(bp)
