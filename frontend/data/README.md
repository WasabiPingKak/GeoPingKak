# coverageData.ts 修改指南

此檔案為街景覆蓋資料的單一資料來源，所有關於地圖顏色、國家狀態、小國圓點位置的修改都在此進行。

## 📋 文件結構

### 1. 顏色配置

```typescript
export const COVERAGE_COLORS: Record<CoverageStatus, string> = {
  full: "#1d7374",       // 完整街景（深青色）
  limited: "#39e5e5",    // 有限街景（亮青色）
  none: "#71717a",       // 沒有街景（灰色）
};
```

**修改全域配色**：直接編輯十六進位色碼即可影響所有地圖。

### 2. 國家資料結構

```typescript
export interface CoverageCountry {
  id: string;             // ISO 3166-1 numeric code（對應 TopoJSON geometry.id）
  nameTw: string;         // 繁體中文名稱
  status: CoverageStatus; // "full" | "limited" | "none"
  note?: string;          // 選填：備註，會在地圖上 tooltip 顯示
}
```

**可用的 status 值**：
- `"full"` - 完整街景覆蓋
- `"limited"` - 有限街景（只有特定景點或區域）
- `"none"` - 沒有街景

### 3. 小國圓點結構

對於地圖上太小無法辨識的國家，使用小圓點標記：

```typescript
export interface SmallNationMarker {
  id: string;                      // ISO 3166-1 numeric code
  nameTw: string;                  // 繁體中文名稱
  status: CoverageStatus;          // "full" | "limited" | "none"
  coordinates: [number, number];   // [經度, 緯度]
  note?: string;                   // 選填：備註
}
```

**座標格式**：
- 第一個數字為經度（longitude）：東為正 (0-180)，西為負 (-180-0)
- 第二個數字為緯度（latitude）：北為正 (0-90)，南為負 (-90-0)
- 例如：`[103.8, 1.35]` 表示新加坡的位置

---

## 🎨 修改國家顏色

### 步驟 1：定位國家資料

在各洲的 countries 陣列中尋找目標國家，例如：

```typescript
// ----- 亞洲 -----
const asiaCountries: CoverageCountry[] = [
  { id: "392", nameTw: "日本", status: "full" },      // ← 找到目標
  { id: "410", nameTw: "韓國", status: "full" },
  // ...
];
```

### 步驟 2：改變 status

修改 `status` 的值：

```typescript
// 修改前
{ id: "392", nameTw: "日本", status: "limited" }

// 修改後
{ id: "392", nameTw: "日本", status: "full" }
```

### 步驟 3：加入備註（選填）

如果有街景覆蓋限制，可加上備註說明：

```typescript
{
  id: "156",
  nameTw: "中國",
  status: "limited",
  note: "室內博物館，數量非常少"
}
```

---

## 📍 新增或調整小國圓點

### 何時需要小國圓點？

當國家在地圖上過小而難以識別時，使用小圓點。例如新加坡、盧森堡、新喀里多尼亞等。

### 步驟 1：在 smallNations 陣列中新增

找到該區域對應的 smallNations 陣列：

```typescript
const asiaSmallNations: SmallNationMarker[] = [
  { id: "096", nameTw: "汶萊", status: "none", coordinates: [114.9, 4.9] },
  { id: "702", nameTw: "新加坡", status: "full", coordinates: [103.8, 1.35] },
  // ← 在此新增新的國家
];
```

### 步驟 2：取得正確的座標

#### 使用 Google Maps 或 OpenStreetMap

