# SEO 優化產品需求文件 (PRD)

**專案名稱**: GeoPingKak SEO 全面優化
**文件版本**: v1.0
**建立日期**: 2026-01-20
**目標環境**: Production

---

## 📊 專案背景與現況分析

### 網站定位
GeoPingKak 是一個中文 GeoGuessr 遊戲資源網站，目標受眾為：
- 台灣玩家（zh-TW 為主要語言）
- 山葵冰角 (Wasabi Pingkak) 的觀眾與粉絲
- 對 GeoGuessr 感興趣但不熟悉的新手玩家

### Google Search Console 數據分析（過去 3 個月）

| 關鍵字 | 點擊數 | 曝光數 | CTR | 分析 |
|--------|--------|--------|-----|------|
| geopingkak | 838 | 992 | 84.5% | ✅ 品牌詞表現優異 |
| geoguessr 台灣 免費 | 294 | 1,702 | 17.3% | ⚠️ 曝光高但 CTR 低，需優化標題吸引力 |
| geoguessr 中文 | 143 | 707 | 20.2% | ✅ 穩定流量，CTR 尚可 |
| geoguessr 台灣 | 79 | 586 | 13.5% | ⚠️ CTR 偏低，需加強內容相關性 |
| geoguessr 練習 | 14 | 58 | 24.1% | ✅ CTR 良好，但流量少 |
| geoguessr中文 | 13 | 90 | 14.4% | ⚠️ 與「geoguessr 中文」重複，需統一 |
| geoguessr 攻略 | 6 | 130 | 4.6% | 🚨 **嚴重問題**：曝光高但 CTR 極低 |
| geoguessr 入門 | 6 | 16 | 37.5% | ✅ CTR 極高，應增加曝光 |
| geoguessr 要錢嗎 | 5 | 335 | 1.5% | 🚨 **嚴重問題**：曝光高但幾乎無點擊 |
| geoguessr 免費 | 5 | 307 | 1.6% | 🚨 **嚴重問題**：曝光高但幾乎無點擊 |

### 關鍵洞察

**問題點：**
1. 高曝光但低 CTR 的關鍵字（「攻略」、「免費」、「要錢嗎」）表示標題/描述無法吸引點擊
2. 「入門」相關內容 CTR 極高（37.5%），但曝光量不足
3. 「免費」、「台灣」、「中文」是核心需求，需在所有頁面強化

**機會點：**
1. 優化「攻略」相關頁面（入門教學），可能大幅提升流量（130 曝光 → 潛在 40+ 點擊）
2. 強化「免費」關鍵字在標題中的呈現（307+335=642 曝光，潛在 100+ 點擊）
3. 「入門」內容表現好，應加強 SEO 曝光

---

## 🎯 SEO 優化策略

### 核心關鍵字策略

**主要關鍵字（Primary Keywords）：**
- `GeoGuessr 中文` （穩定流量）
- `GeoGuessr 台灣` （地區定位）
- `GeoGuessr 免費` （高需求）
- `GeoGuessr 教學` / `GeoGuessr 攻略` （高潛力）

**長尾關鍵字（Long-tail Keywords）：**
- `GeoGuessr 台灣 免費` （高曝光）
- `GeoGuessr 入門` （高 CTR）
- `GeoGuessr 不用錢` / `GeoGuessr 要錢嗎` （FAQ 需求）
- `GeoGuessr 挑戰模式` （特色功能）
- `GeoGuessr challenge links` （英文詞彙）

### 內容策略方向

1. **強調「免費」價值**：在標題和描述中明確說明免費遊玩方式
2. **地區定位**：突出「台灣」、「中文」等在地化優勢
3. **新手友善**：針對「入門」、「教學」、「攻略」等需求
4. **解決痛點**：回答「要錢嗎」、「怎麼玩」等常見問題

---

## 📄 各頁面 SEO 優化規劃

