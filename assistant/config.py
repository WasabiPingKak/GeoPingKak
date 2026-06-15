import os

from google.cloud import secretmanager

GCP_PROJECT = "geopingkak"
GEMINI_SECRET_NAME = "GEMINI_API_KEY"
EMBEDDING_MODEL = "gemini-embedding-001"
EMBEDDING_DIM = 768

DEFAULT_TOP_K = 5
MAX_TOP_K = 20
SIMILARITY_THRESHOLD = 0.45

DEPLOY_ENV = os.getenv("DEPLOY_ENV", "staging")


def get_gemini_key() -> str:
    """從 Secret Manager 取得 Gemini API key。"""
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{GCP_PROJECT}/secrets/{GEMINI_SECRET_NAME}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("utf-8")
