# RAG Assistant — Session 1 Handoff

> 日期：2026-06-15
> 分支：develop（commit 6643de0）

---

## 本次完成

### 1. Plonk It 資料來源研究

- 發現 Plonk It 有公開 REST API，不需要 Playwright 爬蟲
- `GET /api/guides` → 140 個國家列表
- `GET /api/guides/{slug}` → 單一國家完整線索 JSON
- Rate limit: 30 req/min
- 詳見 `assistant/docs/plonkit-data-source-research.md`

### 2. 資料下載（fetch.py）

- 腳本：`assistant/scripts/fetch.py`
- 下載 140 個 raw JSON 到 `assistant/data/raw/`（gitignored，4.2MB）
- 140/140 全部成功
- 重跑指令：`python3 assistant/scripts/fetch.py`

### 3. 資料轉換（transform.py）

- 腳本：`assistant/scripts/transform.py`
- 將巢狀 raw JSON 展平為 5305 個 RAG chunk
- 輸出：`assistant/data/chunks/all_chunks.json`（gitignored，3.3MB）
- 每個 chunk 包含：id, country, country_code, region, step_group, tags, text, image_url, image_link, source_url
- 重跑指令：`python3 assistant/scripts/transform.py`

### 4. 文件更新

- 更新 `plan/geoguessr-rag-assistant-spec.md`：修正 Plonk It 技術描述、第一階段步驟
- 更新 `plan/rag-assistant-architecture-decisions.md`：標記資料收集方式已解決
- 清理冗餘檔案：刪除 AGENTS.md、doc/free-comm-map-project-spec.md

---

## 下一步：Embedding + 向量資料庫

### 需要準備

1. **Gemini API key**：到 https://aistudio.google.com/apikey 建立（免費 tier 足夠）
2. **Supabase 專案**：需要 PostgreSQL + pgvector 擴充

### 要做的事

1. 在 Supabase 建立 pgvector 資料表（存 chunk + embedding）
2. 寫 embed.py 腳本：讀 all_chunks.json → 呼叫 Gemini Embedding API → 存入 Supabase
3. 寫檢索 API：接收 query → embedding → pgvector 相似度搜尋 → 回傳 top-K chunks
4. 測試檢索品質

### 架構決策（已定案，見 rag-assistant-architecture-decisions.md）

- Embedding 模型：Gemini Embedding（768 維）
- 向量 DB：Supabase PostgreSQL + pgvector
- 後端：獨立 Cloud Run service（`assistant/` 目錄）
- LLM：Gemini 2.5 Flash

---

## 四階段總進度

| 階段 | 內容 | 狀態 |
|------|------|------|
| 1. 資料收集 | fetch + transform | ✅ 完成 |
| 2. RAG Pipeline | embedding + pgvector + 檢索 API | ⬜ 下一步 |
| 3. LLM 整合 | system prompt + 生成 API + vision | ⬜ |
| 4. 前端 + 部署 | 聊天 UI + Cloud Run | ⬜ |

---

## 檔案結構

```
assistant/
├── .gitignore              # 排除 data/raw/ 和 data/chunks/
├── docs/
│   ├── plonkit-data-source-research.md   # API 研究結果
│   └── handoff-session-1.md              # 本文件
├── scripts/
│   ├── fetch.py            # 下載 raw JSON
│   └── transform.py        # 轉換為 RAG chunk
└── data/                   # gitignored
    ├── raw/                # 140 個原始 JSON
    └── chunks/
        └── all_chunks.json # 5305 個扁平 chunk
```
