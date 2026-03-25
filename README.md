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

### 部署到 Production 環境（正式環境）

Production 部署由 **GitHub Actions CI/CD** 自動執行：

- **觸發條件**：push 到 `main` branch
- **流程**：自動建構 Docker image → 部署 Cloud Run 後端 → 建構並部署 Firebase Hosting 前端
- **Workflow 檔案**：`.github/workflows/deploy-production.yml`

> 不需要手動執行任何部署指令，push 到 main 即完成部署。

---

### 部署到 Staging 環境（測試環境）

Staging 環境使用本地腳本手動部署。

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
> - `video_explanations` → `staging_video_explanations`

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
./deploy.sh staging
```
> 部署到 Firebase Hosting Channel：`staging--geopingkak.web.app`（有效期 30 天）

#### 3. 環境配置
- **後端環境變數**: `DEPLOY_ENV=staging`
- **前端環境變數**: 由 `deploy.sh` 自動更新至 `frontend/.env.staging`
- **資料庫隔離**: 使用 `staging_*` collection 前綴（例：`staging_daily_challenge`）

---

### 🔄 完整開發流程

```bash
# 開發新功能
git checkout -b feature/new-feature

# 本地測試
cd frontend && npm run dev

# 部署到 staging 測試
cd ../backend && ./deploy.sh staging
cd ../frontend && ./deploy.sh staging

# 在 staging URL 驗證功能
# https://staging--geopingkak.web.app

# 測試通過後 merge 到 main，CI/CD 自動部署 production
git checkout main
git merge feature/new-feature
git push origin main
```

---

## 📁 專案結構

```
GeoPingKak/
├── .github/workflows/
│   └── deploy-production.yml         # CI/CD：push main 自動部署
│
├── backend/                          # Flask API (Cloud Run)
│   ├── app.py                        # Flask 入口，初始化 Firestore
│   ├── auth.py                       # 共用認證工具（Bearer token 驗證）
│   ├── config.py                     # 環境配置管理（staging/production 隔離）
│   ├── deploy.sh                     # Staging 部署腳本
│   ├── routes/
│   │   ├── daily_challenge_reader.py
│   │   ├── daily_challenge_writer.py
│   │   ├── geoguessr_map_routes.py
│   │   ├── special_map_routes.py
│   │   └── video_explanation_routes.py
│   ├── services/
│   │   └── geoguessr_challenge.py
│   └── scripts/
│       └── copy_to_staging.py        # Staging 資料複製
│
├── frontend/                         # Next.js App (Firebase Hosting)
│   ├── app/
│   │   ├── layout.tsx                # 根佈局 (QueryProvider + RootShell)
│   │   ├── page.tsx                  # 首頁
│   │   ├── globals.css
│   │   ├── about/                    # 關於管理者
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
│   │   ├── SocialLinks.tsx           # 社群連結元件
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
│   │   └── glossary.ts               # 靜態名詞解釋資料
│   │
│   ├── hooks/
│   │   ├── useDailyChallengeData.ts  # 每日挑戰 API
│   │   ├── useSpecialMapData.ts      # 特殊地圖 API
│   │   └── useVideoExplanations.ts   # 影片說明 API
│   │
│   └── types/
│       └── map-entry.ts
│
└── README.md
```

> 完整目錄結構請參考 [CLAUDE.md](./CLAUDE.md)

---
