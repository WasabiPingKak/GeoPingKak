# Plonk It 資料來源研究結果

> 研究日期：2026-06-15
> 結論：Plonk It 有公開 REST API，不需要 Playwright 爬蟲

---

## 重大發現

原 spec 假設 Plonk It 是 JavaScript 前端渲染、需要 headless browser 才能抓資料。
實際研究發現網站提供**公開 REST API**，直接回傳結構化 JSON，完全不需要 Playwright。

第一階段（資料收集）的工作量從「寫爬蟲 + 清理 HTML + 結構化」縮減為「呼叫 API + 存檔」。

---

## 網站技術棧

- **框架**：Vite + React SPA（`<div id="root"></div>` + hashed JS bundle）
- **CDN**：Cloudflare（`cf-cache-status: HIT`）
- **SSR 預載**：HTML 包含 `<script id="__PRELOADED_DATA__" type="application/json">` 供 hydration
- **後端**：Node.js（Express 或類似，headers 有 `x-ratelimit-*`）

---

## API Endpoints

### 列表 API

```
GET https://www.plonkit.net/api/guides
```

回傳所有國家/指南的清單（截至研究時有 140 個）。

```json
{
  "success": true,
  "data": [
    {
      "title": "United States of America",
      "slug": "united-states",
      "updatedAt": "2026-06-14T16:38:01.671Z",
      "code": "US",
      "cat": ["North America"]
    }
  ]
}
```

欄位說明：
- `slug` — URL 路徑與 API 查詢的 key
- `code` — ISO 3166 國家代碼（少數例外如 `US-AK`, `XX-BEGINNERS`）
- `cat` — 所屬區域分類（可多值，如 Turkey 同時屬於 Europe 和 Asia）

### 單一國家 API

```
GET https://www.plonkit.net/api/guides/{slug}
```

回傳該國的完整線索資料。

---

## Rate Limit

| Header | 值 | 備註 |
|--------|---|------|
| `x-ratelimit-limit` | 30 | 每分鐘 30 次 |
| `x-ratelimit-remaining` | 29 | 剩餘次數 |
| `x-ratelimit-reset` | ISO timestamp | 重置時間 |

140 個國家 + 1 次列表請求 = 141 requests。以每分鐘 25 次（留安全餘量）計算，約 **6 分鐘**可全部抓完。

---

## 單一國家 JSON 結構

```json
{
  "success": true,
  "data": {
    "public": {
      "_id": "united-states",
      "title": "United States of America",
      "slug": "united-states",
      "code": "US",
      "cat": ["North America"],
      "heroImage": "/images/united-states/Bild_2022-06-27_163829215.png",
      "headerNotes": [],
      "updatedAt": "2026-06-14T00:00:00.000Z",
      "steps": [
        {
          "kind": "tip",
          "title": "Identifying the United States",
          "items": [...]
        }
      ]
    }
  }
}
```

### steps 結構

每個國家通常有 3-4 個 step group：

| Step Group | 內容 | 說明 |
|------------|------|------|
| `"Identifying {Country}"` | 辨識該國的核心線索 | 第一優先 RAG 來源 |
| `"Regional and xxx-specific clues"` | 區域/州/省級線索 | 縮小範圍用 |
| `"Spotlight"` | 特定地點的詳細介紹 | 精確定位用 |
| `"Maps and resources"` | 外部資源連結 | 通常空，可忽略 |

### items 類型（kind）

| kind | 用途 | RAG 相關性 |
|------|------|-----------|
| `tip` | **核心線索**，含文字 + 圖片 + 標籤 | 主要 chunk 來源 |
| `subsection` | 分節標題（如 "Step 1.1 - US-specific"） | 作為 metadata |
| `centeredImage` | 全幅參考圖（通常是國家總覽圖） | 可作為補充 |
| `divider` | 純分隔線 | 忽略 |
| `centeredText` | 置中文字 | 罕見，視內容決定 |

