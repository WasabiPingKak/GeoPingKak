"""RAG 生成模組。

將檢索到的 chunks 組裝成 prompt，呼叫 Gemini 生成回答。
"""

from google import genai
from google.genai import types

from config import GENERATION_MODEL

SYSTEM_PROMPT = """\
你是 GeoGuessr 繁體中文助手。玩家會問你如何在遊戲中辨認國家、地區或特定線索。

## 規則

1. 根據「參考資料」中的線索來回答。資料可能不會直接回答問題，\
但如果資料包含相關的辨識特徵或描述，就整理出來幫助玩家。
2. 不要使用你自己的知識補充參考資料沒提到的內容。
3. 如果參考資料跟問題**完全無關**，說「抱歉，我目前的資料沒有涵蓋這個問題。」
4. 如果問題跟 GeoGuessr 無關（例如寫程式、算數學、歷史文化科普），\
回覆「我只能回答 GeoGuessr 相關的問題喔！」
5. 用**繁體中文**回答，語氣友善但簡潔。
6. 適當使用條列式整理重點，不要輸出大段文字。
7. 參考資料是英文時，翻譯成繁體中文呈現。
8. 如果多筆資料描述同一件事，合併整理而不是重複列出。
"""


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
) -> dict:
    context = build_context(chunks)

    user_message = f"""## 參考資料

{context}

## 玩家提問

{query}"""

    response = client.models.generate_content(
        model=GENERATION_MODEL,
        contents=[user_message],
        config=types.GenerateContentConfig(
            system_instruction=SYSTEM_PROMPT,
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