### 優先級定義
- 🔴 **P0 (最高優先級)**：首頁、入門教學、每日挑戰
- 🟡 **P1 (高優先級)**：特殊地圖、名詞解釋、Q&A
- 🟢 **P2 (中優先級)**：速查筆記、推薦設定、資源頁
- ⚪ **排除**：直播企劃提案（內部使用）

---

## 🔴 P0: 最高優先級頁面

### 1. 首頁 (`/`)

**現況：** ❌ 完全缺少 metadata（僅繼承 root layout）

**目標關鍵字：**
- Primary: `GeoGuessr 中文`, `GeoGuessr 台灣`, `GeoGuessr 免費`
- Secondary: `GeoGuessr 怎麼玩`, `GeoGuessr 挑戰模式`

**SEO Metadata：**

```typescript
title: "GeoGuessr 台灣中文推廣站 | 免費每日挑戰、新手教學與地圖資源 - GeoPingKak"
// 字元數: 49 字元（含符號）

description: "GeoPingKak 是台灣最完整的 GeoGuessr 中文資源站，提供免費每日挑戰連結、新手入門教學、特殊主題地圖推薦。無需登入、不用付費，立即開始你的地理探索之旅！"
// 字元數: 90 字元
```

**Open Graph：**
```typescript
title: "GeoGuessr 台灣中文推廣站 | 免費玩、免登入 - GeoPingKak"
description: "提供 GeoGuessr 免費每日挑戰、完整中文教學、特殊地圖推薦。新手友善、無需付費，立即開始玩！"
type: "website"
```

**JSON-LD 結構化資料：**
- Schema Type: `WebSite` (已存在於 root layout，無需重複)
- 額外建議: 可在首頁加入 `Organization` schema，包含 Discord 社群連結

**Canonical URL:** `https://geopingkak.web.app/`

---

### 2. 入門教學 (`/tutorial`)

**現況：** ❌ 完全缺少 metadata

**目標關鍵字：**
- Primary: `GeoGuessr 攻略`, `GeoGuessr 教學`, `GeoGuessr 入門`
- Secondary: `GeoGuessr 新手`, `GeoGuessr 怎麼玩`, `GeoGuessr 技巧`
- Long-tail: `GeoGuessr 車牌辨識`, `GeoGuessr 國旗`, `GeoGuessr 街景覆蓋`

**重要性：** 🚨 **最高改善潛力**
- GSC 數據顯示「geoguessr 攻略」有 130 曝光但僅 6 點擊（CTR 4.6%）
- 「geoguessr 入門」CTR 高達 37.5%，優化後可大幅提升流量

**SEO Metadata：**

```typescript
title: "GeoGuessr 新手入門攻略 | 車牌、國旗、街景覆蓋完整教學 - GeoPingKak"
// 字元數: 44 字元

description: "從零開始學 GeoGuessr！六大基本原則教你快速辨識國家：街景覆蓋範圍、車牌特徵、國旗與網域、道路通行方向、太陽位置。適合新手的完整中文攻略，不靠死背也能推理。"
// 字元數: 96 字元
```

**Open Graph：**
```typescript
title: "GeoGuessr 新手攻略 | 六大辨識技巧完整教學 - GeoPingKak"
description: "街景覆蓋、車牌、國旗、通行方向、太陽位置...從觀察世界開始，建立你的推理邏輯。適合新手的 GeoGuessr 中文教學。"
type: "article"
```

**JSON-LD 結構化資料：**

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "GeoGuessr 新手入門攻略 - 六大辨識原則",
  "description": "教你如何透過街景覆蓋、車牌、國旗、道路方向、太陽位置等六大原則，快速辨識 GeoGuessr 中的國家位置",
  "inLanguage": "zh-TW",
  "step": [
    {
      "@type": "HowToStep",
      "name": "了解街景覆蓋國家",
      "text": "全球只有約 100 個國家有 Google 街景，掌握這個範圍就能快速縮小可能性"
    },
    {
      "@type": "HowToStep",
      "name": "辨識國旗與網域",
      "text": "觀察路邊標誌、廣告、網址中的國旗和網域後綴"
    },
    {
      "@type": "HowToStep",
      "name": "識別車牌特徵",
      "text": "不同國家的車牌顏色、形狀、文字有明顯差異"
    },
    {
      "@type": "HowToStep",
      "name": "觀察道路通行方向",
      "text": "靠左行駛的國家相對少數，是重要的判斷依據"
    },
    {
      "@type": "HowToStep",
      "name": "判斷太陽位置",
      "text": "太陽方位可以判斷南北半球與緯度範圍"
    }
  ]
}
```

**Canonical URL:** `https://geopingkak.web.app/tutorial`

