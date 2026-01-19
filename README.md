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

---

### 部署到 Staging 環境（測試環境）

#### 0. 初次設定：複製資料到 Staging（僅需執行一次）

**首次部署 Staging 環境時**，需要複製 Production 資料到 Staging collections：

```bash
cd backend

# 確認 GCP 認證
gcloud auth application-default login
gcloud config set project geopingkak

# 執行資料複製腳本
python scripts/copy_to_staging.py
```

> 此腳本會複製以下資料：
> - `daily_challenge` → `staging_daily_challenge`
> - `special_maps` → `staging_special_maps`
> - `geoguessr_map_index` → `staging_geoguessr_map_index`

**未來更新 Staging 資料**：再次執行 `python scripts/copy_to_staging.py` 即可

---

#### 1. 部署後端到 Staging
```bash
cd backend
./deploy.sh staging
```
> - 部署到 Cloud Run 服務：`geopingkak-backend-staging`
> - **自動更新** `frontend/.env.staging` 的 API endpoint

#### 2. 部署前端到 Staging
```bash
cd frontend
npm run deploy:staging
```
> 部署到 Firebase Hosting Channel：`staging--geopingkak.web.app`（有效期 30 天）

#### 3. 環境配置
- **後端環境變數**: `DEPLOY_ENV=staging`
- **前端環境變數**: 由 `deploy.sh` 自動更新至 `frontend/.env.staging`
- **資料庫隔離**: 使用 `staging_*` collection 前綴（例：`staging_daily_challenge`）

---

### 部署到 Production 環境（正式環境）

#### 1. 部署後端到 Production
```bash
cd backend
./deploy.sh prod
```
> - 部署到 Cloud Run 服務：`geopingkak-backend`
> - **自動更新** `frontend/.env.production` 的 API endpoint

#### 2. 部署前端到 Production
```bash
cd frontend
npm run deploy:prod
```
> 部署到 Firebase Hosting：`geopingkak.web.app`

#### 3. 環境配置
- **後端環境變數**: `DEPLOY_ENV=production`
- **前端環境變數**: 由 `deploy.sh` 自動更新至 `frontend/.env.production`
- **資料庫**: 使用原始 collection 名稱（例：`daily_challenge`）

---

### 🔄 完整部署流程

```bash
# 開發新功能
git checkout -b feature/new-feature

# 本地測試
cd frontend && npm run dev

# 部署到 staging 測試
cd ../backend && ./deploy.sh staging
cd ../frontend && npm run deploy:staging

# 在 staging URL 驗證功能
# https://staging--geopingkak.web.app

# 測試通過後 merge 到 main
git checkout main
git merge feature/new-feature

# 部署到 production
cd backend && ./deploy.sh prod
cd ../frontend && npm run deploy:prod
```

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

