"""RAG 生成模組。

將檢索到的 chunks 組裝成 prompt，呼叫 Gemini 生成回答。
System prompt 從 Supabase assistant_config table 讀取，5 分鐘 cache。
"""

import logging
import time

from google import genai
from google.genai import types

from config import GENERATION_MODEL

logger = logging.getLogger(__name__)

FALLBACK_SYSTEM_PROMPT = "你是 GeoGuessr 繁體中文助手。根據參考資料回答玩家問題。"

PROMPT_CACHE_TTL = 300
_prompt_cache: dict = {"text": None, "loaded_at": 0}


def get_system_prompt(conn) -> str:
    now = time.time()
    if _prompt_cache["text"] and now - _prompt_cache["loaded_at"] < PROMPT_CACHE_TTL:
        return _prompt_cache["text"]

    try:
        with conn.cursor() as cur:
            cur.execute(
                "SELECT value FROM assistant_config WHERE key = 'system_prompt'"
            )
            row = cur.fetchone()
            if row:
                _prompt_cache["text"] = row[0]
                _prompt_cache["loaded_at"] = now
                logger.info("System prompt 已從 DB 載入（%d 字元）", len(row[0]))
                return row[0]
    except Exception:
        logger.warning("讀取 system prompt 失敗，使用 fallback", exc_info=True)

    return _prompt_cache["text"] or FALLBACK_SYSTEM_PROMPT


def build_context(chunks: list[dict]) -> str:
    """將檢索結果格式化成 LLM 可讀的參考資料區塊。"""
    if not chunks:
        return "（無相關參考資料）"

    parts = []
    for i, chunk in enumerate(chunks, 1):
        header = f"[{i}] {chunk['country']}"
        if chunk.get("step_group"):
            header += f" — {chunk['step_group']}"
        text = chunk["text"].strip()
        parts.append(f"{header}\n{text}")

    return "\n\n".join(parts)


def generate_answer(
    client: genai.Client,
    query: str,
    chunks: list[dict],
    db_conn=None,
) -> dict:
    context = build_context(chunks)
    system_prompt = get_system_prompt(db_conn) if db_conn else FALLBACK_SYSTEM_PROMPT

    user_message = f"""## 參考資料

{context}

## 玩家提問

{query}"""

    response = client.models.generate_content(
        model=GENERATION_MODEL,
        contents=[user_message],
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            temperature=0.3,
            max_output_tokens=2048,
        ),
    )

    usage = response.usage_metadata
    return {
        "answer": response.text,
        "usage": {
            "prompt_tokens": usage.prompt_token_count,
            "completion_tokens": usage.candidates_token_count,
            "total_tokens": usage.total_token_count,
        },
    }