1. 打開 [Google Maps](https://maps.google.com) 或 [OpenStreetMap](https://www.openstreetmap.org)
2. 搜尋該國家的中心或首都
3. 右鍵點擊位置，複製座標
4. **注意**：Google Maps 通常顯示 `緯度, 經度`，但我們需要 `[經度, 緯度]` 的格式

#### 座標轉換範例

Google Maps 顯示：`35.0894, -106.6504`（聖塔菲）

轉換為我們的格式：`[-106.6504, 35.0894]`

### 步驟 3：驗證座標精度

- **國家中心**：使用國家地理中心或首都位置
- **精確度**：小數點後保留 1-2 位即可（更高精度無必要）
- **驗證**：在地圖上視覺檢查圓點位置是否合理

#### 座標檢查清單

```typescript
// ✓ 好的例子
{ id: "702", nameTw: "新加坡", status: "full", coordinates: [103.8, 1.35] }

// ✗ 不好的例子
{ id: "702", nameTw: "新加坡", status: "full", coordinates: [1.35, 103.8] }  // 經緯度反了
{ id: "702", nameTw: "新加坡", status: "full", coordinates: [103.8, -1.35] } // 緯度符號錯誤
```

---

## 🗺️ 調整地圖視角

每個區域都有自己的中心點和縮放級別：

```typescript
export const REGION_CONFIGS: Record<RegionKey, RegionConfig> = {
  asia: {
    key: "asia",
    titleTw: "亞洲",
    center: [85, 30],     // [經度, 緯度]
    scale: 400,           // 縮放級別（越小越放大）
    countries: asiaCountries,
    smallNations: asiaSmallNations,
  },
  // ...
};
```

### 調整 center（地圖中心點）

改變 `[經度, 緯度]` 來移動地圖焦點：

```typescript
// 原始位置（亞洲）
center: [85, 30]

// 向東移動（經度增加）
center: [105, 30]

// 向南移動（緯度減少）
center: [85, 15]
```

### 調整 scale（縮放級別）

數值越小越放大，越大越縮小：

```typescript
scale: 200   // 放大（更近）
scale: 400   // 預設
scale: 600   // 縮小（更遠）
```

**推薦做法**：
- **亞洲、歐洲**：400-500
- **北美洲、南美洲**：400-500
- **加勒比海**：1200-1500（大量小島需更高的放大）
- **全球**：130-150（最遠視圖）

---

## 🌐 快速參考：常見 ISO 3166-1 數字代碼

### 亞洲
| 代碼 | 國家/地區 |
|------|---------|
| 156 | 中國 |
| 158 | 台灣 |
| 392 | 日本 |
| 410 | 韓國 |
| 356 | 印度 |
| 702 | 新加坡 |
| 764 | 泰國 |
| 392 | 日本 |

### 歐洲
| 代碼 | 國家 |
|------|------|
| 826 | 英國 |
| 250 | 法國 |
| 276 | 德國 |
| 380 | 義大利 |
| 724 | 西班牙 |
| 643 | 俄羅斯 |
| 352 | 冰島 |

### 美洲
| 代碼 | 國家 |
|------|------|
| 840 | 美國 |
| 124 | 加拿大 |
| 484 | 墨西哥 |
| 076 | 巴西 |
| 032 | 阿根廷 |
| 152 | 智利 |

### 非洲
| 代碼 | 國家 |
|------|------|
| 404 | 肯亞 |
| 710 | 南非 |
| 504 | 摩洛哥 |
| 818 | 埃及 |
| 566 | 奈及利亞 |

**完整列表**：[Wikipedia - ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1#Officially_assigned_code_elements)

---

## ✅ 修改檢查清單

修改前，確認以下項目：

- [ ] 國家的 ISO 代碼正確無誤
- [ ] status 值為 `"full"` 或 `"limited"` 或 `"none"` 之一
- [ ] 若有 note 字段，確認內容準確且簡明
- [ ] 小國圓點的座標格式為 `[經度, 緯度]`，且經度範圍 -180~180，緯度範圍 -90~90
- [ ] 若修改地圖視角，在瀏覽器測試視覺效果
- [ ] 確認新增或修改的資料未與其他項目重複

---

## 📝 修改後的驗證

修改檔案後，在開發環境進行快速測試：

```bash
# 前提：已在 frontend 目錄下
npm run dev

# 訪問教學頁面確認修改
# http://localhost:3000/tutorial
```

查看以下項目：
1. 修改的國家顏色是否正確
2. 小圓點位置是否合理
3. 地圖視角是否符合預期
4. tooltip（備註）是否正確顯示

---

## 🔍 進階：理解資料流

```
coverageData.ts
    ↓
CoverageMap.tsx（渲染地圖）
    ↓
CoverageRegionCard.tsx（顯示國家卡片）
    ↓
各洲覆蓋區塊（AfricaCoverageBlock.tsx 等）
```

- **coverageData.ts**：資料定義，單一來源
- **CoverageMap.tsx**：地圖渲染邏輯
- **覆蓋區塊**：區域導覽與卡片列表

所有視覺更新都源自 `coverageData.ts` 的修改，無需觸及其他檔案。

---

## 📞 常見問題

### Q: 如何找到某國家的 ISO 代碼？

A: 訪問 [Wikipedia ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) 搜尋國家名稱，數字代碼位於第二欄。

### Q: 小圓點顏色為何與國家顏色不同？

A: 小圓點使用 `COVERAGE_COLORS` 中定義的相同顏色，與國家 status 對應。修改 `status` 會自動更改圓點顏色。

### Q: 修改座標後地圖沒有反應？

A:
1. 確認座標格式無誤：`[數字, 數字]`
2. 確認經度範圍在 -180~180，緯度範圍在 -90~90
3. 重新整理瀏覽器（Ctrl+F5 或 Cmd+Shift+R）清除快取

### Q: 為什麼有些國家既在 countries 又在 smallNations？

A: countries 陣列控制國家在 TopoJSON 地圖上的顏色，smallNations 陣列在同一位置加上圓點標記。這樣可以確保小國既有顏色顯示，又有清晰的圓點標記。

### Q: 可以新增自訂顏色嗎？

A: 目前配色方案為全域統一（full/limited/none），若需要不同的顏色方案，需要修改 `CoverageMap.tsx` 的渲染邏輯。如有需求，請提出功能請求。

---

**最後修改**：2026年2月
**維護者**：GeoPingKak 開發團隊
