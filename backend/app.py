from flask import Flask, jsonify
import os
import logging
import firebase_admin
from firebase_admin import credentials, firestore
from flask_cors import CORS

from routes.geoguessr_map_routes import init_geoguessr_map_routes
from routes.daily_challenge_writer import init_daily_challenge_writer_route
from routes.daily_challenge_reader import init_daily_challenge_reader_route

logging.basicConfig(level=logging.INFO)
app = Flask(__name__)

CORS(app, supports_credentials=True)


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

# ✅ 註冊所有路由模組
init_geoguessr_map_routes(app, db)
init_daily_challenge_writer_route(app, db)
init_daily_challenge_reader_route(app, db)


# ✅ 測試端點
@app.route("/ping")
def ping():
    return jsonify({"message": "pong"})


@app.route("/test-firestore")
def test_firestore():
    doc_ref = db.collection("test").document("hello")
    doc_ref.set({"msg": "Hello from Cloud Run"})
    return jsonify({"status": "ok"})
