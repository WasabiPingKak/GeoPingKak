[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/WasabiPingKak/GeoPingKak)

# GeoPingKak 中文 GeoGuessr 資源推廣網站

這裡是台灣 Vtuber 山葵冰角 推廣 GeoGuessr 的網站。

👉 [網站連結](https://geopingkak.web.app/)

---

## 🛠️ 開發與部署

### 本地開發（啟動前端 dev server）
```bash
npm run dev
```

> 這個指令會啟動本地端的開發環境。

### 部署到 Firebase Hosting
```bash
firebase deploy
```
> 這個指令會直接部署到 Firebase Hosintg 的正式環境。

### 部署後端
```bash
./deploy
```

> 執行部署腳本

---

## 📁 專案結構

```
frontend/
├── app/
│   ├── layout.tsx                     ← Server Component，套用全域樣式與佈局
│   ├── page.tsx                       ← 首頁
│   ├── globals.css
│   ├── favicon.ico
│   ├── daily-challenge/
│   │   └── page.tsx                   ← 每日挑戰主頁
│   ├── special-maps/
│   │   └── page.tsx                   ← 特殊主題地圖
│   ├── tutorial/
│   │   └── page.tsx                   ← 入門教學
│   ├── source/
│   │   └── page.tsx                   ← 其它學習資源
│   └── show-proposals/
│       └── page.tsx                   ← 企劃建議

├── components/
│   ├── QueryProvider.tsx
│   ├── SidebarMenu.tsx
│   ├── SocialLinks.jsx
│   ├── layout/
│   │   └── RootShell.tsx             ← 負責響應式 Sidebar 控制
│   └── common/
│       └── MobileSidebarDrawer.tsx   ← 手機滑出式側邊欄

├── components/daily-challenge/
│   ├── ChallengeDescription.tsx
│   ├── CountryTabs.tsx
│   ├── DailyChallengeList.tsx
│   ├── MapChallengeCard.tsx
│   └── mapTitles.ts

├── hooks/
│   └── useDailyChallengeData.ts

├── types/
│   └── daily-challenge.ts
```

---

