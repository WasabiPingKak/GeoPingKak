# routes/special_map_routes.py

import logging
import os
from datetime import datetime, timezone

from flask import Blueprint, jsonify, request
from google.cloud.firestore import Client

from auth import verify_bearer_token
from error_codes import ErrorCode, json_error
from repositories.special_map_repo import SpecialMapRepo
from utils.rate_limiter import limiter
from validators import validate_geoguessr_url

logger = logging.getLogger(__name__)


def init_special_map_routes(app, db: Client):  # noqa: C901
    bp = Blueprint("special_map", __name__, url_prefix="/api")
    repo = SpecialMapRepo(db)

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

    @bp.route("/special-map", methods=["POST"])
    @limiter.limit("10 per minute")
    def add_special_map_entry():
        try:
            auth_header = request.headers.get("Authorization", "")
            if not verify_bearer_token(auth_header, os.getenv("ADMIN_API_KEY", "")):
                return json_error(401, ErrorCode.UNAUTHORIZED, "Invalid or missing token")

            data = request.get_json()
            if not data or not isinstance(data, dict):
                return json_error(400, ErrorCode.MISSING_FIELD, "Request body is required")

            challenge_url = data.get("challengeUrl", "").strip()
            map_id = data.get("mapId", "").strip()

            if not challenge_url or not map_id:
                return json_error(400, ErrorCode.MISSING_FIELD, "Missing required fields: mapId, challengeUrl")

            if not validate_geoguessr_url(challenge_url):
                return json_error(
                    400, ErrorCode.INVALID_FORMAT, "Invalid challengeUrl format. Must be a GeoGuessr challenge URL"
                )

            meta = MAP_ID_TO_META.get(map_id)
            if not meta:
                return json_error(400, ErrorCode.INVALID_FIELD, f"Unknown mapId: {map_id}")

            field_name = meta["field"]
            doc_id = meta["doc_id"]

            existing_data = repo.get_document(doc_id)
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
            repo.save_entries(doc_id, field_name, entries)

            return (
                jsonify({"added": new_entry, "field": field_name, "length": len(entries)}),
                200,
            )

        except Exception:
            logger.exception("Failed to write special map")
            return json_error(500, ErrorCode.INTERNAL_ERROR, "Failed to write special map")

    @bp.route("/special-map", methods=["GET"])
    def get_special_map_entries():
        try:
            results = []

            for map_id, meta in MAP_ID_TO_META.items():
                field_name = meta["field"]
                doc_id = meta["doc_id"]

                data = repo.get_document(doc_id)
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
                            "title": (f"{title_prefix} {str(i + 1).zfill(2)}" if title_prefix else ""),
                        }
                    )

            return jsonify(results), 200

        except Exception:
            logger.exception("Failed to read special maps")
            return json_error(500, ErrorCode.INTERNAL_ERROR, "Failed to read special maps")

    app.register_blueprint(bp)
