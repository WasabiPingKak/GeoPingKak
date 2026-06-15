"""RAG 向量檢索模組。

提供 embed_query（文字 → 向量）和 search（向量 → top-K chunks）。
供 Flask route 和 scripts/search_test.py 共用。
"""

import psycopg2
from google import genai

from config import EMBEDDING_DIM, EMBEDDING_MODEL, SIMILARITY_THRESHOLD


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


def search(
    conn: psycopg2.extensions.connection,
    query_embedding: list[float],
    top_k: int = 5,
    threshold: float = SIMILARITY_THRESHOLD,
) -> list[dict]:
    emb_str = "[" + ",".join(str(v) for v in query_embedding) + "]"
    with conn.cursor() as cur:
        cur.execute(
            """
            SELECT
                id, country, country_code, step_group, tags, text,
                image_url, source_url,
                1 - (embedding <=> %s::vector) AS similarity
            FROM rag_chunks
            WHERE 1 - (embedding <=> %s::vector) >= %s
            ORDER BY embedding <=> %s::vector
            LIMIT %s
            """,
            (emb_str, emb_str, threshold, emb_str, top_k),
        )
        columns = [desc[0] for desc in cur.description]
        return [dict(zip(columns, row)) for row in cur.fetchall()]
