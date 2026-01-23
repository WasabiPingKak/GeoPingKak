# Tutorial 分頁獨立路由與 SEO 優化 PRD

## 一、專案目標

將 `/tutorial` 頁面中的 6 個分頁（Tab）轉換為獨立的子路由，提升 SEO 效果並改善使用者體驗。

## 二、現況分析

### 2.1 現有結構
- **主路由**: `/tutorial`
- **實作方式**: 使用 `useState` + Tab 切換顯示不同內容
- **現有分頁**（共 6 個）:
  1. 前言
  2. 街景覆蓋國家
  3. 國旗/網域
  4. 道路通行方向
  5. 太陽
  6. 車牌

### 2.2 現有問題
1. **SEO 問題**:
   - 所有分頁內容在同一個 URL，搜尋引擎無法單獨索引各分頁
   - 無法針對特定主題（如「車牌辨識」）優化關鍵字
   - 使用者無法直接分享特定分頁的連結

2. **使用者體驗問題**:
   - 無法透過 URL 直接進入特定教學章節
   - 瀏覽器「上一頁」功能無法返回前一個分頁
   - 無法記錄使用者的閱讀進度（刷新後回到第一個分頁）

## 三、設計方案

### 3.1 URL 路由設計

採用 **巢狀路由（Nested Routes）** 結構：

```
/tutorial                    # 總覽頁（新增）或重定向到第一個分頁
/tutorial/intro              # 前言
/tutorial/street-coverage    # 街景覆蓋國家
/tutorial/flags-domains      # 國旗/網域
/tutorial/driving-side       # 道路通行方向
/tutorial/sun-position       # 太陽
/tutorial/license-plates     # 車牌
```

**URL 命名原則**:
- 使用英文小寫 + 連字號（kebab-case）
- 語意清晰，符合 SEO 最佳實務
- 與內容主題緊密對應

### 3.2 目錄結構設計

```
frontend/app/tutorial/
├── layout.tsx                          # Tutorial 共用佈局（含導覽、麵包屑）
├── page.tsx                            # /tutorial 總覽頁或重定向
├── metadata.ts                         # 總覽頁 metadata
├── intro/
│   ├── page.tsx                        # Server Component
│   ├── client.tsx                      # Client Component（使用 TabIntro）
│   └── metadata.ts                     # SEO metadata
├── street-coverage/
│   ├── page.tsx
│   ├── client.tsx                      # 使用 TabStreetCoverage
│   └── metadata.ts
├── flags-domains/
│   ├── page.tsx
│   ├── client.tsx                      # 使用 TabFlagDomain
│   └── metadata.ts
├── driving-side/
│   ├── page.tsx
│   ├── client.tsx                      # 使用 TabDrivingSide
│   └── metadata.ts
├── sun-position/
│   ├── page.tsx
│   ├── client.tsx                      # 使用 TabSunPosition
│   └── metadata.ts
└── license-plates/
    ├── page.tsx
    ├── client.tsx                      # 使用 TabLicensePlates
    └── metadata.ts
```

**說明**:
- `layout.tsx`: 提供統一的側邊導覽列或麵包屑，顯示所有分頁連結
- 每個子頁面沿用現有的 `components/tutorial/Tab*.tsx` 元件
- 保留 Server/Client Component 分離模式，便於 SEO 優化

### 3.3 導覽設計

#### 3.3.1 Tutorial 共用 Layout
在 `app/tutorial/layout.tsx` 中提供：
- **側邊導覽列**（桌面版）: 左側固定顯示所有章節連結
- **下拉選單**（行動版）: 響應式設計，小螢幕顯示 Select 或 Drawer
- **麵包屑導覽**: `首頁 > 入門教學 > [當前章節]`
- **上一頁/下一頁按鈕**: 頁面底部提供線性閱讀導覽

#### 3.3.2 導覽列樣式
- 高亮當前所在章節（使用 `usePathname`）
- 顯示章節編號（例如：1. 前言、2. 街景覆蓋國家...）
- 固定位置，方便快速跳轉

### 3.4 SEO 優化策略

#### 3.4.1 每個分頁的獨立 Metadata

**範例：`/tutorial/license-plates/metadata.ts`**

```typescript
export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 車牌辨識教學 | 歐盟車牌、亞洲車牌特徵完整解析 - GeoPingKak",
    description: "詳細解說各國車牌特徵：歐盟藍條車牌、日韓車牌差異、美國車牌樣式。透過車牌快速辨識國家的實戰技巧。",
    keywords: "GeoGuessr 車牌, 歐盟車牌, 車牌辨識, 國家車牌特徵",
    openGraph: {
      title: "GeoGuessr 車牌辨識完整教學 - GeoPingKak",
      description: "歐盟藍條車牌、亞洲車牌、美國車牌...各國車牌特徵詳解，教你快速辨識國家。",
      url: "https://geopingkak.web.app/tutorial/license-plates",
      type: "article",
      // ...
    },
    alternates: {
      canonical: "https://geopingkak.web.app/tutorial/license-plates",
    },
  };
}
```