---

### 3. 每日挑戰 (`/daily-challenge`)

**現況：** ✅ 已有完整 metadata（已在 `metadata.ts` 實作）

**優化建議：** 🔄 **微調優化**

**目標關鍵字：**
- Primary: `GeoGuessr 免費`, `GeoGuessr 每日挑戰`
- Secondary: `GeoGuessr challenge`, `GeoGuessr 台灣地圖`
- Long-tail: `geoguessr challenge links`, `geoguessr 不用登入`

**現有 Title：**
```
"GeoGuessr 每日挑戰連結 | GeoPingKak 免費每日地圖推薦"
```

**建議優化為：**
```typescript
title: "GeoGuessr 免費每日挑戰 | 台灣、日本、世界地圖 - 免登入立即玩 - GeoPingKak"
// 理由：將「免費」前移，強調「免登入」解決 GSC「要錢嗎」問題
```

**現有 Description：**
```
"每日更新 GeoGuessr 挑戰連結（geoguessr challenge），提供世界地圖、台灣、日本等主題，不需登入帳號即可免費遊玩。過去連結也可重複練習。"
```

**建議優化為：**
```typescript
description: "每天更新！GeoGuessr 免費挑戰模式（challenge links），提供世界、台灣、日本地圖，完全免費、免登入、不限時間。過去的連結也可以重複練習，適合新手玩家。"
// 理由：加強「完全免費」、「適合新手」等關鍵訊息
```

**JSON-LD 建議：** 可考慮加入 `ItemList` schema，列出每日地圖類別

**Canonical URL:** `https://geopingkak.web.app/daily-challenge` （已存在）

---

## 🟡 P1: 高優先級頁面

### 4. 特殊主題地圖 (`/special-maps`)

**現況：** ❌ 完全缺少 metadata

**目標關鍵字：**
- Primary: `GeoGuessr 地圖`, `GeoGuessr 主題地圖`
- Secondary: `GeoGuessr 有趣地圖`, `GeoGuessr 推薦地圖`

**SEO Metadata：**

```typescript
title: "GeoGuessr 特殊主題地圖推薦 | 精選趣味挑戰地圖 - GeoPingKak"

description: "精心挑選的 GeoGuessr 特殊主題地圖，包含各國特色場景、趣味挑戰題庫。每個連結都是固定五題，免費遊玩、可重複挑戰，探索更多地理樂趣！"
```

**Open Graph：**
```typescript
title: "GeoGuessr 特殊主題地圖推薦 | 精選趣味挑戰 - GeoPingKak"
description: "手選的 GeoGuessr 特色地圖題庫，各國主題挑戰等你來探索。免費、固定題目、可重複遊玩。"
type: "website"
```

**JSON-LD 結構化資料：**

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "GeoGuessr 特殊主題地圖推薦",
  "description": "精選的 GeoGuessr 主題挑戰地圖集合",
  "itemListElement": []  // 可由前端動態填充地圖類別
}
```

**Canonical URL:** `https://geopingkak.web.app/special-maps`

---

### 5. 名詞解釋 (`/glossary`)

**現況：** ✅ 已有完整 metadata + JSON-LD (DefinedTermSet)

**優化建議：** ✅ **保持現狀，無需修改**（已實作良好）

---

### 6. 常見問題 Q&A (`/qna`)

**現況：** ✅ 已有完整 metadata + JSON-LD (FAQPage)

