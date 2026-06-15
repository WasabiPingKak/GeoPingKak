"""將 RAG chunk 做 embedding 並寫入 Supabase pgvector。

讀取: assistant/data/chunks/all_chunks.json
寫入: Supabase rag_chunks 資料表
需要: SUPABASE_DB_URL (.env), GEMINI_API_KEY (Secret Manager)
"""

import json
import os
import sys
import time
from pathlib import Path

import psycopg2
from psycopg2.extras import execute_values
from dotenv import load_dotenv
from google import genai
from google.cloud import secretmanager

CHUNKS_PATH = Path(__file__).resolve().parent.parent / "data" / "chunks" / "all_chunks.json"
GCP_PROJECT = "geopingkak"
SECRET_NAME = "GEMINI_API_KEY"
EMBEDDING_MODEL = "gemini-embedding-001"
EMBEDDING_DIM = 768
BATCH_SIZE = 100
REQUEST_INTERVAL = 2
MAX_RETRIES = 10
RATE_LIMIT_WAIT = 65  # 429 時等滿一個 rate limit 窗口再重試


def get_gemini_key() -> str:
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{GCP_PROJECT}/secrets/{SECRET_NAME}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("utf-8")


def load_chunks() -> list[dict]:
    if not CHUNKS_PATH.exists():
        print(f"找不到 chunk 檔案: {CHUNKS_PATH}")
        print("請先執行 python assistant/scripts/transform.py")
        sys.exit(1)
    data = json.loads(CHUNKS_PATH.read_text(encoding="utf-8"))
    print(f"載入 {len(data)} 個 chunks")
    return data


def embed_texts(client: genai.Client, texts: list[str]) -> list[list[float]]:
    for attempt in range(MAX_RETRIES):
        try:
            result = client.models.embed_content(
                model=EMBEDDING_MODEL,
                contents=texts,
                config={
                    "task_type": "RETRIEVAL_DOCUMENT",
                    "output_dimensionality": EMBEDDING_DIM,
                },
            )
            return [e.values for e in result.embeddings]
        except Exception as e:
            if "429" in str(e) and attempt < MAX_RETRIES - 1:
                print(f"    Rate limited，等待 {RATE_LIMIT_WAIT} 秒後重試 ({attempt + 1}/{MAX_RETRIES})...")
                time.sleep(RATE_LIMIT_WAIT)
            else:
                raise
    return []


def upsert_chunks(conn, chunks: list[dict], embeddings: list[list[float]]):
    rows = []
    for chunk, emb in zip(chunks, embeddings):
        emb_str = "[" + ",".join(str(v) for v in emb) + "]"
        rows.append((
            chunk["id"],
            chunk["country"],
            chunk.get("country_code", ""),
            json.dumps(chunk.get("region", []), ensure_ascii=False),
            chunk.get("step_group", ""),
            chunk.get("tags", []),
            chunk["text"],
            chunk.get("image_url", ""),
            chunk.get("image_link", ""),
            chunk.get("source_url", ""),
            emb_str,
        ))

    with conn.cursor() as cur:
        execute_values(
            cur,
            """
            INSERT INTO rag_chunks
                (id, country, country_code, region, step_group, tags, text,
                 image_url, image_link, source_url, embedding)
            VALUES %s
            ON CONFLICT (id) DO UPDATE SET
                country = EXCLUDED.country,
                country_code = EXCLUDED.country_code,
                region = EXCLUDED.region,
                step_group = EXCLUDED.step_group,
                tags = EXCLUDED.tags,
                text = EXCLUDED.text,
                image_url = EXCLUDED.image_url,
                image_link = EXCLUDED.image_link,
                source_url = EXCLUDED.source_url,
                embedding = EXCLUDED.embedding
            """,
            rows,
            template="(%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s::vector)",
        )
    conn.commit()


def main():
    load_dotenv(Path(__file__).resolve().parent.parent / ".env")

    db_url = os.environ.get("SUPABASE_DB_URL")
    if not db_url:
        print("缺少 SUPABASE_DB_URL，請設定在 assistant/.env")
        sys.exit(1)

    print("從 Secret Manager 取得 GEMINI_API_KEY...")
    api_key = get_gemini_key()
    gemini = genai.Client(api_key=api_key)
    print("Gemini API 已設定")

    chunks = load_chunks()

    print("連線 Supabase PostgreSQL...")
    conn = psycopg2.connect(db_url)
    print("已連線")

    total = len(chunks)
    inserted = 0
    total_batches = (total + BATCH_SIZE - 1) // BATCH_SIZE

    for i in range(0, total, BATCH_SIZE):
        batch = chunks[i : i + BATCH_SIZE]
        texts = [c["text"] for c in batch]

        print(f"  Embedding batch {i // BATCH_SIZE + 1}/{total_batches} ({len(batch)} 筆)...")
        embeddings = embed_texts(gemini, texts)

        upsert_chunks(conn, batch, embeddings)
        inserted += len(batch)
        print(f"  寫入完成 ({inserted}/{total})")

        if i + BATCH_SIZE < total:
            time.sleep(REQUEST_INTERVAL)

    conn.close()
    print(f"\n全部完成: {inserted} 筆 chunk 已寫入 rag_chunks")


if __name__ == "__main__":
    main()
