import logging
import os
import re
import time
import uuid

import psycopg2
from flask import Flask, g, jsonify, request
from flask_cors import CORS
from google import genai
from werkzeug.exceptions import HTTPException

from config import (
    DEFAULT_TOP_K,
    DEPLOY_ENV,
    MAX_TOP_K,
    SIMILARITY_THRESHOLD,
    get_gemini_key,
)
from generate import generate_answer
from search import embed_query, search

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)

def parse_cors_origins(raw):
    origins = []
    for origin in raw.split(","):
        origin = origin.strip()
        if origin.startswith("re:"):
            origins.append(re.compile(origin[3:]))
        else:
            origins.append(origin)
    return origins


CORS(app, origins=parse_cors_origins(os.getenv("CORS_ORIGINS", "http://localhost:3000")))

# Gemini client（啟動時初始化，整個 process 共用）
gemini_client: genai.Client | None = None

# Supabase 連線（per-request，避免 connection 過期）
DB_URL = os.getenv("SUPABASE_DB_URL", "")


def get_gemini() -> genai.Client:
    global gemini_client
    if gemini_client is None:
        api_key = get_gemini_key()
        gemini_client = genai.Client(api_key=api_key)
        logger.info("Gemini client 已初始化")
    return gemini_client


def get_db() -> psycopg2.extensions.connection:
    if "db" not in g:
        g.db = psycopg2.connect(DB_URL)
    return g.db


@app.teardown_appcontext
def close_db(exc):
    db = g.pop("db", None)
    if db is not None:
        db.close()


@app.before_request
def before_request_hook():
    g.request_id = request.headers.get("X-Request-ID", str(uuid.uuid4()))
    g.start_time = time.time()


@app.after_request
def after_request_hook(response):
    request_id = getattr(g, "request_id", None)
    if request_id:
        response.headers["X-Request-ID"] = request_id

    duration_ms = (time.time() - g.start_time) * 1000 if hasattr(g, "start_time") else 0
    logger.info("%s %s %s %.1fms", request.method, request.path, response.status_code, duration_ms)
    return response


@app.route("/ping")
def ping():
    return jsonify({"message": "pong", "env": DEPLOY_ENV})


@app.route("/api/assistant/search", methods=["POST"])
def search_endpoint():
    body = request.get_json(silent=True)
    if not body or not body.get("query"):
        return jsonify({"error": "缺少 query 欄位"}), 400

    query = body["query"].strip()
    if not query:
        return jsonify({"error": "query 不能為空白"}), 400

    top_k = min(int(body.get("top_k", DEFAULT_TOP_K)), MAX_TOP_K)
    threshold = float(body.get("threshold", SIMILARITY_THRESHOLD))

    embedding = embed_query(get_gemini(), query)
    results = search(get_db(), embedding, top_k=top_k, threshold=threshold)

    # float 精度處理
    for r in results:
        r["similarity"] = round(float(r["similarity"]), 4)

    return jsonify({"query": query, "top_k": top_k, "threshold": threshold, "results": results})


@app.route("/api/assistant/ask", methods=["POST"])
def ask_endpoint():
    body = request.get_json(silent=True)
    if not body or not body.get("query"):
        return jsonify({"error": "缺少 query 欄位"}), 400

    query = body["query"].strip()
    if not query:
        return jsonify({"error": "query 不能為空白"}), 400

    top_k = min(int(body.get("top_k", DEFAULT_TOP_K)), MAX_TOP_K)
    threshold = float(body.get("threshold", SIMILARITY_THRESHOLD))

    gemini = get_gemini()

    embedding = embed_query(gemini, query)
    chunks = search(get_db(), embedding, top_k=top_k, threshold=threshold)

    result = generate_answer(gemini, query, chunks, db_conn=get_db())

    return jsonify({
        "query": query,
        "answer": result["answer"],
        "sources_count": len(chunks),
        "usage": result["usage"],
    })


@app.errorhandler(404)
def not_found(e):
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(HTTPException)
def handle_http_exception(e):
    return jsonify({"error": e.name}), e.code


@app.errorhandler(Exception)
def handle_exception(e):
    logger.exception("Unhandled exception")
    return jsonify({"error": "Internal server error"}), 500
