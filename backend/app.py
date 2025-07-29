from flask import Flask, jsonify
import os
import logging
import firebase_admin
from firebase_admin import credentials, firestore
from routes.geoguessr_map_routes import init_geoguessr_map_routes

app = Flask(__name__)


# ✅ Firestore 初始化（自動使用 Cloud Run 身份）
def initialize_firestore():
    if not firebase_admin._apps:
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(
            cred,
            {
                "projectId": os.environ.get("GOOGLE_CLOUD_PROJECT"),
            },
        )
    return firestore.client()


# 初始化 Firebase，加入錯誤處理
try:
    db = initialize_firestore()
except Exception:
    logging.error("🔥 初始化 Firebase 失敗，服務無法啟動", exc_info=True)
    raise

init_geoguessr_map_routes(app, db)


@app.route("/ping")
def ping():
    return jsonify({"message": "pong"})


@app.route("/test-firestore")
def test_firestore():
    doc_ref = db.collection("test").document("hello")
    doc_ref.set({"msg": "Hello from Cloud Run"})
    return jsonify({"status": "ok"})
