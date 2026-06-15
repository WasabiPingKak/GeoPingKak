# GeoGuessr 線索問答助手 — 專案規格文件

## 專案概述

基於 Plonk It（plonkit.net）的 GeoGuessr 攻略內容，建構一個 RAG（Retrieval-Augmented Generation）問答助手。使用者可以透過上傳街景截圖或文字提問，取得國家判讀建議與參考圖片。

本專案的雙重目標：
1. 作為 LLM API 串接與 RAG 架構的實作練習
2. 產出一個可公開展示、有實際使用價值的作品集項目

## 資料來源

### Plonk It 主站

- 網址：https://www.plonkit.net/guide
- 授權：CC BY-NC-SA 4.0（非商業、署名、相同方式分享）
- 合規條件：不收費、標註資料來源、衍生作品以同授權釋出
- 技術特性：Vite + React SPA，但提供公開 REST API（`/api/guides` + `/api/guides/{slug}`），可直接取得結構化 JSON，不需要 headless browser
- API rate limit：30 requests/min，140 個國家約 6 分鐘可全部抓完

### 資料結構特性

Plonk It 的內容天然適合 RAG 的 chunk 粒度。每個國家頁面由一條一條的「線索」（tip）組成，每條線索包含：
- 文字描述（Markdown 格式，多段落陣列）
- 對應的參考圖片（imageUrl + Google 街景 imageLink）
- 分類標籤（tags：如 `chevron/sign`、`landscape`、`bollard`、`license plates` 等）
- 相關國家的交叉引用（內嵌在文字中的 Markdown 連結）

每個國家的線索分為 3-4 個 step group：
1. **Identifying {Country}** — 辨識該國的核心線索
2. **Regional / state-specific clues** — 區域級線索
3. **Spotlight** — 特定地點深入介紹
4. **Maps and resources** — 外部資源（通常空）

結構統一，所有國家使用相同 JSON schema，一支 fetcher 跑一次即可。

### API 回傳格式

每條線索（tip）的 JSON 結構如下：

```json
{
  "kind": "tip",
  "data": {
    "text": [
      "The US uses the phrase **Speed Limit** on their speed signs.",
      "The numbers on American speed signs are usually lower than on Canadian ones, since they use miles instead of kilometres.",
      "NOTE: [Canada](https://goo.gl/maps/xxx) uses the word 'Maximum' on their speed signs."
    ],
    "image": {
      "imageUrl": "/images/united-states/speedsign.png",
      "imageLink": "https://goo.gl/maps/GjBjnrwJLoSmfyRR6",
      "alt": "",
      "width": 0.5
    }
  },
  "tags": ["chevron/sign"]
}
```

欄位說明：
- `data.text` — Markdown 格式文字陣列，串接即為完整線索描述
- `data.image.imageUrl` — 圖片相對路徑（完整 URL = `https://www.plonkit.net` + 路徑）
- `data.image.imageLink` — Google 街景連結（可驗證線索的實際位置）
- `tags` — 線索分類標籤，可直接作為 RAG metadata filter

### 圖片處理策略

- 第一版不下載圖片到自己的伺服器
- 圖片以 URL 形式存在 metadata 中，回答時以連結引用回 Plonk It 原站
- 避免重新散布的授權風險，同時自動完成署名要求
- 注意：部分圖片可能是 Google Street View 截圖，不屬於 Plonk It 的 CC BY-NC-SA 涵蓋範圍

## 兩種輸入模式

### 模式一：圖片輸入 — 「這是哪裡？」

使用者上傳一或多張街景截圖，系統判讀可能的國家。

#### 雙層知識架構

圖片分析同時運用兩層互補的知識來源：

**第一層：Vision 模型自身的地理知識（不經過 RAG）**

Vision 模型本身具備大量地理知識，能從自然環境特徵直接做出區域判斷：
- 植被類型：熱帶雨林 vs 溫帶闊葉林 vs 地中海灌木
- 土壤與地質：紅土（熱帶風化）vs 黃土 vs 岩石組成
- 氣候特徵：乾燥 vs 濕潤、季節性植被變化
- 建築風格：地域性建材、屋頂形式、都市規劃特徵
- 地形地貌：山脈走向、海岸線特徵、農業景觀

這些判斷不需要 RAG 輔助，模型自身就能分析。

**第二層：Plonk It RAG 的 GeoGuessr meta 知識**

Plonk It 提供的是 GeoGuessr 特有的冷門 meta 線索，這些太具體、太專門，通用模型不一定記得全：
- Google 街景車 meta：天線形狀、車色、車身反射
- 各國路樁的油漆配色與形狀
- 車牌格式與顏色
- 路標文字、字型、符號差異
- 電線桿樣式
- 路面標線規則

這些線索需要透過 RAG 檢索 Plonk It 資料才能準確比對。

#### Pipeline 流程

1. 使用者上傳圖片
2. Vision 模型分析圖片，同時產出兩類輸出：
   - **自然環境分析**：基於模型自身的地理知識，判斷氣候區、植被帶、地質特徵 → 直接進入最終回答，不經過 RAG
   - **GeoGuessr meta 線索提取**：結構化的特徵清單（路樁、車牌、路標等）→ 送入 RAG 檢索
