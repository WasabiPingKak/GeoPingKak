"""RAG 生成模組。

將檢索到的 chunks 組裝成 prompt，呼叫 Gemini 生成回答。
設定（system_prompt、default_top_k 等）從 Supabase assistant_config 讀取，5 分鐘 cache。
"""

import logging
import time

from google import genai
from google.genai import types

from config import GENERATION_MODEL

logger = logging.getLogger(__name__)

FALLBACK_SYSTEM_PROMPT = "你是 GeoGuessr 繁體中文助手。根據參考資料回答玩家問題。"

CONFIG_CACHE_TTL = 300
_config_cache: dict = {"data": {}, "loaded_at": 0}


def get_config(conn) -> dict:
    now = time.time()
    if _config_cache["data"] and now - _config_cache["loaded_at"] < CONFIG_CACHE_TTL:
        return _config_cache["data"]

    try:
        with conn.cursor() as cur:
            cur.execute("SELECT key, value FROM assistant_config")
            rows = cur.fetchall()
            if rows:
                _config_cache["data"] = {k: v for k, v in rows}
                _config_cache["loaded_at"] = now
                logger.info("assistant_config 已載入（%d 筆）", len(rows))
    except Exception:
        logger.warning("讀取 assistant_config 失敗", exc_info=True)

    return _config_cache["data"]


def get_system_prompt(conn) -> str:
    return get_config(conn).get("system_prompt", FALLBACK_SYSTEM_PROMPT)


def get_default_top_k(conn) -> int:
    raw = get_config(conn).get("default_top_k", "5")
    try:
        return int(raw)
    except ValueError:
        return 5


def get_max_output_tokens(conn) -> int:
    raw = get_config(conn).get("max_output_tokens", "4096")
    try:
        return int(raw)
    except ValueError:
        return 4096


def get_temperature(conn) -> float:
    raw = get_config(conn).get("temperature", "0.7")
    try:
        return max(0.0, min(2.0, float(raw)))
    except ValueError:
        return 0.7


FALLBACK_REFORMULATE_PROMPT = """\
你是查詢改寫器。根據對話歷史，把使用者最新的訊息改寫成一個獨立的、完整的問句。

規則：
- 輸出只有改寫後的問句，不要加任何解釋。
- 如果最新訊息本身已經是完整問句，就原樣輸出。
- 保持繁體中文。"""


def get_reformulate_prompt(conn) -> str:
    return get_config(conn).get("reformulate_prompt", FALLBACK_REFORMULATE_PROMPT)


def reformulate_query(
    client: genai.Client,
    history: list[dict],
    current_query: str,
    db_conn=None,
) -> str:
    if not history:
        return current_query

    prompt = get_reformulate_prompt(db_conn) if db_conn else FALLBACK_REFORMULATE_PROMPT

    turns = []
    for msg in history[-6:]:
        role = "玩家" if msg.get("role") == "user" else "助手"
        turns.append(f"{role}：{msg['content']}")
    turns.append(f"玩家：{current_query}")
    conversation = "\n".join(turns)

    response = client.models.generate_content(
        model=GENERATION_MODEL,
        contents=[f"對話歷史：\n{conversation}\n\n請改寫最後一句玩家訊息為獨立問句。"],
        config=types.GenerateContentConfig(
            system_instruction=prompt,
            temperature=0,
            max_output_tokens=256,
        ),
    )

    reformulated = response.text.strip()
    if reformulated:
        logger.info("Query 改寫：「%s」→「%s」", current_query, reformulated)
        return reformulated
    return current_query


IMAGE_EXTENSIONS = (".png", ".jpg", ".jpeg", ".webp", ".gif")


def _is_image_url(url: str) -> bool:
    return url.lower().split("?")[0].endswith(IMAGE_EXTENSIONS)


def build_context(chunks: list[dict]) -> str:
    if not chunks:
        return "（無相關參考資料）"

    parts = []
    for i, chunk in enumerate(chunks, 1):
        header = f"[{i}] {chunk['country']}"
        if chunk.get("step_group"):
            header += f" — {chunk['step_group']}"
        image_url = chunk.get("image_url", "")
        if image_url and _is_image_url(image_url):
            header += f"\n圖片: {image_url}"
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
    max_tokens = get_max_output_tokens(db_conn) if db_conn else 4096
    temperature = get_temperature(db_conn) if db_conn else 0.7

    user_message = f"""## 參考資料

{context}

## 玩家提問

{query}"""

    response = client.models.generate_content(
        model=GENERATION_MODEL,
        contents=[user_message],
        config=types.GenerateContentConfig(
            system_instruction=system_prompt,
            temperature=temperature,
            max_output_tokens=max_tokens,
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
