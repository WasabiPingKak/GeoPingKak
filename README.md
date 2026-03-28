[![Deploy Production](https://github.com/WasabiPingKak/GeoPingKak/actions/workflows/deploy-production.yml/badge.svg)](https://github.com/WasabiPingKak/GeoPingKak/actions/workflows/deploy-production.yml)
[![Deploy Staging](https://github.com/WasabiPingKak/GeoPingKak/actions/workflows/deploy-staging.yml/badge.svg?branch=develop)](https://github.com/WasabiPingKak/GeoPingKak/actions/workflows/deploy-staging.yml)
[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/WasabiPingKak/GeoPingKak)

# GeoPingKak

GeoGuessr 繁體中文攻略與教學資源站。GeoGuessr 轉為全訂閱制後，新手進入門檻大幅提高，本站透過自動化整理每日免費練習題庫與教學資源，降低非付費玩家的入門障礙。

**[geopingkak.web.app](https://geopingkak.web.app/)**

## 功能特色

- **每日挑戰** — 自動整理免費練習題，支援按月份瀏覽
- **新手教學** — 行駛方向、國旗與網域、車牌、街景覆蓋、語言辨識、太陽方位等攻略
- **特殊地圖** — 依主題分類的精選地圖合集
- **速查筆記** — 各國專屬速查表（巴西、印尼等）
- **名詞解釋** — GeoGuessr 專有名詞的繁體中文說明
- **影片說明** — 每日挑戰的影片解說連結
- **SEO 優化** — SSR、JSON-LD 結構化資料、Sitemap、Canonical URL

## Tech Stack

| Layer    | Technology                                                  |
| -------- | ----------------------------------------------------------- |
| Frontend | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS |
| Backend  | Python Flask, Gunicorn                                      |
| Database | Firebase Firestore                                          |
| Hosting  | Google Cloud Run (backend), Firebase Hosting (frontend)     |
| CI/CD    | GitHub Actions                                              |
| Linting  | ESLint (frontend), Ruff (backend)                           |
| Testing  | pytest (backend)                                            |

## 架構

```
Browser --> Firebase Hosting (Next.js)
                |
                | React Query
                v
           Cloud Run (Flask API)
                |
                v
           Firestore
                |
                v
           GeoGuessr API
```

- Server Components 負責 metadata 與 JSON-LD；Client Components 負責互動邏輯
- Staging / Production 環境透過 Firestore collection prefix 完全隔離
- 寫入端點使用 Bearer token 認證保護

## 快速開始

### 前置需求

- [Node.js](https://nodejs.org/) >= 18
- [Python](https://www.python.org/) >= 3.11
- [Google Cloud SDK](https://cloud.google.com/sdk)（存取 Firestore 用）
- [Firebase CLI](https://firebase.google.com/docs/cli)（前端部署用）
- 已啟用 Firestore 的 GCP 專案

### 安裝

1. **Clone 專案**

   ```bash
   git clone https://github.com/WasabiPingKak/GeoPingKak.git
   cd GeoPingKak
   ```

2. **後端**

   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   cp .env.example .env      # 填入你的環境變數
   ```

3. **前端**

   ```bash
   cd frontend
   npm install
   cp .env.example .env.staging  # 填入後端 API URL
   ```

4. **GCP 認證**

   ```bash
   gcloud auth application-default login
   gcloud config set project <your-gcp-project>
   ```

### 本地開發

```bash
# 後端（在 backend/ 目錄下）
flask run

# 前端（在 frontend/ 目錄下）
npm run dev
```

前端開發伺服器啟動於 `http://localhost:3000`，使用 Turbopack。

### 測試與 Lint

```bash
# 後端測試
cd backend
pytest tests/ -v

# Lint
cd backend && ruff check .
cd frontend && npm run lint
```

## 部署

| 環境       | 觸發方式          | URL                                                                 |
| ---------- | ----------------- | ------------------------------------------------------------------- |
| Production | Push 到 `main`    | [geopingkak.web.app](https://geopingkak.web.app/)                   |
| Staging    | Push 到 `develop` | [staging--geopingkak.web.app](https://staging--geopingkak.web.app/) |

兩個環境皆透過 GitHub Actions 自動部署。CI pipeline 會先跑品質檢查（Ruff、pytest、ESLint、tsc），通過後才平行部署前後端。

手動部署腳本（`deploy.sh --staging`）作為備援方案仍可使用。

## 專案結構

```
GeoPingKak/
├── .github/workflows/        # CI/CD pipeline
├── backend/
│   ├── app.py                # Flask 入口
│   ├── config.py             # 環境設定與 collection 隔離
│   ├── auth.py               # 認證工具
│   ├── validators.py         # 輸入驗證
│   ├── routes/               # API 路由
│   ├── services/             # 外部 API 串接
│   ├── utils/                # Rate limiter 等工具
│   ├── scripts/              # 資料遷移腳本
│   └── tests/                # pytest 測試
├── frontend/
│   ├── app/                  # Next.js 頁面（SSR + Client 分離）
│   ├── components/           # React 元件
│   ├── hooks/                # React Query 資料取得
│   ├── types/                # TypeScript 型別定義
│   ├── data/                 # 靜態資料
│   └── public/               # 靜態資源
└── README.md
```
