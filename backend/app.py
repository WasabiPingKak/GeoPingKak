from flask import Flask, jsonify
import os
import re
import logging
import firebase_admin
from firebase_admin import credentials, firestore
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

import config  # 環境配置管理
from routes.daily_challenge_writer import init_daily_challenge_writer_route
from routes.daily_challenge_reader import init_daily_challenge_reader_route
from routes.special_map_routes import init_special_map_routes
from routes.video_explanation_routes import init_video_explanation_routes

logging.basicConfig(level=logging.INFO)
app = Flask(__name__)

def parse_cors_origins(raw):
    """解析 CORS origins，支援 regex pattern（以 re: 開頭）"""
    origins = []
    for origin in raw.split(","):
        origin = origin.strip()
        if origin.startswith("re:"):
            origins.append(re.compile(origin[3:]))
        else:
            origins.append(origin)
    return origins

CORS(app, origins=parse_cors_origins(os.getenv("CORS_ORIGINS", "http://localhost:3000")))

# ✅ Rate Limiting（per-IP）
limiter = Limiter(
    get_remote_address,
    app=app,
    default_limits=["60 per minute"],
    storage_uri="memory://",
)


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
init_daily_challenge_writer_route(app, db)
init_daily_challenge_reader_route(app, db)
init_special_map_routes(app, db)
init_video_explanation_routes(app, db)


# ✅ 測試端點
@app.route("/ping")
def ping():
    return jsonify({"message": "pong"})
