# Casual GeoGuessr — 專案企劃書

> 給 Claude Code CLI 的開發參考文件
> 文件性質：產品規格 + 技術決策依據，非完整技術文件
> 建立目的：MVP 開發前的方向確認與架構決策記錄

---

## 1. 專案概述

### 一句話描述

一個免費、零登入、手機優先的輕量 GeoGuessr 替代品，主打**社群匯入地圖**與**台灣地區性內容**。

### 願景

讓「想玩 5 分鐘地理猜謎遊戲」的台灣路人玩家有合適的入口；同時讓 GeoGuessr 創作者的作品能突破訂閱牆，觸及更廣的受眾。

### 為何存在（市場觀察）

**現有產品的問題：**

- **GeoGuessr 官方**：付費牆，創作者地圖只有付費用戶玩得到。
- **OpenGuessr / WorldGuessr**：免費替代品，但介面英文、無社群地圖匯入功能、預設只能選國家或世界地圖、難度過高。
- **核心痛點**：所有現有服務都服務「核心競技玩家」，沒有人服務「想花 3 分鐘認自己熟悉地區」的路人玩家。

**本專案的切入點：**

- 路人玩家要的是「低難度、地區性、可分享」，不是競技性
- 路名/地名無法隱藏對核心玩家是缺陷，對路人玩家無感
- 社群擴散靠「地圖本身」帶分眾流量（中山區地圖找住過中山區的人、政大校園地圖找校友）

---

## 2. 目標客群

### 玩家側（需求側）

| 屬性 | 描述 |
|---|---|
| 玩一次的耐心 | 2–5 分鐘 3 回合 |
| 設備 | 手機 90%+ |
| 登入意願 | 完全不願意 |
| 計分執著 | 沒差，能炫耀就好 |
| 主要接觸點 | LINE / Threads / Dcard 分享連結 |
| 動機 | 「玩個熟悉地區的小遊戲」、「我家附近你猜不到」 |

### 創作者側（供給側）

| 屬性 | 描述 |
|---|---|
| 身份 | GeoGuessr 既有創作者、想做地圖的鐵道迷/校友/在地玩家 |
| 主要痛點 | 在 GeoGuessr 做的地圖只有付費用戶玩得到 |
| 動機 | 「我的作品被更多人玩到」，不是分潤 |
| 技術能力 | 已熟悉 map-making.app 或 GeoGuessr map editor |
| 集中地 | Discord 社群 |

---

## 3. 核心價值主張

### 對玩家

- 不用登入、不用付錢、不用裝 app
- 3 回合、5 分鐘內結束
- 玩熟悉地區，分享給朋友炫耀

### 對創作者

- 同一份 JSON 不用改，繼續放在 GeoGuessr 賺競技玩家
- 同時透過本服務免費觸及路人、家人、輕度玩家
- 結算頁主動導流回 GeoGuessr 原作，作為 GeoGuessr 的 top-of-funnel

---

## 4. MVP 功能範圍

### 必做（MVP）

- [ ] **Discord OAuth**：僅創作者上傳地圖時需要，玩家完全不需要
- [ ] **地圖上傳**：拖檔或貼 JSON、填名稱、選填 GeoGuessr 連結、選填一句描述
- [ ] **地圖列表頁**：卡片顯示地圖名、創作者名、地點數、上傳時間
- [ ] **遊戲頁**：3 回合、Embed iframe + Leaflet 地圖點選、結果頁
- [ ] **結果分享**：Wordle 式純文字 emoji 格式（無需圖片 hosting）
- [ ] **每張地圖獨立短網址**：方便 LINE / Threads 分享
- [ ] **死 pano 處理**：玩家遇到顯示「Sorry, we have no imagery here」時提供 Skip 按鈕
- [ ] **手動 seed 5–10 張地圖**：上線前由專案主自行建立

### 明確不做（Non-goals for MVP）

下列功能在 MVP 後再評估，**不要主動實作**：