#### 3.4.2 結構化資料（JSON-LD）

**方案 A: 總覽頁使用 ItemList**
在 `/tutorial/page.tsx` 中：

```json
{
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "GeoGuessr 入門教學章節",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "前言",
      "url": "https://geopingkak.web.app/tutorial/intro"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "街景覆蓋國家",
      "url": "https://geopingkak.web.app/tutorial/street-coverage"
    }
    // ...
  ]
}
```

**方案 B: 各子頁面使用 Article**
在各分頁的 `page.tsx` 中加入：

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "GeoGuessr 車牌辨識教學",
  "description": "詳細解說各國車牌特徵...",
  "author": {
    "@type": "Organization",
    "name": "GeoPingKak"
  },
  "publisher": {
    "@type": "Organization",
    "name": "GeoPingKak"
  },
  "inLanguage": "zh-TW"
}
```

#### 3.4.3 內部連結優化
- 在 `前言` 中加入導覽清單，連結到所有章節
- 各章節底部提供「延伸閱讀」區塊，交叉連結相關章節
- 更新 `sitemap.ts`，加入所有 tutorial 子路由

#### 3.4.4 關鍵字策略

| 分頁 | 主要關鍵字 | 次要關鍵字 |
|------|-----------|-----------|
| 前言 | GeoGuessr 教學, GeoGuessr 攻略 | GeoGuessr 新手, 地理遊戲 |
| 街景覆蓋國家 | GeoGuessr 街景國家, Google 街景覆蓋 | 街景國家列表, 哪些國家有街景 |
| 國旗/網域 | GeoGuessr 國旗, 國旗辨識 | 國家網域, 網域後綴 |
| 道路通行方向 | 靠左行駛國家, 道路通行方向 | 靠右行駛, 通行方向判斷 |
| 太陽位置 | GeoGuessr 太陽, 太陽方位判斷 | 南北半球判斷, 太陽陰影 |
| 車牌辨識 | GeoGuessr 車牌, 歐盟車牌 | 車牌辨識, 各國車牌特徵 |

### 3.5 路由行為設計

#### 3.5.1 `/tutorial` 總覽頁選項

**選項 A: 導覽頁（推薦）**
- 顯示所有章節的卡片式導覽
- 每個卡片包含：章節標題、簡短描述、閱讀按鈕
- 保留原本的總教學介紹文字

**選項 B: 自動重定向**
- 自動重定向到 `/tutorial/intro`
- `/tutorial` 不作為獨立頁面

**建議**: 採用選項 A，提供更好的使用者體驗和 SEO 效果

#### 3.5.2 麵包屑導覽
```
首頁 > 入門教學 > 車牌辨識
```

使用 Next.js 的 `usePathname` 動態生成

### 3.6 響應式設計

#### 桌面版（≥1024px）
```
┌─────────────────┬──────────────────────────┐
│  側邊導覽列      │  內容區域                  │
│  1. 前言         │  [章節內容]               │
│  2. 街景覆蓋     │                          │
│  3. 國旗/網域    │                          │
│  4. 道路方向     │  [上一頁] [下一頁]         │
│  5. 太陽         │                          │
│  6. 車牌 ✓      │                          │
└─────────────────┴──────────────────────────┘
```

#### 行動版（<1024px）
```
┌──────────────────────────┐
│  [☰ 選擇章節 ▾]           │  ← Drawer/Select
├──────────────────────────┤
│  [章節內容]               │
│                          │
│  [← 上一頁] [下一頁 →]    │
└──────────────────────────┘
```

## 四、實作檢查清單

### 4.1 檔案結構建立
- [ ] 創建 `app/tutorial/layout.tsx`
- [ ] 創建各分頁目錄與檔案（intro, street-coverage 等）
- [ ] 每個分頁包含 `page.tsx`, `client.tsx`, `metadata.ts`

### 4.2 元件開發
- [ ] 實作 Tutorial 側邊導覽元件（桌面版）
- [ ] 實作 Tutorial 行動版選單（Drawer/Select）
- [ ] 實作麵包屑元件
- [ ] 實作上一頁/下一頁按鈕元件
- [ ] 在 client.tsx 中引用現有的 Tab 元件

### 4.3 SEO 優化
- [ ] 撰寫各分頁的 metadata（title, description, OG, keywords）
- [ ] 在 `/tutorial/page.tsx` 加入 ItemList JSON-LD
- [ ] 各子頁面加入 Article JSON-LD
- [ ] 更新 `sitemap.ts`，加入所有 tutorial 子路由
- [ ] 確保所有頁面有 canonical URL

### 4.4 使用者體驗
- [ ] 導覽列高亮當前頁面
- [ ] 上一頁/下一頁按鈕正確運作
- [ ] 響應式設計（桌面/平板/手機）
- [ ] 測試瀏覽器「上一頁」功能
- [ ] 測試直接訪問子路由 URL

### 4.5 測試
- [ ] 本地開發環境測試所有路由
- [ ] 測試 metadata 渲染是否正確
- [ ] 測試 JSON-LD 結構（使用 Google Rich Results Test）
- [ ] 測試行動版響應式佈局
- [ ] 部署到 Staging 環境測試

### 4.6 部署
- [ ] 提交程式碼到分支
- [ ] 部署到 Staging 環境
- [ ] 確認 Staging 功能正常
- [ ] 部署到 Production 環境
- [ ] 提交新 sitemap 到 Google Search Console

## 五、技術細節

### 5.1 使用的技術
- Next.js 16 App Router (Nested Routes)
- React 19
- TypeScript
- Tailwind CSS
- `usePathname` hook（判斷當前路由）

### 5.2 現有元件重用
所有分頁內容元件可直接重用，無需修改：
- `components/tutorial/TabIntro.tsx`
- `components/tutorial/TabStreetCoverage.tsx`
- `components/tutorial/TabFlagDomain.tsx`
- `components/tutorial/TabDrivingSide.tsx`
- `components/tutorial/TabSunPosition.tsx`
- `components/tutorial/TabLicensePlates.tsx`

### 5.3 移除的元件
- `components/shared/CommonTabs.tsx` - 在 tutorial 中不再需要（但保留給其他頁面使用）
- 原本的 `app/tutorial/client.tsx` 中的 Tab 切換邏輯

## 六、風險與注意事項

### 6.1 URL 變更影響
- **風險**: 現有使用者可能有 `/tutorial` 的書籤
- **解決方案**:
  - 保留 `/tutorial` 作為總覽頁，不會破壞現有連結
  - 如果採用重定向方案，使用 301 永久重定向

### 6.2 SEO 轉移期
- **風險**: Google 可能需要時間重新索引新的 URL 結構
- **解決方案**:
  - 提交新的 sitemap 到 Google Search Console
  - 使用 canonical URL 避免重複內容問題

### 6.3 開發成本
- **預估**: 6-8 個分頁 × 3 檔案 = 約 18-24 個新檔案
- **工作量**: 中等（主要是檔案建立、metadata 撰寫、導覽元件開發）

## 七、時間規劃建議

1. **階段一：檔案結構與路由（1-2天）**
   - 建立目錄結構
   - 創建基本的 page.tsx 和 client.tsx
   - 實作 layout.tsx

2. **階段二：導覽與 UX（1-2天）**
   - 開發側邊導覽元件
   - 實作麵包屑與上下頁按鈕
   - 響應式設計調整

3. **階段三：SEO 優化（1-2天）**
   - 撰寫所有 metadata
   - 加入 JSON-LD 結構化資料
   - 更新 sitemap

4. **階段四：測試與部署（1天）**
   - 本地測試
   - Staging 部署與測試
   - Production 部署

## 八、成功指標

### 8.1 技術指標
- [ ] 所有子路由可直接訪問
- [ ] 瀏覽器上一頁/下一頁功能正常
- [ ] 每個頁面有獨立的 title 和 description
- [ ] JSON-LD 通過 Google Rich Results Test

### 8.2 SEO 指標（部署後 2-4 週）
- Google Search Console 中索引的頁面數量從 1 增加到 7
- 各分頁在 Google 搜尋中獨立出現
- 針對特定關鍵字（如「GeoGuessr 車牌」）的排名提升

### 8.3 使用者體驗指標
- 使用者可以分享特定章節的 URL
- 頁面導覽直覺易用
- 響應式設計在各裝置上運作良好

## 九、參考資料

- Next.js App Router 文件: https://nextjs.org/docs/app
- Google SEO 最佳實務: https://developers.google.com/search/docs
- Schema.org 結構化資料: https://schema.org/
- 現有 SEO 策略: `/home/user/GeoPingKak/SEO_OPTIMIZATION_PRD.md`

---

**文件版本**: 1.0
**建立日期**: 2026-01-23
**作者**: Claude Code
**專案**: GeoPingKak Tutorial Routing & SEO Enhancement