**優化建議：** 🔄 **微調標題**

**建議優化標題：**
```typescript
title: "GeoGuessr 常見問題 FAQ | 新手疑難解答 - GeoPingKak"
// 加入「新手」關鍵字
```

**Canonical URL:** 建議加入 `https://geopingkak.web.app/qna`

---

## 🟢 P2: 中優先級頁面

### 7. 速查筆記主頁 (`/quick-reference`)

**現況：** ❌ 無 metadata（使用 layout，無 page.tsx）

**目標關鍵字：**
- `GeoGuessr 速查表`

**建議：** 建立 `/quick-reference/page.tsx` 作為索引頁

**SEO Metadata：**

```typescript
title: "GeoGuessr 速查筆記 | 巴西、印尼地名電話區碼查詢 - GeoPingKak"

description: "GeoGuessr 實用速查工具，提供巴西電話區碼對照表、印尼文地名查詢等辨識資源，快速縮小範圍、提升答題準確度。"
```

---

### 8. 速查筆記 - 巴西 (`/quick-reference/br`)

**現況：** ⚠️ 僅有基本 title/description，缺少 OG/Twitter Card

**目標關鍵字：**
- `GeoGuessr 巴西`, `巴西電話區碼`

**建議補強：**

```typescript
export const metadata: Metadata = {
  title: "巴西電話區碼速查表 | GeoGuessr 巴西辨識工具 - GeoPingKak",
  description: "GeoGuessr 玩家必備！完整的巴西電話區碼對照表，透過路邊電話號碼快速判斷城市位置，提升巴西地圖答題準確度。",
  openGraph: {
    title: "巴西電話區碼速查表 | GeoGuessr 工具 - GeoPingKak",
    description: "根據電話號碼快速辨識巴西城市位置的實用查詢工具",
    type: "article",
    url: "https://geopingkak.web.app/quick-reference/br",
  },
  twitter: {
    card: "summary",
    title: "巴西電話區碼速查表 - GeoPingKak",
    description: "GeoGuessr 巴西辨識必備工具",
  },
  alternates: {
    canonical: "https://geopingkak.web.app/quick-reference/br",
  },
};
```

---

### 9. 速查筆記 - 印尼 (`/quick-reference/id`)

**現況：** ⚠️ 僅有基本 title/description，缺少 OG/Twitter Card

**目標關鍵字：**
- `GeoGuessr 印尼`, `印尼文地名`

**建議補強：**

```typescript
export const metadata: Metadata = {
  title: "印尼文地名速查表 | GeoGuessr 印尼辨識工具 - GeoPingKak",
  description: "GeoGuessr 印尼地圖專用！常見印尼文地名、行政區劃對照表，透過路牌文字快速判斷位置，提升印尼答題正確率。",
  openGraph: {
    title: "印尼文地名速查表 | GeoGuessr 工具 - GeoPingKak",
    description: "快速辨識印尼地名的實用查詢工具",
    type: "article",
    url: "https://geopingkak.web.app/quick-reference/id",
  },
  twitter: {
    card: "summary",
    title: "印尼文地名速查表 - GeoPingKak",
    description: "GeoGuessr 印尼辨識必備工具",
  },
  alternates: {
    canonical: "https://geopingkak.web.app/quick-reference/id",
  },
};
```

---

### 10. 推薦設定 (`/recommend_settings`)

**現況：** ❌ 完全缺少 metadata

**目標關鍵字：**
- `GeoGuessr 設定`

**SEO Metadata：**

```typescript
title: "GeoGuessr 推薦設定 | 遊戲設定優化建議 - GeoPingKak"

description: "GeoGuessr 遊戲設定優化指南，包含畫面、控制、輔助功能等推薦配置，提升遊戲體驗與答題效率。"
```

---

### 11. 進階學習資源 (`/source`)

**現況：** ❌ 完全缺少 metadata

**目標關鍵字：**
- `GeoGuessr 資源`

**SEO Metadata：**

