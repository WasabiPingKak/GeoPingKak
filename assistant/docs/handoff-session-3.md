# RAG Assistant — Session 3 Handoff

> 日期：2026-06-15
> 分支：develop（commit d020734）

---

## 本次完成

### 1. 檢索品質測試腳本（search_test.py）

- 腳本：`assistant/scripts/search_test.py`
- 批次模式：跑 10 筆預設查詢（高相關 / 灰色地帶 / 完全無關），輸出分數摘要
- 互動模式：`python -m scripts.search_test 你想問的問題`（從 `assistant/` 目錄執行）

測試結果觀察：
- 高相關查詢（歐洲車牌、非洲覆蓋）：sim 0.67~0.74
- 灰色地帶（泰國歷史、日本飲食）：sim 0.59~0.63
- 完全無關（Python、Netflix）：sim 0.50~0.55
- **分數區間重疊**，無法用單一門檻乾淨分離三類，確認 LLM 層是必要防線

### 2. 共用檢索模組（search.py + config.py）

- 從 search_test.py 抽出 `embed_query()` 和 `search()`
- `config.py`：集中管理 Gemini key、embedding 參數、門檻值、生成模型
- search 加入 `WHERE similarity >= threshold` 過濾（預設 0.45）

### 3. Flask 搜尋 API（app.py）

- `POST /api/assistant/search`
  - 輸入：`{ "query": "...", "top_k": 5, "threshold": 0.45 }`
  - 輸出：top-K chunks（含 similarity、country、text、tags 等）
- `/ping` 健康檢查
- per-request DB 連線、全域 Gemini client、request ID、CORS

### 4. LLM 生成層（generate.py）

- `POST /api/assistant/ask`
  - 輸入：`{ "query": "..." }`
  - 輸出：`{ "answer": "...", "sources_count": 5, "usage": { ... } }`
- 模型：Gemini 2.5 Flash，temperature 0.3，max_output_tokens 2048
- System prompt 控制行為：
  - 只根據參考資料回答，不用自己知識補充
  - 非 GeoGuessr 問題 → 拒絕
  - 參考資料完全無關 → 說資料不足
  - 繁體中文、條列式、合併重複

### 5. Dockerfile

- `assistant/Dockerfile`：Python 3.11-slim、gunicorn、non-root user
- 包含 app.py、config.py、search.py、generate.py

### 6. 踩過的坑

- Windows 終端 cp950 編碼無法輸出 Unicode 符號（◐ 等），需 `sys.stdout.reconfigure(encoding='utf-8')`
- System prompt 第一版太嚴格（「只根據資料回答」），導致資料有相關描述但不是直接答案時被拒絕。改為「資料包含相關辨識特徵就整理出來」後解決
- 第一版 max_output_tokens=1024 會截斷較長回答，改為 2048

---

## 下一步：第 4 階段 — 前端 + 部署

### 要做的事

1. **Cloud Run 部署**：
   - 建立 `geopingkak-assistant-staging` Cloud Run 服務
   - 設定環境變數：`SUPABASE_DB_URL`（Secret Manager）、`CORS_ORIGINS`、`DEPLOY_ENV`
   - 建立 deploy.sh 部署腳本

2. **前端聊天 UI**：
   - 在 Next.js 加 `/assistant` 頁面
   - 簡單的聊天介面：輸入框 + 對話氣泡
   - 呼叫 `/api/assistant/ask` 端點

3. **（可選）進階功能**：
   - 圖片輸入模式（vision 分析 + RAG 檢索）
   - 對話歷史（多輪問答）
   - token 用量追蹤

---

## 四階段總進度

| 階段 | 內容 | 狀態 |
|------|------|------|
| 1. 資料收集 | fetch + transform | ✅ 完成 |
| 2. RAG Pipeline | embedding + pgvector + 檢索 API | ✅ 完成 |
| 3. LLM 整合 | system prompt + 生成 API | ✅ 完成 |
| 4. 前端 + 部署 | 聊天 UI + Cloud Run | ⬜ |

---

## API 端點摘要

| 端點 | 方法 | 用途 |
|------|------|------|
| `/ping` | GET | 健康檢查 |
| `/api/assistant/search` | POST | 向量檢索（回傳 raw chunks） |
| `/api/assistant/ask` | POST | 完整問答（檢索 + LLM 生成） |

### /api/assistant/ask 範例

```json
// Request
{ "query": "怎麼從車牌辨認歐洲國家" }

// Response
{
  "query": "怎麼從車牌辨認歐洲國家",
  "answer": "從車牌辨認歐洲國家時，您可以留意以下特徵：\n\n* **荷蘭**：長條形黃色車牌...",
  "sources_count": 5,
  "usage": {
    "prompt_tokens": 482,
    "completion_tokens": 200,
    "total_tokens": 682
  }
}
```

---

## 外部服務帳號

| 服務 | 用途 | 位置 |
|------|------|------|
| Gemini API Key | Embedding + LLM 生成 | Secret Manager `GEMINI_API_KEY` |
| Supabase DB URL | pgvector 連線 | `assistant/.env`（gitignored） |

---

## 檔案結構

```
assistant/
├── .gitignore              # 排除 data/raw/、data/chunks/、.env
├── .env                    # SUPABASE_DB_URL（gitignored）
├── app.py                  # Flask 入口，/ping + /search + /ask
├── config.py               # 集中設定（模型、門檻、Secret Manager）
├── search.py               # 向量檢索模組（embed_query + search）
├── generate.py             # LLM 生成模組（system prompt + Gemini 呼叫）
├── Dockerfile              # Cloud Run 部署
├── requirements.txt        # flask, google-genai, psycopg2, etc.
├── docs/
│   ├── plonkit-data-source-research.md
│   ├── handoff-session-2.md
│   └── handoff-session-3.md
├── scripts/
│   ├── fetch.py            # 下載 raw JSON
│   ├── transform.py        # 轉換為 RAG chunk
│   ├── embed.py            # Embedding + 寫入 Supabase
│   └── search_test.py      # 檢索品質測試
└── data/                   # gitignored
    ├── raw/                # 140 個原始 JSON
    └── chunks/
        └── all_chunks.json # 5305 個扁平 chunk
```