- 個人創作者頁面 / 個人首頁
- 累計統計、排行榜
- Tag 系統
- 收藏 / 我的最愛
- 評論、留言
- 難度自評
- 每日挑戰 / daily map
- 玩家帳號系統
- 自家的地圖編輯器（沿用 map-making.app / GeoGuessr）
- 自動產生行政區地圖工具
- Email / 社群通知
- 多語系（先做繁中）

### 後期路線（驗證後評估）

依驗證結果可能加上：

- 簡易「圈出區域自動生成地圖」工具（用 OSM Overpass 抽道路節點）
- Tag 系統與分類瀏覽
- 創作者個人頁
- 簡易排行榜

---

## 5. 技術架構

### 核心技術選擇

| 層級 | 選擇 | 理由 |
|---|---|---|
| Street View 顯示 | **Google Maps Embed API** | 免費無限、可指定 pano + heading + pitch + fov |
| 地圖選點 | **Leaflet + OpenStreetMap tiles** | 免費、手機體驗好、不依賴 Google |
| 前端 | Next.js (App Router) | SSR、SEO、社群分享 OG image |
| 後端 | 待定（Python / Node，依開發者熟悉度） | 邏輯簡單，stack 不關鍵 |
| DB | PostgreSQL + JSONB | 存原始 JSON 與抽取後 metadata |
| 部署 | Cloud Run / Vercel | 起步流量低、按用量計費 |
| 認證 | Discord OAuth | 創作者社群集中於 Discord |

### 為何選 Embed API（架構基礎決策）

- **價格**：免費無限。JS API 的 Dynamic Street View 屬於 Pro tier，每月 5000 次免費後按次計費，本專案規模可能月帳單超過 USD 1000+。
- **功能足夠**：JSON 裡的 `{panoId, lat, lng, heading, pitch, zoom}` 全部可透過 URL 參數塞給 Embed API。
- **接受的限制**：地名標籤無法移除、玩家走動後狀態抓不到、無法中途換 pano 不 reload。這些對「路人玩家計分」的影響可控（計分基準是原始投放點，玩家走動與否不影響）。

### 渲染層抽象（重要架構決策）

**Street View 顯示要獨立成可替換的 component**，原因：

1. Google ToS 風險：未來可能被迫改用付費 JS API、或完全切走
2. 保留 exit：被切斷時可降級為「在 Google Maps 開啟此位置」純連結

實作建議：

```typescript
// 抽象介面
interface StreetViewRenderer {
  render(params: {
    panoId?: string;
    lat: number;
    lng: number;
    heading: number;
    pitch: number;
    fov: number;
  }): JSX.Element;
}

// 目前實作：Embed iframe
class EmbedAPIRenderer implements StreetViewRenderer { ... }

// 未來可能：付費 JS API、純連結 fallback
class JSAPIRenderer implements StreetViewRenderer { ... }
class LinkOnlyRenderer implements StreetViewRenderer { ... }
```

### 資料層設計（重要架構決策）

**原始 JSON 與抽取後 metadata 分開存**，原因：

1. 即使未來不能用 Street View，資料層仍可運作（純地圖目錄、教學工具、匯出到其他平台）
2. metadata 用於查詢、列表展示；原始 JSON 用於遊戲時讀取

### Tech stack 替代選項

如果開發者偏好不同 stack，下列替代可接受：

- 前端：Vite + React、SvelteKit
- 後端：FastAPI、Express、Hono
- DB：SQLite（單機起步）、Supabase（含 Auth + DB）

**唯一不可替代**：Embed API 作為 Street View 渲染層（除非接受付費或產品大改）。

---

## 6. 資料模型

### GeoGuessr / map-making.app JSON 格式

```json
{
  "name": "Diverse World",
  "customCoordinates": [
    {
      "lat": 35.676,
      "lng": 139.746,
      "panoId": "1hhfamxJUArcEFya_U4ZNQ",
      "heading": 266.7,
      "pitch": 10.5,
      "zoom": 0,
      "countryCode": "JP"
    }
  ]
}
```

備註：

- `panoId` 可能不存在（舊版 GeoGuessr 匯出）
- `heading` / `pitch` / `zoom` 可能不存在（CSV 匯出的會丟失）
- `countryCode` 由 GeoGuessr 自動填，可能錯誤或缺失
- 上傳時要做 schema validation 與正規化

