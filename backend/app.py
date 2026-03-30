import json
import logging
import os
import re
import time
import uuid

import firebase_admin
from firebase_admin import credentials, firestore
from flask import Flask, g, jsonify, request
from flask_cors import CORS
from werkzeug.exceptions import HTTPException
from werkzeug.middleware.proxy_fix import ProxyFix

from config import DEPLOY_ENV
from error_codes import ErrorCode, json_error
from routes.daily_challenge_reader import init_daily_challenge_reader_route
from routes.daily_challenge_writer import init_daily_challenge_writer_route
from routes.special_map_routes import init_special_map_routes
from routes.video_explanation_routes import init_video_explanation_routes
from utils.rate_limiter import limiter


# ✅ Structured JSON logging with request ID
class JSONFormatter(logging.Formatter):
    def format(self, record):
        log_entry = {
            "timestamp": self.formatTime(record),
            "level": record.levelname,
            "logger": record.name,
            "message": record.getMessage(),
        }
        if hasattr(record, "request_id"):
            log_entry["request_id"] = record.request_id
        if record.exc_info and record.exc_info[0]:
            log_entry["exception"] = self.formatException(record.exc_info)
        return json.dumps(log_entry, ensure_ascii=False)


class RequestIDFilter(logging.Filter):
    """自動從 Flask g 注入 request_id 到每筆 log record"""

    def filter(self, record):
        try:
            record.request_id = g.request_id
        except (AttributeError, RuntimeError):
            record.request_id = None
        return True


handler = logging.StreamHandler()
handler.setFormatter(JSONFormatter())
handler.addFilter(RequestIDFilter())
logging.basicConfig(level=logging.INFO, handlers=[handler])

app = Flask(__name__)
app.wsgi_app = ProxyFix(app.wsgi_app, x_for=1, x_proto=1, x_host=1)


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


# ✅ Request ID + 結構化日誌中介層
@app.before_request
def before_request_hook():
    g.request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    g.start_time = time.time()


@app.after_request
def after_request_hook(response):
    # 注入 request ID 到回應標頭
    request_id = getattr(g, "request_id", None)
    if request_id:
        response.headers["X-Request-ID"] = request_id

    # 結構化 access log
    duration_ms = (time.time() - g.start_time) * 1000 if hasattr(g, "start_time") else 0
    logger = logging.getLogger("access")
    logger.info(
        "%s %s %s %.1fms",
        request.method,
        request.path,
        response.status_code,
        duration_ms,
    )

    # Cache-Control：公開 GET 端點加快取標頭
    if request.method == "GET" and response.status_code == 200:
        response.headers.setdefault("Cache-Control", "public, max-age=60, stale-while-revalidate=300")

    return response


# ✅ Rate Limiting（per-IP，storage 可透過 RATE_LIMIT_STORAGE_URL 切換 Redis）
limiter.init_app(app)


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

# ✅ OpenAPI / Swagger UI（僅 staging 環境啟用）
if DEPLOY_ENV == "staging":
    from flask_swagger_ui import get_swaggerui_blueprint

    SWAGGER_URL = "/api/docs"
    API_SPEC_URL = "/api/openapi.yaml"

    swagger_ui = get_swaggerui_blueprint(SWAGGER_URL, API_SPEC_URL, config={"app_name": "GeoPingKak API"})
    app.register_blueprint(swagger_ui, url_prefix=SWAGGER_URL)

    @app.route(API_SPEC_URL)
    def serve_openapi_spec():
        """提供 OpenAPI spec 檔案"""
        from flask import send_from_directory

        return send_from_directory(os.path.dirname(__file__), "openapi.yaml", mimetype="text/yaml")


# ✅ 註冊所有路由模組
init_daily_challenge_writer_route(app, db)
init_daily_challenge_reader_route(app, db)
init_special_map_routes(app, db)
init_video_explanation_routes(app, db)


# ✅ 全域錯誤處理：確保未預期例外回傳 JSON 而非 HTML
@app.errorhandler(404)
def not_found(e):
    return json_error(404, ErrorCode.NOT_FOUND, "Not found")


@app.errorhandler(405)
def method_not_allowed(e):
    return json_error(405, ErrorCode.METHOD_NOT_ALLOWED, "Method not allowed")


@app.errorhandler(429)
def rate_limit_exceeded(e):
    return json_error(429, ErrorCode.RATE_LIMITED, "Too many requests")


@app.errorhandler(HTTPException)
def handle_http_exception(e):
    return json_error(e.code, ErrorCode.INTERNAL_ERROR, e.name)


@app.errorhandler(Exception)
def handle_exception(e):
    logging.exception("Unhandled exception")
    return json_error(500, ErrorCode.INTERNAL_ERROR, "Internal server error")


# ✅ 測試端點
@app.route("/ping")
def ping():
    return jsonify({"message": "pong"})