```typescript
title: "GeoGuessr 進階學習資源 | 外部教學與工具推薦 - GeoPingKak"

description: "精選 GeoGuessr 進階學習資源，包含國外優質教學影片、實用工具網站、社群資源推薦，幫助你從新手晉升高手。"
```

---

### 12. 社群地圖 (`/community-maps`)

**現況：** ❌ 完全缺少 metadata

**目標關鍵字：**
- `GeoGuessr 社群地圖`

**SEO Metadata：**

```typescript
title: "GeoGuessr 社群推薦地圖 | 玩家精選地圖分享 - GeoPingKak"

description: "由社群玩家推薦的優質 GeoGuessr 地圖集合，包含台灣在地場景、特色主題地圖等，發掘更多有趣的遊戲內容。"
```

---

## ⚪ 排除頁面

### 13. 直播企劃提案 (`/show-proposals`)

**決策：** ❌ **不進行 SEO 優化**（內部使用性質）

**建議技術處理：**
- 在 `robots.txt` 中加入：
  ```
  User-agent: *
  Disallow: /show-proposals
  ```

---

## 🔧 技術實作項目

### A. 高優先級（必須完成）

#### A1. 建立 sitemap.ts

**位置：** `/frontend/app/sitemap.ts`

**實作內容：**

```typescript
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://geopingkak.web.app';

  const routes = [
    '',
    '/daily-challenge',
    '/tutorial',
    '/special-maps',
    '/glossary',
    '/qna',
    '/quick-reference/br',
    '/quick-reference/id',
    '/recommend_settings',
    '/source',
    '/community-maps',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '/daily-challenge' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route === '/tutorial' ? 0.9 : 0.8,
  }));
}
```

**預期生成 URL：** `https://geopingkak.web.app/sitemap.xml`

---

#### A2. 建立 robots.ts

**位置：** `/frontend/app/robots.ts`

**實作內容：**

```typescript
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/show-proposals'],
    },
    sitemap: 'https://geopingkak.web.app/sitemap.xml',
  };
}
```

**預期生成 URL：** `https://geopingkak.web.app/robots.txt`

---

#### A3. 為首頁新增 metadata

**位置：** `/frontend/app/page.tsx`

**實作方式：** 使用 `generateMetadata` 函數

```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GeoGuessr 台灣中文推廣站 | 免費每日挑戰、新手教學與地圖資源 - GeoPingKak",
  description: "GeoPingKak 是台灣最完整的 GeoGuessr 中文資源站，提供免費每日挑戰連結、新手入門教學、特殊主題地圖推薦。無需登入、不用付費，立即開始你的地理探索之旅！",
  openGraph: {
    title: "GeoGuessr 台灣中文推廣站 | 免費玩、免登入 - GeoPingKak",
    description: "提供 GeoGuessr 免費每日挑戰、完整中文教學、特殊地圖推薦。新手友善、無需付費，立即開始玩！",
    url: "https://geopingkak.web.app/",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoPingKak - GeoGuessr 台灣中文推廣站",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 台灣中文推廣站 | 免費玩 - GeoPingKak",
    description: "免費每日挑戰、新手教學、特殊地圖推薦。完全免登入，立即開始玩！",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
  alternates: {
    canonical: "https://geopingkak.web.app/",
  },
};
```

---

#### A4. 為入門教學頁面新增完整 SEO

**位置：** `/frontend/app/tutorial/page.tsx`

**實作方式：**
1. 新增 `metadata.ts` 檔案（類似 daily-challenge 結構）
2. 在 `page.tsx` 中移除 `"use client"` 並分離出 `client.tsx`
3. 加入 HowTo JSON-LD schema

**檔案結構：**
```
/frontend/app/tutorial/
├── page.tsx        (Server Component with metadata)
├── metadata.ts     (Metadata definition)
└── client.tsx      (Client Component with original logic)
```

---

#### A5. 為特殊地圖頁面新增完整 SEO

**位置：** `/frontend/app/special-maps/page.tsx`

