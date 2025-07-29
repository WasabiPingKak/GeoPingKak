from flask import Flask, jsonify
import os
import firebase_admin
from firebase_admin import credentials, firestore

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


db = initialize_firestore()


@app.route("/ping")
def ping():
    return jsonify({"message": "pong"})


@app.route("/test-firestore")
def test_firestore():
    doc_ref = db.collection("test").document("hello")
    doc_ref.set({"msg": "Hello from Cloud Run"})
    return jsonify({"status": "ok"})
