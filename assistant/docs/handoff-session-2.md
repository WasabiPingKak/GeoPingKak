# RAG Assistant — Session 2 Handoff

> 日期：2026-06-15
> 分支：develop（commit 3b4765f）

---

## 本次完成

### 1. Gemini API Key 設定

- 在 Google AI Studio 建立 API key
- 存入 GCP Secret Manager（`GEMINI_API_KEY`）
- 權限：Default compute SA + github-actions-deploy SA 都有 `Secret Manager 密鑰存取者`
- 開通 Paid Tier（預付 NT$500 credits，一年有效）

### 2. Supabase 專案建立

- 專案名稱：GeoPingKak
- Region：Southeast Asia (Singapore) / ap-southeast-1
- Project ID：`smiilyaxppqcpksdsuig`
- URL：`https://smiilyaxppqcpksdsuig.supabase.co`
- Compute：NANO（免費 tier）
- 啟用 pgvector 擴充

### 3. pgvector 資料表

在 Supabase SQL Editor 建立：

```sql
create table rag_chunks (
  id text primary key,
  country text not null,
  country_code text,
  region text,
  step_group text,
  tags text[],
  text text not null,
  image_url text,
  image_link text,
  source_url text,
  embedding vector(768)
);

create index on rag_chunks
using ivfflat (embedding vector_cosine_ops)
with (lists = 20);
```

### 4. Embedding Pipeline（embed.py）

- 腳本：`assistant/scripts/embed.py`
- 從 Secret Manager 取 Gemini API key（不落地）
- 讀 `all_chunks.json` → 批次呼叫 Gemini Embedding API → UPSERT 寫入 Supabase
- **5,305/5,305 筆全部完成**
- 重跑指令：`python assistant/scripts/embed.py`

技術細節：
- SDK：`google-genai`（新版，`google-generativeai` 已棄用）
- 模型：`gemini-embedding-001`（原生 3072 維，截斷到 768 維）
- `task_type=RETRIEVAL_DOCUMENT`（寫入端）
- UPSERT（ON CONFLICT DO UPDATE）確保 idempotent
- 429 rate limit 自動重試（最多 10 次，每次等 65 秒）

### 5. 踩過的坑

- `google-generativeai` 套件已棄用，改用 `google-genai`（import 從 `import google.generativeai as genai` 改為 `from google import genai`）
- 舊的 `text-embedding-004` 模型已下架，改用 `gemini-embedding-001`
- `gemini-embedding-001` 預設 3072 維，需要 `output_dimensionality=768` 截斷
- Gemini 免費 tier 每日上限 1,000 次 embed_content 請求，5,305 筆需要 5 天才能跑完，最終開通 Paid Tier 解決
- pgvector 的 vector 型別需要字串格式 `[0.1,0.2,...]`，不能直接傳 Python list
- psycopg2 `execute_values` 的 template 要用 `%s` 位置參數配 tuple，不能用 `%(name)s` 配 dict

---

## 下一步：檢索 API

### 要做的事

1. 寫檢索測試腳本（本地驗證品質）：
   - 接收查詢文字
   - 呼叫 Gemini Embedding（`task_type=RETRIEVAL_QUERY`）
   - pgvector cosine similarity 搜尋 top-K chunks
   - 印出結果驗證相關性

2. 包成 Cloud Run API（`assistant/` 目錄）：
   - Flask endpoint：POST `/api/assistant/search`
   - 輸入：query 文字
   - 輸出：top-K 相關 chunks

3. 驗證檢索品質後進入第三階段（LLM 整合）

---

## 四階段總進度

| 階段 | 內容 | 狀態 |
|------|------|------|
| 1. 資料收集 | fetch + transform | ✅ 完成 |
| 2. RAG Pipeline | embedding + pgvector + 檢索 API | embedding ✅，檢索 API ⬜ |
| 3. LLM 整合 | system prompt + 生成 API + vision | ⬜ |
| 4. 前端 + 部署 | 聊天 UI + Cloud Run | ⬜ |

---

## 外部服務帳號

| 服務 | 用途 | 位置 |
|------|------|------|
| Gemini API Key | Embedding + 未來 LLM 生成 | Secret Manager `GEMINI_API_KEY` |
| Supabase DB URL | pgvector 連線 | `assistant/.env`（gitignored） |

---

## 檔案結構

```
assistant/
├── .gitignore              # 排除 data/raw/、data/chunks/、.env
├── .env                    # SUPABASE_DB_URL（gitignored）
├── requirements.txt        # google-genai, psycopg2-binary, etc.
├── docs/
│   ├── plonkit-data-source-research.md
│   └── handoff-session-2.md
├── scripts/
│   ├── fetch.py            # 下載 raw JSON
│   ├── transform.py        # 轉換為 RAG chunk
│   └── embed.py            # Embedding + 寫入 Supabase
└── data/                   # gitignored
    ├── raw/                # 140 個原始 JSON
    └── chunks/
        └── all_chunks.json # 5305 個扁平 chunk
```
