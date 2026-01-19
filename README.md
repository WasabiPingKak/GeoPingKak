[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/WasabiPingKak/GeoPingKak)

# GeoPingKak 中文 GeoGuessr 資源推廣網站

這裡是台灣 Vtuber 山葵冰角 推廣 GeoGuessr 的網站。

👉 [網站連結](https://geopingkak.web.app/)

---

## 🛠️ 開發與部署

### 本地開發（啟動前端 dev server）
```bash
cd frontend
npm run dev
```

> 這個指令會啟動本地端的開發環境（使用 Turbopack）。

### 部署前端到 Firebase Hosting
```bash
cd frontend
./deploy.sh
```
> 此腳本會先執行 `npm run build`（含 sitemap 生成），再部署至 Firebase Hosting。

### 部署後端到 Cloud Run
```bash
cd backend
./deploy.sh
```
> 此腳本會建構 Docker 映像並部署至 Google Cloud Run。

---

## 📁 專案結構

```
GeoPingKak/
├── backend/                          # Flask API (Cloud Run)
│   ├── app.py                        # Flask 入口，初始化 Firestore
│   ├── deploy.sh                     # Cloud Run 部署腳本
│   ├── routes/
│   │   ├── daily_challenge_reader.py
│   │   ├── daily_challenge_writer.py
│   │   ├── geoguessr_map_routes.py
│   │   └── special_map_routes.py
│   └── services/
│       └── geoguessr_challenge.py
│
├── frontend/                         # Next.js App (Firebase Hosting)
│   ├── app/
│   │   ├── layout.tsx                # 根佈局 (QueryProvider + RootShell)
│   │   ├── page.tsx                  # 首頁
│   │   ├── globals.css
│   │   ├── community-maps/           # 社群地圖推薦
│   │   ├── daily-challenge/          # 每日挑戰
│   │   ├── glossary/                 # 名詞解釋
│   │   ├── qna/                      # Q&A
│   │   ├── quick-reference/          # 速查筆記 (br/, id/)
│   │   ├── recommend_settings/       # 推薦設定
│   │   ├── show-proposals/           # 直播企劃提案
│   │   ├── source/                   # 進階學習資源
│   │   ├── special-maps/             # 特殊主題地圖
│   │   └── tutorial/                 # 入門教學
│   │
│   ├── components/
│   │   ├── QueryProvider.tsx         # React Query Provider
│   │   ├── SidebarMenu.tsx           # 側邊欄導覽
│   │   ├── layout/
│   │   │   └── RootShell.tsx         # 響應式 Sidebar 控制
│   │   ├── common/
│   │   │   └── MobileSidebarDrawer.tsx
│   │   ├── shared/                   # 共用元件
│   │   ├── community-maps/
│   │   ├── daily-challenge/
│   │   ├── proposals/
│   │   ├── special-maps/
│   │   └── tutorial/                 # 教學相關元件 (coverage/, flags/, plate/)
│   │
│   ├── data/
│   │   ├── glossary.ts
│   │   └── videoExplanations.ts
│   │
│   ├── hooks/
│   │   ├── useDailyChallengeData.ts
│   │   └── useSpecialMapData.ts
│   │
│   └── types/
│       └── map-entry.ts
│
└── README.md
```

> 完整目錄結構請參考 [CLAUDE.md](./CLAUDE.md)

---

