# RAG 問答助手 — 架構規格定案

> 基於 `geoguessr-rag-assistant-spec.md` 的討論結果
> 確認日期：2026-06-10

---

## 已定案項目

### 1. LLM 選型

| 用途 | 主力 | 備選 | 備註 |
|---|---|---|---|
| Embedding | Gemini Embedding | — | 免費 tier 充裕，5K 條 clue 一次灌完無壓力 |
| Vision（圖片分析） | Gemini 2.5 Flash | — | 單一 provider |
| 文字生成（回答） | Gemini 2.5 Flash | Groq（Llama 3.3 70B） | 雙 provider，env var 切換 |

**Provider 切換機制**：後端抽 LLM client interface，透過 `LLM_PROVIDER` env var 控制（`gemini` / `groq`）。

**成本參考（Gemini 2.5 Flash 付費 tier）**：
- 純文字查詢：~$0.002 / 次
- 圖片查詢（4 張）：~$0.007 / 次
- 初期使用 Gemini 免費 tier，成本為 $0

### 2. 向量資料庫

**Supabase PostgreSQL + pgvector**

- 免費 tier：500MB storage，足夠 5K 條 clue 的 embedding
- 同一個 Supabase 專案未來也服務 Casual GeoGuessr 的 PostgreSQL 需求
- Embedding 維度：768（Gemini Embedding 預設）

### 3. 後端架構

**獨立 Cloud Run service**，與現有 `geopingkak-backend` 分開部署。

理由：
- 依賴差異大：現有 8 個套件 vs RAG 需要額外加 `google-generativeai`、`groq`、`supabase`、`Pillow` 等，image 會膨脹到 300MB+
- Request 特性不同：現有端點 100-300ms，LLM 呼叫 3-10 秒
- Scaling 需求不同：可獨立設定 concurrency、timeout、instance 數
- 故障隔離：LLM provider 掛掉不影響核心功能
- 成本可分開追蹤

**GCP 架構**：同一個 `geopingkak` 專案，新增 service：

| Service | 用途 |
|---|---|
| `geopingkak-assistant` | RAG 問答 API（production） |
| `geopingkak-assistant-staging` | RAG 問答 API（staging） |

**程式碼位置**：同一個 repo，`assistant/` 目錄與 `backend/` 平行。CI/CD 偵測 `assistant/` 變更才觸發。

### 4. 前端架構

**整合進現有 Next.js app**，新增 `/assistant` 頁面。

- 側邊欄加入導覽連結
- 用 `NEXT_PUBLIC_ASSISTANT_API_BASE` env var 指向獨立的 Cloud Run service
- 聊天 UI 用現有的 Tailwind CSS 框架

### 5. 登入系統

**Supabase Auth**，兩個專案共用同一個 Supabase 專案：

| 專案 | Auth 方式 | 對象 |
|---|---|---|
| RAG Assistant（先做） | Google OAuth | 所有使用者 |
| Casual GeoGuessr（之後） | Discord OAuth | 創作者 |

- 前端：`supabase-js` 處理登入流程
- 後端：JWT 驗簽走 ES256 JWKs（已有 iceberg-landing 實作經驗）
- Supabase Auth 天然支援多 provider 並存

### 6. 對話模式

**多輪對話**，對話歷史存前端 React state：

- 每次 request 帶完整對話歷史送給後端
- 後端無狀態，轉發給 LLM（system prompt + 對話歷史 + RAG 結果）
- 設對話輪數上限（具體數字待定），超過截掉最早的幾輪
- 頁面重整 = 對話消失（可接受）
- 追問引導機制由 system prompt 控制，不需額外技術元件

### 7. 圖片上傳

| 項目 | 規格 |
|---|---|
| 儲存 | **不落地**，後端收到後直接轉給 Gemini Vision API，處理完丟棄 |
| 數量上限 | 每次最多 4 張（四個方向） |
| 格式 | JPG / PNG |
| 大小上限 | 5MB / 張 |
| 驗證 | 檔案類型 + 大小，需登入才能上傳 |

### 8. Rate Limit

初期使用 Gemini 免費 tier，rate limit 基於免費額度上限：

| 層級 | 上限 | 備註 |
|---|---|---|
| 全站每日 | 200 次 | Gemini 免費 RPD 的 80%（保守估算 RPD=250） |
| 每人每日 | 40 次 | 防單人吃光額度 |

- 上線前到 Google AI Studio 確認實際 RPD，再調整數字
- 寫進 config，可隨時修改
- 免費額度不夠用時切到付費 tier，改為月預算制

### 9. 成本追蹤

**MVP 就做**，即使免費 tier 成本為 $0 也記錄用量：

| 類別 | 追蹤內容 | MVP 階段 |
|---|---|---|
| LLM API | 每次查詢的 token 用量 × 單價 | $0（免費 tier），照記 token 數 |
| GCP Cloud Run | 運算時間、request 數 | 從 billing export 撈 |
| Supabase | DB storage 用量 | 免費 tier 內，欄位預留 |

前端頁面顯示即時累計數字（查詢次數 + 成本），同時呈現避免成本太低被誤解為沒人用。

### 10. 授權合規（CC BY-NC-SA 4.0）

Plonk It 資料授權條件與對應做法：

| 條件 | 做法 |
|---|---|
| 署名（BY） | assistant 頁面顯眼位置標明資料來源 Plonk It |
| 非商業（NC） | 不收費，贊助定位為 cover 營運成本的捐款 |
| 相同方式分享（SA） | 衍生作品以同授權釋出 |

- 每條回答引用的線索附上 Plonk It 原頁面連結
- 圖片以 URL 引用回原站，不重新散布

---

## 延後項目

| 項目 | 延後原因 |
|---|---|
| pgvector 資料表結構 | 等抓完 Plonk It 資料、看到實際內容後再設計 |

### 已解決：資料收集方式（2026-06-15）

原本預期需要 Playwright 爬蟲，實際研究發現 Plonk It 提供公開 REST API（`/api/guides/{slug}`），直接回傳結構化 JSON。不需要 headless browser、HTML 清理、DOM 解析。詳見 `assistant/docs/plonkit-data-source-research.md`。

---

## 與 Casual GeoGuessr 的共用規劃

兩個專案共用同一個 Supabase 專案：

| 資源 | RAG Assistant | Casual GeoGuessr |
|---|---|---|
| Supabase Auth | Google OAuth | Discord OAuth |
| Supabase PostgreSQL | pgvector（clue embedding） | 地圖資料 + 使用者資料 |

登入系統一次建好，兩個專案共用。