---

## Tip 物件（= RAG chunk 候選）

這是最關鍵的資料單元，每條 tip 天然適合作為一個 RAG chunk：

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

### text 欄位

- Markdown 格式（`**粗體**`、`[連結](url)`）
- 陣列，每個元素是一個段落
- 常包含與其他國家的交叉比較（如「NOTE: Canada uses...」）
- 串接所有元素即為完整的線索描述文字

### image 欄位

| Key | 說明 |
|-----|------|
| `imageUrl` | 圖片相對路徑，完整 URL = `https://www.plonkit.net{imageUrl}` |
| `imageLink` | Google 街景連結（可驗證該線索的實際位置） |
| `alt` | alt text（大多為空） |
| `width` | 顯示寬度比例（0.5 = 半幅） |

### tags 欄位

線索的分類標籤，可直接作為 RAG 的 metadata filter：

| Tag | 中文 | 出現頻率（US 頁面） |
|-----|------|---------------------|
| `landscape` | 地形/景觀 | 25 |
| `chevron/sign` | 路標/標誌 | 21 |
| `architecture` | 建築 | 18 |
| `roadline` | 路面標線 | 11 |
| `bollard` | 路樁/護柱 | 10 |
| `vegetation` | 植被 | 9 |
| `coverage` | 街景覆蓋 meta | 5 |
| `moving info` | 道路系統/電話區碼 | 5 |
| `pole` | 電線桿 | 4 |
| `guardrail` | 護欄 | 4 |
| `license plates` | 車牌 | 3 |
| `language` | 語言/文字 | 1 |

---

## 資料規模估算

以 US 頁面（175 tips）為大國參考，小國（如 Andorra）可能只有 10-20 tips：

- 140 個國家 × 平均 ~35 tips/國 ≈ **~5,000 條 clue**
- 每條 clue 文字平均 100-300 tokens
- Embedding 總量在 Supabase 免費 tier 的 500MB 限制內綽綽有餘

---

## 對原 Spec 第一階段的修正

### 原計畫

1. ~~確認 sitemap / 目錄頁~~
2. ~~用 Playwright 撰寫爬蟲腳本~~
3. ~~清理 HTML：去除導覽列、footer 等雜訊~~
4. ~~結構化存檔~~
5. 補充 metadata

### 新計畫

1. ✅ 呼叫 `/api/guides` 取得 140 個 slug（2026-06-15 完成）
2. ✅ 逐一呼叫 `/api/guides/{slug}`，每分鐘 25 次（2026-06-15 完成，140/140 成功，4.2MB）
3. ✅ 直接存原始 JSON 至 `assistant/data/raw/`（已 gitignore）
4. 撰寫轉換腳本：raw JSON → RAG-ready chunk 格式
5. Metadata 已內建：`tags`（線索類別）、`cat`（區域）、`code`（國家代碼）

### 省掉的依賴

- ~~Playwright~~
- ~~BeautifulSoup / lxml~~
- ~~HTML 清理邏輯~~

唯一需要的是 `requests`（或 `httpx`）+ `time.sleep` 做 rate limit。

---

## 注意事項

1. **Rate limit 禮貌**：雖然技術上可以每分鐘打 30 次，建議保守使用 25 次/分鐘，加上 retry with backoff
2. **快取原始 JSON**：先全部下載存本地，後續處理用本地檔案，避免重複請求
3. **圖片 URL 是相對路徑**：需要加上 `https://www.plonkit.net` 前綴
4. **部分 slug 非國家**：如 `beginners-guide`、`maps`、`spillover-countries`、`middle-earth`，需決定是否納入 RAG
5. **updatedAt 可用於增量更新**：後續可只重新抓取有更新的國家
6. **text 中的 Markdown 連結**：包含其他國家的交叉引用（如 `[Canada](url)`），可解析為 `related` 欄位