### JSON 欄位 → Embed API URL 參數映射

| GeoGuessr JSON | Embed API URL | 處理規則 |
|---|---|---|
| `panoId` | `pano` | 優先用此參數 |
| `lat, lng` | `location=lat,lng` | `panoId` 不存在時 fallback |
| `heading` | `heading` | 直接帶；缺失時用 0 |
| `pitch` | `pitch` | 直接帶；缺失時用 0 |
| `zoom` | `fov` | 需換算，公式 `fov ≈ 180 / 2^zoom`，範圍 10°–100° |

範例 URL：

```
https://www.google.com/maps/embed/v1/streetview
  ?key=YOUR_API_KEY
  &pano=1hhfamxJUArcEFya_U4ZNQ
  &heading=266.7
  &pitch=10.5
  &fov=90
```

### DB Schema 草稿

```sql
-- 創作者帳號
CREATE TABLE users (
  id UUID PRIMARY KEY,
  discord_id TEXT UNIQUE NOT NULL,
  discord_username TEXT NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 上傳的地圖
CREATE TABLE maps (
  id UUID PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,        -- 短網址用
  uploader_id UUID REFERENCES users(id),
  name TEXT NOT NULL,
  description TEXT,
  geoguessr_url TEXT,                -- 選填，導流用
  raw_json JSONB NOT NULL,           -- 原始 JSON
  metadata JSONB NOT NULL,           -- 抽取後資料
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX maps_created_at_idx ON maps(created_at DESC);
CREATE INDEX maps_slug_idx ON maps(slug);

-- metadata JSONB 預期結構（範例）
-- {
--   "location_count": 1234,
--   "country_distribution": {"TW": 1234},
--   "bbox": {"north": 25.2, "south": 21.9, "east": 122.1, "west": 119.5},
--   "has_pano_ids": true,
--   "has_pov": true
-- }
```

### 上傳時的處理流程

1. 接收 JSON（檔案或文字）
2. Schema 驗證：必須有 `customCoordinates` 陣列、至少 5 個地點
3. 正規化：補齊缺失欄位（heading/pitch/zoom 預設 0/0/0）
4. 抽取 metadata：地點數、國家分布、bounding box
5. 產生唯一 slug（短網址用，建議 6–8 字元 base62）
6. 寫入 DB

**不做**：上傳時主動驗證 pano 存活（會打到 Google API、影響上傳速度）。死 pano 在玩家遇到時 skip 即可。

---

## 7. 重要 UX 決策

### 手機優先

- 全部 layout 以手機螢幕設計，桌機只是放大版
- Embed iframe 必須撐滿玩家畫面寬度
- 地圖選點用 Leaflet 自己刻，**不要**用 Embed API 的 place mode（手機體驗差）
- 觸控操作要實測（Embed API 在 mobile Safari 偶爾有怪行為）

### 零登入玩家

- 完全不用帳號
- 連 cookie 都不依賴
- 遊戲狀態用 React state，重整就重來，可接受

### Discord OAuth（創作者）

- 只在「上傳地圖」入口要求登入
- OAuth scope：只拿 `identify`，不拿 email、不拿 guilds
- 第一次登入時讓使用者設定 `display_name`（之後地圖頁顯示用）

### 結算頁設計重點

結算頁是分享動力來源，要做好：

- 顯示總分、每回合分數與距離
- **Wordle 式分享按鈕**：複製純文字到剪貼簿，格式類似：
  ```
  我玩了 [地圖名] 3 回合
  總分 7842 / 15000
  🟩🟨⬜
  https://yourdomain.com/m/abc123
  ```
- **「Made by X，去 GeoGuessr 玩完整版 →」按鈕**（如果該地圖有填 GeoGuessr 連結）
- **「再玩一張」按鈕**：隨機推薦另一張地圖

### 短網址設計

- 每張地圖：`https://yourdomain.com/m/{slug}`
- 每場遊戲結果**不需要**獨立網址（不存遊戲記錄）

---

## 8. 已知限制與緩解策略

### 路名/地名無法隱藏

