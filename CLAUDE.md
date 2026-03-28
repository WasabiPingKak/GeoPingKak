# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GeoPingKak is a Chinese-language GeoGuessr resource website promoting the game for Taiwanese Vtuber 山葵冰角 (Wasabi Pingkak). The site provides daily challenges, tutorials, special maps, and community resources.

## Directory Structure

```
GeoPingKak/
├── .pre-commit-config.yaml           # Pre-commit hooks（Ruff + ESLint）
├── backend/                          # Flask API (Cloud Run)
│   ├── app.py                        # Flask 入口，初始化 Firestore，全域 error handler，structured logging + request ID
│   ├── config.py                     # 環境配置管理（staging/production）
│   ├── auth.py                       # 共用認證工具（Bearer token 驗證）
│   ├── validators.py                 # 共用驗證工具（日期、YouTube URL、GeoGuessr URL）
│   ├── deploy.sh                     # Staging 部署腳本（Production 由 CI/CD 處理）
│   ├── ruff.toml                     # Ruff linter 設定
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── routes/
│   │   ├── daily_challenge_reader.py
│   │   ├── daily_challenge_writer.py
│   │   ├── special_map_routes.py
│   │   └── video_explanation_routes.py # 影片說明 API
│   ├── repositories/
│   │   ├── daily_challenge_repo.py   # 每日挑戰 Firestore 存取
│   │   ├── special_map_repo.py       # 特殊地圖 Firestore 存取
│   │   └── video_explanation_repo.py # 影片說明 Firestore 存取
│   ├── services/
│   │   └── geoguessr_challenge.py
│   ├── utils/
│   │   └── rate_limiter.py             # Rate Limiter 模組（storage 可透過 env-var 切換 Redis）
│   └── scripts/
│       ├── copy_to_staging.py        # Firestore 資料複製腳本
│       ├── migrate_map_ids.py        # mapId 命名遷移腳本
│       ├── migrate_special_map_fields.py # 特殊地圖欄位名遷移腳本
│       └── migrate_video_challenge_urls.py # 影片資料補 challengeUrl 遷移腳本
│
├── frontend/                         # Next.js App (Firebase Hosting)
│   ├── .env.staging                  # Staging 環境變數
│   ├── .env.production               # Production 環境變數（本地 build 用，CI/CD 由 workflow 注入）
│   ├── deploy.sh                     # Staging 部署腳本（Production 由 CI/CD 處理）
│   ├── app/
│   │   ├── layout.tsx                # 根佈局 (QueryProvider + RootShell)
│   │   ├── icon.png                  # 網站 favicon（自動識別）
│   │   ├── page.tsx                  # 首頁
│   │   ├── sitemap.ts                # 動態 sitemap 生成
│   │   ├── robots.ts                 # robots.txt 生成
│   │   ├── globals.css
│   │   ├── community-maps/
│   │   │   └── page.tsx
│   │   ├── daily-challenge/
│   │   │   ├── page.tsx
│   │   │   ├── client.tsx
│   │   │   └── metadata.ts
│   │   ├── glossary/
│   │   │   ├── page.tsx
│   │   │   ├── client.tsx
│   │   │   ├── GlossaryCard.tsx
│   │   │   └── MarkdownRenderer.tsx
│   │   ├── qna/
│   │   │   └── page.tsx
│   │   ├── quick-reference/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx              # 速查筆記索引頁
│   │   │   ├── br/page.tsx
│   │   │   └── id/page.tsx
│   │   ├── recommend_settings/
│   │   │   └── page.tsx
│   │   ├── show-proposals/
│   │   │   └── page.tsx
│   │   ├── source/
│   │   │   └── page.tsx
│   │   ├── special-maps/
│   │   │   ├── page.tsx
│   │   │   ├── client.tsx
│   │   │   └── metadata.ts
│   │   └── tutorial/
│   │       ├── page.tsx
│   │       ├── client.tsx
│   │       └── metadata.ts
│   │
│   ├── components/
│   │   ├── QueryProvider.tsx         # React Query Provider
│   │   ├── SidebarMenu.tsx           # 側邊欄導覽
│   │   ├── QuickReferenceTabs.tsx
│   │   ├── common/
│   │   │   └── MobileSidebarDrawer.tsx
│   │   ├── layout/
│   │   │   └── RootShell.tsx         # 響應式 Sidebar 控制
│   │   ├── shared/                   # 共用元件
│   │   │   ├── CommonMapCard.tsx
│   │   │   ├── CommonMapList.tsx
│   │   │   ├── CommonTabs.tsx
│   │   │   ├── MapLinkCard.tsx
│   │   │   └── WarningCard.tsx
│   │   ├── community-maps/
│   │   │   ├── CommunityMapList.tsx
│   │   │   └── RecommendedMapIntro.tsx
│   │   ├── daily-challenge/
│   │   │   ├── ChallengeDescription.tsx
│   │   │   └── mapTitles.ts
│   │   ├── proposals/
│   │   │   ├── EntertainmentProposalTab.tsx
│   │   │   └── RecreationalProposalTab.tsx
│   │   ├── special-maps/
│   │   │   ├── SpecialCategoryDescription.tsx
│   │   │   ├── SpecialMapCard.tsx
│   │   │   ├── SpecialMapList.tsx
│   │   │   └── specialMapTitles.ts
│   │   └── tutorial/
│   │       ├── TabIntro.tsx
│   │       ├── TabDrivingSide.tsx
│   │       ├── TabFlagDomain.tsx
│   │       ├── TabLanguages.tsx
│   │       ├── TabLicensePlates.tsx
│   │       ├── TabStreetCoverage.tsx
│   │       ├── TabSunPosition.tsx
│   │       ├── coverage/             # 各洲覆蓋區塊
│   │       │   ├── CoverageRegionCard.tsx
│   │       │   ├── AfricaCoverageBlock.tsx
│   │       │   ├── AsiaCoverageBlock.tsx
│   │       │   ├── EuropeCoverageBlock.tsx
│   │       │   ├── NorthAmericaCoverageBlock.tsx
│   │       │   ├── SouthAmericaCoverageBlock.tsx
│   │       │   ├── OceaniaCoverageBlock.tsx
│   │       │   └── CaribbeanCoverageBlock.tsx
│   │       ├── flags/
│   │       │   └── FlagLovingGridByContinent.tsx
│   │       └── plate/                # 車牌資料與元件
│   │           ├── PlateBlock.tsx
│   │           ├── EuroPlateSection.tsx
│   │           ├── ReferenceSources.tsx
│   │           ├── plateData.ts
│   │           ├── plateEuroPlates.ts
│   │           ├── plateAsiaPlates.ts
│   │           ├── plateAmericaPlates.ts
│   │           ├── plateAfricaPlates.ts
│   │           └── referenceData.ts
│   │
│   ├── data/
│   │   └── glossary.ts               # 名詞解釋資料
│   │
│   ├── hooks/
│   │   ├── useDailyChallengeData.ts  # 每日挑戰 API hook
│   │   ├── useSpecialMapData.ts      # 特殊地圖 API hook
│   │   └── useVideoExplanations.ts   # 影片說明 API hook
│   │
│   ├── types/
│   │   └── map-entry.ts              # TypeScript 型別定義
│   │
│   ├── public/
│   │   ├── logo.png                  # 網站 Logo（用於側邊欄）
│   │   ├── og-image.png              # Open Graph 預覽圖
│   │   └── data/
│   │       └── countries.json
│   │
│   ├── firebase.json
│   ├── next.config.ts
│   ├── tsconfig.json
│   └── package.json
│
└── README.md
```