3. Meta 線索做 embedding，查 RAG 檢索匹配的國家與線索條目
4. LLM 綜合兩層資訊產出判斷（例如：vision 從植被和土壤判斷「東南亞」，RAG 從路樁樣式縮小到「泰國而不是柬埔寨」）
5. 前端顯示回答文字，並附上 Plonk It 的參考圖對照

#### Vision 模型的 prompt 設計重點

- 明確要求模型分開輸出兩類分析結果（自然環境判斷 + meta 線索清單）
- meta 線索部分引導模型關注 GeoGuessr 玩家在意的特徵，分類體系參考 Plonk It 的結構
- 自然環境部分讓模型自由發揮地理知識，但要求給出判斷依據
- 避免讓 vision 模型只做籠統描述，要產出結構化、可檢索的輸出

### 模式二：文字輸入 — 「怎麼分？」

使用者以文字提問，詢問國家或區域之間的差異。

典型問題：
- 「泰國跟柬埔寨的路樁怎麼分？」
- 「東歐怎麼分？」
- 「美國跟加拿大怎麼分？」
- 「歐洲各國怎麼區別？」

Pipeline 流程：

1. 使用者提問
2. LLM 解析要比較的國家或區域
3. 用 metadata filter（國家、區域、線索類別）篩選範圍
4. 分別檢索各國的相關線索
5. LLM 整理成對比格式
6. 附上各國對應的參考圖

### 追問引導機制

當使用者的問題範圍過大（例如「東歐怎麼分」涵蓋多國且未指定線索類型），系統應先追問再回答。

透過 system prompt 設計實現，不需額外技術元件。判斷邏輯：
- 涉及超過約五六個國家，且未指定線索類別或具體困惑點 → 追問
- 問題具體（指定國家 + 線索類型）→ 直接回答

追問範例：
> 東歐涵蓋的國家蠻多的，你目前大概卡在哪個層級？
> - 斯拉夫語系的國家之間分不出來（波蘭、捷克、斯洛伐克…）？
> - 巴爾幹半島那區搞混？
> - 還是整個東歐對你來說都長一樣？
>
> 或者你可以丟一張讓你猶豫的截圖給我看。

追問的選項可從 RAG 資料動態生成（根據資料中有哪些東歐國家及其線索類別）。

## 架構設計

### 三層架構

```
使用者輸入（圖片 / 文字）
        │
        ▼
┌─────────────────────────────────────────────┐
│   輸入處理層                                 │
│                                             │
│   圖片 → vision 模型同時產出兩類分析：        │
│     ├─ 自然環境判斷（植被/土壤/氣候/建築）    │ ──→ 直接進入生成層
│     └─ GeoGuessr meta 線索提取              │ ──→ 送入 RAG 檢索層
│                                             │
│   文字 → 解析國家/區域/類別                   │ ──→ 送入 RAG 檢索層
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│   RAG 檢索層                                 │
│   embedding → pgvector 向量搜尋              │
│   + metadata filter（國家、區域、線索類別）    │
│   可選：hybrid search（向量 + 全文檢索）       │
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│   生成層                                     │
│   LLM 綜合兩層知識組織回答：                   │
│     - vision 自身地理知識（區域級判斷）         │
│     - RAG 檢索的 Plonk It 線索（國家級精確比對）│
│   圖片模式 → 推理判斷格式                     │
│   文字模式 → 整理比較格式                     │
│   回答中標記引用的線索 → 前端配對圖片           │
└─────────────────────────────────────────────┘
```

### 技術棧

| 元件 | 選型 | 理由 |
|------|------|------|
| 後端框架 | Python（FastAPI 或 Flask） | 生態系完整，RAG 相關套件最多 |
| 向量資料庫 | PostgreSQL + pgvector | 不引入額外基礎設施，冰角已有 PostgreSQL 經驗 |
| Embedding 模型 | OpenAI text-embedding-3-small 或本地 sentence-transformers | 前者便宜簡單，後者零成本 |
| LLM | 開發階段用 Gemini 免費額度或 Groq；demo 部署用 OpenAI 最便宜的模型 | 成本控制 |
| Vision 模型 | GPT-4o / Gemini（圖片輸入模式使用） | 多模態能力 |
| 前端 | HTML + JS（不需要 React） | 簡單聊天介面即可，重點在 pipeline |
| 資料收集 | Python requests + rate limiter | Plonk It 提供公開 REST API，直接取 JSON |

### 成本估算

- Embedding：Plonk It 全站內容一次性灌入，約幾毛美元。本地 sentence-transformers 則零成本
- LLM 查詢：GPT-4o-mini 每次查詢不到台幣一毛。個人練習與 demo 等級的用量極低
- 整個專案從開發到可 demo 狀態，API 成本預估壓在一兩百台幣以內
- 零成本替代方案：Gemini API 免費額度、Groq 免費 tier、本地 Ollama

