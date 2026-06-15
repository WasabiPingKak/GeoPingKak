"""RAG 檢索品質測試腳本。

用法: python assistant/scripts/search_test.py [查詢文字]
不帶參數時執行預設測試組（相關 / 灰色地帶 / 無關查詢）。
"""

import os
import sys
import time
from pathlib import Path

# Windows cp950 無法輸出某些 Unicode 字元，強制 UTF-8
if sys.stdout.encoding != "utf-8":
    sys.stdout.reconfigure(encoding="utf-8")  # type: ignore[union-attr]

import psycopg2
from dotenv import load_dotenv
from google import genai
from google.cloud import secretmanager

GCP_PROJECT = "geopingkak"
SECRET_NAME = "GEMINI_API_KEY"
EMBEDDING_MODEL = "gemini-embedding-001"
EMBEDDING_DIM = 768
TOP_K = 5

# 預設測試查詢：涵蓋三種情境
TEST_QUERIES = [
    # 高相關：具體 GeoGuessr 線索
    "泰國的車牌長什麼樣",
    "怎麼分辨日本和韓國的街景",
    "非洲哪些國家有 Google 街景覆蓋",
    "歐洲車牌藍色邊條代表什麼",
    # 灰色地帶：國家相關但非 GeoGuessr
    "泰國的歷史文化介紹",
    "日本的飲食文化特色",
    "巴西的經濟發展狀況",
    # 完全無關
    "幫我寫一個 Python 排序演算法",
    "今天天氣如何",
    "推薦好看的 Netflix 影集",
]


def get_gemini_key() -> str:
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{GCP_PROJECT}/secrets/{SECRET_NAME}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("utf-8")


def embed_query(client: genai.Client, text: str) -> list[float]:
    result = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=[text],
        config={
            "task_type": "RETRIEVAL_QUERY",
            "output_dimensionality": EMBEDDING_DIM,
        },
    )
    return result.embeddings[0].values


def search(conn, query_embedding: list[float], top_k: int = TOP_K) -> list[dict]:
    emb_str = "[" + ",".join(str(v) for v in query_embedding) + "]"
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT
                id, country, country_code, step_group, tags, text,
                1 - (embedding <=> %s::vector) AS similarity
            FROM rag_chunks
            ORDER BY embedding <=> %s::vector
            LIMIT %s
            """,
            (emb_str, emb_str, top_k),
        )
        columns = [desc[0] for desc in cur.description]
        return [dict(zip(columns, row)) for row in cur.fetchall()]


def print_results(query: str, results: list[dict]):
    print(f"\n{'=' * 70}")
    print(f"查詢: {query}")
    print(f"{'=' * 70}")

    if not results:
        print("  （無結果）")
        return

    for i, r in enumerate(results, 1):
        sim = r["similarity"]
        # 簡單的品質標記
        if sim >= 0.5:
            quality = "●"  # 高相關
        elif sim >= 0.3:
            quality = "◐"  # 中等
        else:
            quality = "○"  # 低相關

        text_preview = r["text"][:80].replace("\n", " ")
        tags = ", ".join(r["tags"]) if r["tags"] else ""

        print(f"  {quality} #{i}  sim={sim:.4f}  [{r['country']}] {r.get('step_group', '')}")
        if tags:
            print(f"       tags: {tags}")
        print(f"       {text_preview}...")
        print()


def print_summary(all_results: dict[str, list[dict]]):
    print(f"\n{'=' * 70}")
    print("分數摘要")
    print(f"{'=' * 70}")
    print(f"  {'查詢':<30} {'最高':>6} {'最低':>6} {'平均':>6}")
    print(f"  {'-' * 54}")

    for query, results in all_results.items():
        if not results:
            continue
        sims = [r["similarity"] for r in results]
        label = query[:28] + "…" if len(query) > 28 else query
        print(f"  {label:<30} {max(sims):>6.4f} {min(sims):>6.4f} {sum(sims)/len(sims):>6.4f}")


def main():
    load_dotenv(Path(__file__).resolve().parent.parent / ".env")

    db_url = os.environ.get("SUPABASE_DB_URL")
    if not db_url:
        print("缺少 SUPABASE_DB_URL，請設定在 assistant/.env")
        sys.exit(1)

    print("從 Secret Manager 取得 GEMINI_API_KEY...")
    api_key = get_gemini_key()
    gemini = genai.Client(api_key=api_key)

    print("連線 Supabase...")
    conn = psycopg2.connect(db_url)

    # 互動模式：帶參數時只查一筆
    if len(sys.argv) > 1:
        query = " ".join(sys.argv[1:])
        embedding = embed_query(gemini, query)
        results = search(conn, embedding)
        print_results(query, results)
        conn.close()
        return

    # 批次模式：跑預設測試組
    print(f"執行 {len(TEST_QUERIES)} 筆測試查詢...\n")
    all_results: dict[str, list[dict]] = {}

    for query in TEST_QUERIES:
        embedding = embed_query(gemini, query)
        results = search(conn, embedding)
        all_results[query] = results
        print_results(query, results)
        time.sleep(1)

    print_summary(all_results)

    conn.close()
    print("\n測試完成。")


if __name__ == "__main__":
    main()