## Development Commands

All frontend commands run from the `frontend/` directory:

```bash
cd frontend
npm run dev               # Start Next.js dev server with Turbopack
npm run build:staging     # Build with staging environment variables
npm run lint              # Run ESLint
```

Backend commands run from the `backend/` directory:

```bash
cd backend
ruff check .              # Run Ruff linter
pytest tests/ -v          # Run all backend tests
```

### Pre-commit Hooks

The project uses [pre-commit](https://pre-commit.com/) framework (`.pre-commit-config.yaml`):
- **Ruff**: Lints `backend/` Python files (E/F/W/I rules)
- **ESLint**: Lints `frontend/` JS/TS files

Global git hooks (`~/.git-hooks/pre-commit`) chain: `.env` file protection → pre-commit framework.

```bash
pip install pre-commit    # First-time setup (already chained via global hooks)
pre-commit run --all-files  # Manual full check
```

### Deployment

The project supports two environments: **Staging** and **Production**.

#### Production Deployment (CI/CD)

Production is deployed automatically via GitHub Actions when pushing to `main` branch.
- **Workflow**: `.github/workflows/deploy-production.yml`
- **Process**: Quality check (Ruff + pytest + ESLint + tsc) → Deploy Cloud Run backend + Firebase Hosting frontend (parallel)
- **Quality gate**: `quality-check` job must pass before either deploy job starts
- **Environment variables**: Injected via workflow `env:` (not from local `.env` files)

#### Staging Deployment (CI/CD)

Staging is deployed automatically via GitHub Actions when pushing to `develop` branch.
- **Workflow**: `.github/workflows/deploy-staging.yml`
- **Process**: Same quality check → Deploy Cloud Run backend (staging) + Firebase Hosting staging channel (parallel)
- **Frontend**: Deployed to Firebase Hosting channel `staging` (expires 30d)
- **No GA tracking** in staging environment
- **`cancel-in-progress: true`** — 新的 push 會取消正在跑的 staging deploy

#### Staging Deployment (Manual fallback)
```bash
cd backend
./deploy.sh --staging      # Deploy to geopingkak-backend-staging (auto-updates frontend/.env.staging)

cd ../frontend
./deploy.sh --staging      # Deploy to Firebase Hosting Channel (staging--geopingkak.web.app)
```

## Environment Configuration

The project maintains two isolated environments for safe development and deployment:

### Environment Comparison

| Aspect | Production | Staging |
|--------|-----------|---------|
| **Backend Service** | `geopingkak-backend` | `geopingkak-backend-staging` |
| **Frontend URL** | `geopingkak.web.app` | `staging--geopingkak.web.app` |
| **Environment Variable** | `DEPLOY_ENV=production` | `DEPLOY_ENV=staging` |
| **Firestore Collections** | Original names | Prefixed with `staging_` |
| **Purpose** | Live production site | Testing and validation |

### Firestore Collection Isolation

Collections are automatically prefixed based on the `DEPLOY_ENV` environment variable:

| Production | Staging |
|-----------|---------|
| `daily_challenge` | `staging_daily_challenge` |
| `special_maps` | `staging_special_maps` |
| `video_explanations` | `staging_video_explanations` |

This is handled by `backend/config.py`:
```python
def get_collection_name(base_name: str) -> str:
    if DEPLOY_ENV == "staging":
        return f"staging_{base_name}"
    return base_name
```

### Initial Staging Setup

For first-time staging environment setup:

```bash
# 1. Copy production data to staging collections
cd backend
gcloud auth application-default login
gcloud config set project geopingkak
python scripts/copy_to_staging.py

# 2. Deploy backend to staging
./deploy.sh --staging

# 3. Deploy frontend to staging
cd ../frontend
./deploy.sh --staging
```

## Architecture

### Frontend (`frontend/`)

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query for server state

**Key patterns**:
- `app/layout.tsx` - Root layout with QueryProvider wrapper and RootShell for responsive sidebar
- `app/icon.png` - Favicon automatically recognized by Next.js (displays in browser tabs and search results)
- `components/layout/RootShell.tsx` - Client component handling responsive sidebar (mobile drawer vs desktop fixed)
- `components/SidebarMenu.tsx` - Sidebar navigation with logo display at the top
- `components/QueryProvider.tsx` - React Query client provider
- `hooks/` - Custom hooks for API data fetching (`useDailyChallengeData.ts` uses `useInfiniteQuery` for paginated loading, `useVideoExplanations.ts` uses `useQuery`)
- `types/` - TypeScript interfaces for API responses
- `data/` - Static data files (glossary)

**Branding Assets**:
- `public/logo.png` - Main website logo (GeoPingKak duck icon), displayed in sidebar header
- `app/icon.png` - Favicon version (same image, auto-detected by Next.js for browser tabs)
- Logo features the iconic duck character representing the brand identity

**Environment variables**:
- `NEXT_PUBLIC_API_BASE` - Backend API endpoint URL
- `NEXT_PUBLIC_GA_ID` - Google Analytics tracking ID (only set in production)
- **Production**: Injected via GitHub Actions workflow `env:` at build time
- **Staging**: Read from `.env.staging` (auto-updated by backend `deploy.sh`); no GA tracking
- Build process uses `.env.production.local` (temporary, git-ignored) to override during staging builds

**SEO Optimization**:
- **sitemap.ts**: Auto-generates sitemap.xml with all pages, daily updates for `/daily-challenge`
- **robots.ts**: Configures crawling rules, disallows `/show-proposals` (internal use)
- **Metadata Pattern**: Pages use separate `metadata.ts` files for SEO metadata (title, description, OG, Twitter Card, canonical URL)
- **Server/Client Split**: Pages requiring client-side state (hooks) are split into:
  - `page.tsx` (Server Component) - exports metadata, renders JSON-LD schema
  - `client.tsx` (Client Component) - contains interactive logic
  - `metadata.ts` - metadata configuration
- **JSON-LD Structured Data**:
  - Root layout: WebSite schema
  - `/tutorial`: HowTo schema (6 steps)
  - `/special-maps`: ItemList schema
  - `/glossary`: DefinedTermSet schema
  - `/qna`: FAQPage schema
- **All pages have canonical URLs** to prevent duplicate content issues
- **Refer to `SEO_OPTIMIZATION_PRD.md`** for complete SEO strategy and keyword targeting

### Backend (`backend/`)

- **Framework**: Flask with CORS enabled
- **Database**: Firebase Firestore
- **Hosting**: Google Cloud Run

**Core modules**:
- `app.py` - Flask application entry point, initializes Firestore client, structured JSON logging with request ID, Cache-Control headers, HTTPException/429 error handler
- `utils/rate_limiter.py` - Rate Limiter module, storage backend configurable via `RATE_LIMIT_STORAGE_URL` env var (default `memory://`, switchable to Redis). Global default 60/min, write endpoints 10/min
- `config.py` - Environment configuration management, provides `get_collection_name()` helper
- `auth.py` - Shared authentication utilities, provides `verify_bearer_token()` with constant-time comparison
- `validators.py` - Shared validation utilities (`validate_date`, `validate_youtube_url`, `validate_geoguessr_url`)

**Repository modules** (`repositories/`):
- `daily_challenge_repo.py` - `DailyChallengeRepo`: `read_month`, `list_months`, `read_day_entries`, `write_day_entries`, `lookup_challenge_url`
- `special_map_repo.py` - `SpecialMapRepo`: `get_document`, `save_entries`
- `video_explanation_repo.py` - `VideoExplanationRepo`: `get_all`, `save`

**Route modules** (`routes/`):
- `daily_challenge_reader.py` / `daily_challenge_writer.py` - Daily challenge CRUD
  - GET `/api/daily-challenge/months` - 回傳所有已存在的月份 ID 列表（降冪排序）
  - GET `/api/daily-challenge` - 按月份分批載入，預設回傳當月+上月
  - GET `/api/daily-challenge?month=YYYY-MM` - 指定月份載入
- `special_map_routes.py` - Special themed maps
- `video_explanation_routes.py` - Video explanations API with Bearer token authentication
  - GET `/api/video-explanations` - 公開端點，取得所有日期的影片資料（含 challengeUrl）
  - POST `/api/video-explanations` - 受保護端點（Bearer Token），部分更新影片資料
    - 空白欄位會被自動忽略，不影響現有資料
    - 使用 Firestore merge 模式，只更新有提供的地圖
    - 自動從 daily_challenge 查找並存入 challengeUrl，找不到則回傳 404
    - 驗證日期格式、地圖 ID 白名單、YouTube URL 格式

**Architecture**: Routes handle HTTP concerns (validation, response formatting) and delegate data access to repository classes. Repositories encapsulate all Firestore operations and use `get_collection_name()` from `config.py` for environment-aware collection access.

**Scripts** (`scripts/`):
- `copy_to_staging.py` - Copy production Firestore data to staging collections
- `migrate_map_ids.py` - Rename daily challenge / video explanation mapId values
- `migrate_special_map_fields.py` - Rename special_maps Firestore field names
- `migrate_video_challenge_urls.py` - Backfill challengeUrl into video_explanations from daily_challenge

**Tests** (`tests/`):
- `conftest.py` - Shared fixtures (Flask test client, mock Firestore)
- `test_auth.py` - Unit tests for auth utilities (Bearer token extraction and verification)
- `test_geoguessr_challenge.py` - Unit tests for GeoGuessr API service (success + failure paths)
- `test_validators.py` - Unit tests for shared validators (date, YouTube URL, GeoGuessr URL)
- `test_routes_ping.py` - Integration tests for /ping and global error handlers (404/405/500)
- `test_routes_daily_challenge_reader.py` - Integration tests for GET /api/daily-challenge
- `test_routes_daily_challenge_writer.py` - Integration tests for POST /api/admin/update-daily-challenge
- `test_routes_special_map.py` - Integration tests for /api/special-map (GET + POST)
- `test_routes_video_explanation.py` - Integration tests for /api/video-explanations (GET + POST)

### Data Flow

Frontend fetches data via React Query hooks → Backend Flask API → Firestore database

## Language

The codebase uses:
- Traditional Chinese (zh-TW) for UI text and comments
- English for code identifiers and technical documentation

## Development Workflow

### Branch Strategy

- **`main`** — Production branch. Push triggers production CI/CD.
- **`develop`** — Staging integration branch. Push triggers staging CI/CD.
- **`feature/*`** — Feature branches, created from `develop`.

### Feature Development

Feature branch / worktree 規則見全域 `~/.claude/CLAUDE.md`。

```bash
# 1. 使用 EnterWorktree 從 develop 建立 feature branch

# 2. Develop locally
cd frontend
npm run dev

# 3. Merge to develop and push (CI/CD auto-deploys staging)
# 4. Test on staging: https://staging--geopingkak.web.app
# 5. If tests pass, merge develop to main (CI/CD auto-deploys production)
```

### Important Notes

- **Production deployment**: Push to `main` → GitHub Actions auto-deploys
- **Staging deployment**: Push to `develop` → GitHub Actions auto-deploys
- **Manual deploy scripts** (`deploy.sh --staging`) still available as fallback
- **Staging and production data are completely isolated** via Firestore collection prefixes