## 實作階段建議

### 第一階段：資料收集與清理

1. ✅ 呼叫 `GET /api/guides` 取得 140 個國家的 slug 列表
2. ✅ 逐一呼叫 `GET /api/guides/{slug}` 取得完整線索 JSON（140/140 成功，4.2MB）
3. ✅ 原始 JSON 存檔至 `assistant/data/raw/`（gitignored，可用 `fetch.py` 重建）
4. 撰寫轉換腳本：將 raw JSON 的 tip items 轉為 RAG-ready chunk 格式（展平 step group 階層、串接 text 陣列、補完圖片 URL）
5. Metadata 對應：`tags` → 線索類別、`cat` → 區域、`code` → 國家代碼（API 已內建，不需額外標記）

### 第二階段：RAG Pipeline

1. 設定 PostgreSQL + pgvector
2. 將每條線索的文字做 embedding，連同 metadata 存入資料庫
3. 實作檢索 API：接收查詢文字 → embedding → 向量搜尋 → 回傳匹配線索（含圖片 URL）
4. 實作 metadata filter：支援依國家、區域、類別篩選
5. 驗證檢索品質：手動測試幾組已知問題，確認撈回的線索正確

### 第三階段：LLM 整合

1. 設計 system prompt：定義回答風格、追問邏輯、圖片引用格式
2. 實作生成 API：檢索結果 + 使用者問題 → 組裝 prompt → 呼叫 LLM → 回傳結構化回答
3. 實作圖片輸入模式：使用者上傳圖片 → vision 模型同時產出自然環境分析（直接進回答）+ meta 線索提取（送入 RAG）→ 生成層綜合兩層知識
4. 測試兩種模式的端到端流程

### 第四階段：前端與部署

1. 簡單聊天介面：文字輸入框 + 圖片上傳 + 回答區域（文字穿插圖片）
2. 兩種 UI 模式：圖片分析結果頁 vs 聊天問答
3. 部署為可 demo 的服務

### 可選進階：做完基本版後再考慮

- Hybrid search：pgvector 向量搜尋 + PostgreSQL tsvector 全文檢索混合排序
- Reranker：檢索結果過二次排序模型
- 多輪對話：歷史對話納入檢索查詢
- 不同 chunk 策略的 A/B 測試與品質比較

## 成本透明化與贊助機制

### 目標

在網頁上公開即時營運成本，降低贊助的心理門檻。讓使用者看到具體數字（例如「本月 API 成本：NT$ 287 / 已收到贊助：NT$ 150」）比空泛的「請贊助我」有效。

### 成本追蹤：兩層架構

**應用層：API token 成本（主要成本來源）**

每次呼叫 LLM API 時，response 回傳的 `usage.prompt_tokens` 和 `usage.completion_tokens` 乘以單價，由後端 middleware 累加存入資料庫。這層的粒度最細，能拆分出各功能的成本佔比（圖片分析、RAG 檢索、回答生成），公開顯示更有說服力。初期只做這層就夠。

**基礎設施層：GCP 帳單匯出（選做）**

在 GCP Console 的 Billing 設定開啟 export to BigQuery，所有費用明細（Cloud Run、Cloud SQL 等）自動寫入指定的 BigQuery dataset。後端定期跑 SQL 查詢撈出基礎設施成本。金額通常比 API 成本小很多，等部署規模成長後再開啟即可。

### 前端呈現

頁面上顯示即時累計數字，建議同時呈現查詢次數與成本，避免成本數字太小時被解讀為「沒人在用」。目標呈現是「很多人在用但成本很低」。

### 贊助管道

GitHub Sponsors、Buy Me a Coffee 或 Ko-fi，這些是開源社群熟悉的捐款機制。

### 授權合規注意事項

Plonk It 的授權是 CC BY-NC-SA（非商業）。CC 官方 FAQ 的立場是：接受捐款來維持非營利服務通常不算商業用途，但如果贊助金額超過營運成本開始產生利潤就有爭議。安全做法：
- 明確定位為「cover 營運成本的捐款」而不是「付費服務」
- 不提供贊助者任何額外功能或優先權
- 成本透明化本身就是最好的證明——所有人都能看到錢花在哪

## 面試展示賣點

- 不是「為了練而練」的 toy project，有真實使用場景與使用者
- 同一套 RAG 基礎設施支撐兩種不同的輸入模式（圖片 / 文字），展示架構設計能力
- 雙層知識架構：vision 模型自身的地理知識做區域級判斷，RAG 的 meta 線索做國家級精確比對，兩層互補而非單純依賴 RAG
- chunk 策略不是套公式，而是根據資料的天然結構（一條線索 = 一個 chunk）做設計決策
- 圖文配對的架構設計：RAG 的輸出不只是純文字，帶有結構化的附加資訊（圖片 URL）
- 追問引導機制：展示 LLM 不只是「一問一答」的檢索引擎，而是有對話能力的助手
- 與現有 side project（GeoPingKak）同屬 GeoGuessr 領域，可串連講述