**實作方式：** 同上，分離 client/server component，加入 metadata 和 JSON-LD

---

### B. 中優先級（建議完成）

#### B1. 優化每日挑戰頁面 metadata

**位置：** `/frontend/app/daily-challenge/metadata.ts`

**修改內容：** 更新 title 和 description（如前述 P0-3）

---

#### B2. 補強速查筆記子頁面

**位置：**
- `/frontend/app/quick-reference/br/page.tsx`
- `/frontend/app/quick-reference/id/page.tsx`

**修改內容：** 加入 Open Graph, Twitter Card, Canonical URL

---

#### B3. 新增其他頁面 metadata

為以下頁面加入基本 metadata：
- `/frontend/app/recommend_settings/page.tsx`
- `/frontend/app/source/page.tsx`
- `/frontend/app/community-maps/page.tsx`
- `/frontend/app/quick-reference/page.tsx` (新增索引頁)

---

#### B4. 為 Q&A 頁面加入 Canonical URL

**位置：** `/frontend/app/qna/page.tsx`

---

### C. 低優先級（可選）

#### C1. 建立頁面專屬 OG Image

**說明：** 目前暫不實作（已在需求中排除）

---

#### C2. 加入 BreadcrumbList Schema

**說明：** 未來可考慮為子頁面加入麵包屑導航結構化資料

---

## 📊 預期效果與 KPI

### 短期目標（1-2 週後）

1. **Google Search Console 收錄頁面數**：從目前狀況增加到 12 個頁面
2. **Sitemap 提交**：成功提交並被 Google 索引

### 中期目標（1-2 個月後）

1. **「geoguessr 攻略」CTR**：從 4.6% 提升至 15%+（預估增加 10+ 點擊/天）
2. **「geoguessr 免費」CTR**：從 1.6% 提升至 10%+（預估增加 25+ 點擊/天）
3. **「geoguessr 入門」曝光數**：從 16 提升至 100+（保持高 CTR）
4. **整體自然流量**：增長 30-50%

### 長期目標（3-6 個月後）

1. **品牌詞以外流量占比**：從目前 < 15% 提升至 40%+
2. **入門教學頁面成為「geoguessr 攻略」前三名結果**
3. **總點擊數**：從目前 ~1500/月 成長至 3000+/月

---

## ✅ 實作檢查清單

### Phase 1: 基礎建設（必須完成）
- [ ] A1. 建立 `sitemap.ts`
- [ ] A2. 建立 `robots.ts`
- [ ] A3. 首頁加入 metadata
- [ ] A4. 入門教學加入完整 SEO（含 HowTo schema）
- [ ] A5. 特殊地圖加入完整 SEO（含 ItemList schema）

### Phase 2: 優化現有頁面（建議完成）
- [ ] B1. 優化每日挑戰 metadata
- [ ] B2. 補強速查筆記 - 巴西頁面
- [ ] B3. 補強速查筆記 - 印尼頁面
- [ ] B4. Q&A 加入 Canonical URL
- [ ] B5. 推薦設定加入 metadata
- [ ] B6. 進階資源加入 metadata
- [ ] B7. 社群地圖加入 metadata
- [ ] B8. 速查筆記主頁加入 metadata

### Phase 3: 驗證與監控
- [ ] 部署至 staging 環境測試
- [ ] 使用 Google Rich Results Test 驗證結構化資料
- [ ] 使用 Google Search Console 提交 sitemap
- [ ] 確認所有頁面 metadata 在瀏覽器中正確顯示
- [ ] 確認 robots.txt 可正常訪問
- [ ] 部署至 production 環境

---

## 📝 實作注意事項

### 開發規範

1. **Server vs Client Components**
   - 有 metadata 的頁面必須是 Server Component
   - 如果需要使用 hooks（useState, useEffect），請分離成 `client.tsx`
   - 參考 `daily-challenge` 的實作模式