| | 內容 |
|---|---|
| 影響 | 玩家可能直接讀路牌或地名標籤破解 |
| 緩解 | 不緩解。明確標榜「Casual mode」、不對標 GeoGuessr 競技性 |
| 風險評估 | **低**。目標客群本來就不在乎 |

### Dead pano（Google 刪除/更新 coverage）

| | 內容 |
|---|---|
| 影響 | Embed iframe 顯示「Sorry, we have no imagery here」 |
| 緩解 | 遊戲頁提供 Skip 按鈕，跳到下一回合，扣 1 題機會 |
| 進階方案 | 後期可做 cron job 定期掃描死 pano、標記地圖品質 |

### 換題 reload iframe 延遲

| | 內容 |
|---|---|
| 影響 | 每回合切換有 0.5–2 秒白畫面 |
| 緩解（必做） | 預先建好下一回合 URL，按「下一題」直接換 src |
| 緩解（進階） | 兩個 iframe 交替使用，z-index swap |

### Google ToS 風險

| | 內容 |
|---|---|
| 影響 | 規模成長後可能被要求停用 Embed API 或商業合約 |
| 緩解 | **架構上**：渲染層獨立 component（見 §5），可降級 |
| 緩解 | **資料上**：原始 JSON + metadata 分離存（見 §5），可轉型 |
| 緩解 | **產品上**：保持低調，不主動對標 Google 或 GeoGuessr |
| 風險評估 | **中**。OpenGuessr/WorldGuessr 已跑數年無事，但需意識存在 |

---

## 9. 開發優先級

### Phase 0：可玩 demo（1 週內）

- Embed API 顯示 Street View（hardcode 一組座標）
- Leaflet 地圖選點
- 計分邏輯（Haversine distance → 分數曲線）
- 3 回合流程
- **目標**：自己玩 10 次驗證核心體驗能不能站住

### Phase 1：MVP（2–4 週）

- Discord OAuth
- 地圖上傳介面
- 地圖列表頁
- 地圖詳細頁與遊戲流程
- 結算頁與分享按鈕
- 自行 seed 5–10 張台灣地圖
- **目標**：找 100 個早期玩家

### Phase 2：根據驗證結果再決定

- 觀察哪些地圖紅、哪些創作者活躍
- 看分享率、回訪率
- 決定下一步加哪些功能

---

## 10. 待決定事項（開發前可再討論）

- [ ] 後端語言與框架（依開發者偏好）
- [ ] 計分公式細節（建議參考 GeoGuessr 的指數衰減）
- [ ] Slug 產生策略（亂數 vs 人類可讀）
- [ ] 地圖最小地點數門檻（建議 ≥ 5）
- [ ] 地圖最大地點數門檻（避免 JSON 過大、考慮分頁存）
- [ ] Embed API key 的 referer 限制設定
- [ ] 部署 region（亞洲節點優先）

---

## 11. 不在本文件範圍內的事項

下列議題刻意不寫死，由開發時依實況決定：

- 具體 UI 配色與排版（保留設計彈性）
- 詳細的 API endpoint 規格（依後端選型再定）
- CI/CD 流程
- 監控與 logging 細節
- 詳細的錯誤處理策略

---

## 附錄 A：參考資源

- Google Maps Embed API 文件：<https://developers.google.com/maps/documentation/embed>
- map-making.app（GeoGuessr 社群地圖工具）：<https://map-making.app/>
- WorldGuessr 開源實作（可參考但不照抄）：<https://github.com/codergautam/worldguessr>
- GeoGuessr JSON 格式範例：map-making.app 匯出檔

## 附錄 B：核心信念（給 CLI 開發時參考）

開發過程中遇到取捨時，依下列優先級判斷：

1. **手機體驗 > 桌機體驗**
2. **零摩擦 > 功能完整**
3. **路人玩家 > 核心玩家**
4. **架構彈性 > 短期最佳化**（特別是渲染層與資料層）
5. **驗證假設 > 累積功能**（MVP 階段尤其如此）

當 CLI 在實作時對某個功能規模有疑問，**砍掉**比**加上**安全。
