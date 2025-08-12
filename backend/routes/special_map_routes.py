# routes/special_map_routes.py

from flask import Blueprint, request, jsonify
from google.cloud.firestore import Client
from datetime import datetime, timezone
import os


def init_special_map_routes(app, db: Client):
    bp = Blueprint("special_map", __name__, url_prefix="/api")

    # 後端 mapId 對應表（可改為讀取外部設定）
    MAP_ID_TO_FIELD = {
        "special-tw-funny": "FunnyTW",
        "special-tw-pun": "PunTW",
    }

    @bp.route("/special-map", methods=["POST"])
    def add_special_map_entry():
        try:
            # 🔐 權限驗證
            auth_header = request.headers.get("Authorization", "")
            token = auth_header.replace("Bearer ", "").strip()
            if token != os.getenv("ADMIN_API_KEY"):
                return jsonify({"error": "Unauthorized"}), 401

            data = request.get_json()
            challenge_url = data.get("challengeUrl", "").strip()
            country = data.get("country", "").strip()
            map_id = data.get("mapId", "").strip()

            if not challenge_url or not country or not map_id:
                return jsonify({"error": "Missing required fields"}), 400

            # 🔄 轉換 mapId → 對應欄位名（如 FunnyTW）
            field_name = MAP_ID_TO_FIELD.get(map_id)
            if not field_name:
                return jsonify({"error": f"Unknown mapId: {map_id}"}), 400

            doc_ref = db.collection("special_maps").document(f"{country}_maps")
            doc = doc_ref.get()
            existing_data = doc.to_dict() if doc.exists else {}

            entries = existing_data.get(field_name, [])

            # 🧼 去重複：看 challengeUrl 是否已存在
            if any(entry.get("challengeUrl") == challenge_url for entry in entries):
                return jsonify({"status": "duplicate"}), 200

            # ⏰ 新挑戰資料
            new_entry = {
                "challengeUrl": challenge_url,
                "country": country,
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

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    @bp.route("/special-map", methods=["GET"])
    def get_special_map_entries():
        try:
            # 🔁 mapId → 對應 Firestore 欄位、標題與國家顯示名稱
            MAP_ID_TO_META = {
                "special-tw-funny": {
                    "field": "FunnyTW",
                    "country": "台灣主題",
                    "title_prefix": "奇怪地名",
                },
                "special-tw-pun": {
                    "field": "PunTW",
                    "country": "台灣主題",
                    "title_prefix": "諧音招牌",
                },
                "special-other": {
                    "field": "Other",
                    "country": "其他主題",
                    "title_prefix": "",
                },
            }

            results = []

            for map_id, meta in MAP_ID_TO_META.items():
                country = meta["country"]
                title_prefix = meta["title_prefix"]
                field_name = meta["field"]

                doc_id = f"{map_id.split('-')[1]}_maps"  # e.g., tw_maps
                doc_ref = db.collection("special_maps").document(doc_id)
                doc = doc_ref.get()

                if not doc.exists:
                    continue

                data = doc.to_dict()
                entries = data.get(field_name, [])

                for i, entry in enumerate(entries):
                    created_date = entry.get("createdAt", "")[:10]  # yyyy-mm-dd
                    results.append(
                        {
                            "mapId": entry.get("mapId", map_id),
                            "challengeUrl": entry.get("challengeUrl", ""),
                            "createdAt": created_date,
                            "country": country,
                            "title": (
                                f"{title_prefix} {str(i+1).zfill(2)}"
                                if title_prefix
                                else ""
                            ),
                        }
                    )

            return jsonify(results), 200

        except Exception as e:
            return jsonify({"error": str(e)}), 500

    app.register_blueprint(bp)