2. **Metadata 撰寫原則**
   - Title 長度：50-60 字元（中文約 25-30 字）
   - Description 長度：120-160 字元（中文約 60-80 字）
   - 必須包含目標關鍵字，但避免 keyword stuffing
   - 標題和描述要吸引點擊，突出「免費」、「中文」、「新手友善」等優勢

3. **JSON-LD Schema**
   - 使用 `<Script>` 標籤插入，strategy 設為 `afterInteractive`
   - 確保 JSON 格式正確，避免語法錯誤
   - 使用 Google Rich Results Test 驗證

4. **Canonical URLs**
   - 所有頁面都應設定 canonical URL
   - 格式：`https://geopingkak.web.app/路徑`（不含 trailing slash）

### 測試流程

1. **本機測試**
   ```bash
   cd frontend
   npm run dev
   # 檢查每個頁面的 <head> 是否包含正確 metadata
   ```

2. **Staging 部署**
   ```bash
   cd backend
   ./deploy.sh staging

   cd ../frontend
   ./deploy.sh staging

   # 訪問 https://staging--geopingkak.web.app
   # 檢查 sitemap.xml 和 robots.txt
   ```

3. **SEO 驗證工具**
   - [Google Rich Results Test](https://search.google.com/test/rich-results)
   - [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
   - [Twitter Card Validator](https://cards-dev.twitter.com/validator)

4. **Production 部署**
   ```bash
   cd backend
   ./deploy.sh prod

   cd ../frontend
   ./deploy.sh prod
   ```

5. **Search Console 提交**
   - 提交新的 sitemap: `https://geopingkak.web.app/sitemap.xml`
   - 請求為所有頁面重新建立索引

---

## 🎯 成功指標

實作完成後，應達成：

✅ **技術指標**
- 12 個頁面都有完整 metadata（除排除頁面）
- sitemap.xml 包含所有頁面
- robots.txt 正確配置
- 3 個頁面有 JSON-LD 結構化資料（首頁、教學、特殊地圖）
- 所有頁面都有 canonical URL

✅ **GSC 指標（1 個月後檢視）**
- 索引頁面數達到 12+
- 「geoguessr 攻略」CTR > 10%
- 「geoguessr 免費」CTR > 8%
- 整體點擊數成長 > 20%

✅ **用戶體驗指標**
- 搜尋結果中的標題和描述更吸引人
- 社群分享時顯示正確的 OG 卡片
- 新用戶透過自然搜尋發現網站的比例提升

---

## 📎 附錄

### A. 參考資源

- [Next.js Metadata 文件](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Schema.org 結構化資料](https://schema.org/)
- [Google 搜尋中心](https://developers.google.com/search)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

### B. 目前已實作的 SEO 功能

✅ Root Layout: WebSite schema, GA, Google Site Verification
✅ 每日挑戰: 完整 metadata + OG + Twitter Card
✅ 名詞解釋: 完整 metadata + DefinedTermSet schema
✅ Q&A: 完整 metadata + FAQPage schema

### C. GSC 關鍵字完整列表

| 關鍵字 | 點擊 | 曝光 | CTR | 排名建議 |
|--------|------|------|-----|---------|
| geopingkak | 838 | 992 | 84.5% | 保持 |
| geoguessr 台灣 免費 | 294 | 1,702 | 17.3% | 提升 |
| geoguessr 中文 | 143 | 707 | 20.2% | 保持 |
| geoguessr 台灣 | 79 | 586 | 13.5% | 提升 |
| geoguessr 練習 | 14 | 58 | 24.1% | 保持 |
| geoguessr中文 | 13 | 90 | 14.4% | 合併 |
| geoguessr 攻略 | 6 | 130 | 4.6% | **急需提升** |
| geoguessr 入門 | 6 | 16 | 37.5% | 增加曝光 |
| geoguessr 要錢嗎 | 5 | 335 | 1.5% | **急需提升** |
| geoguessr 免費 | 5 | 307 | 1.6% | **急需提升** |

---

**文件結束**

請確認以上 PRD 內容，確認無誤後即可開始實作。
