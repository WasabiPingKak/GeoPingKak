# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GeoPingKak is a Chinese-language GeoGuessr resource website promoting the game for Taiwanese Vtuber 山葵冰角 (Wasabi Pingkak). The site provides daily challenges, tutorials, special maps, and community resources.

## Directory Structure

```
GeoPingKak/
├── backend/                          # Flask API (Cloud Run)
│   ├── app.py                        # Flask 入口，初始化 Firestore
│   ├── config.py                     # 環境配置管理（staging/production）
│   ├── auth.py                       # 共用認證工具（Bearer token 驗證）
│   ├── deploy.sh                     # Staging 部署腳本（Production 由 CI/CD 處理）
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── routes/
│   │   ├── daily_challenge_reader.py
│   │   ├── daily_challenge_writer.py
│   │   ├── special_map_routes.py
│   │   └── video_explanation_routes.py # 影片說明 API
│   ├── services/
│   │   └── geoguessr_challenge.py
│   └── scripts/
│       ├── copy_to_staging.py        # Firestore 資料複製腳本
│       ├── migrate_map_ids.py        # mapId 命名遷移腳本
│       ├── migrate_special_map_fields.py # 特殊地圖欄位名遷移腳本
│       └── migrate_video_data.py     # 影片資料遷移腳本
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

Backend tests run from the `backend/` directory:

```bash
cd backend
pytest tests/ -v          # Run all backend tests
```

Tests are also executed automatically in the CI/CD pipeline before deployment.

### Deployment

The project supports two environments: **Staging** and **Production**.

#### Production Deployment (CI/CD)

Production is deployed automatically via GitHub Actions when pushing to `main` branch.
- **Workflow**: `.github/workflows/deploy-production.yml`
- **Process**: Build Docker image → Deploy Cloud Run backend → Build and deploy Firebase Hosting frontend
- **Environment variables**: Injected via workflow `env:` (not from local `.env` files)

#### Staging Deployment (Manual)
```bash
cd backend
./deploy.sh staging      # Deploy to geopingkak-backend-staging (auto-updates frontend/.env.staging)

cd ../frontend
./deploy.sh staging      # Deploy to Firebase Hosting Channel (staging--geopingkak.web.app)
```

**Note**: Deploy scripts only support staging. Production must go through CI/CD.

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
./deploy.sh staging

# 3. Deploy frontend to staging
cd ../frontend
./deploy.sh staging
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
- `hooks/` - Custom hooks using `useQuery` for API data fetching (e.g., `useDailyChallengeData.ts`, `useVideoExplanations.ts`)
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
- `app.py` - Flask application entry point, initializes Firestore client
- `config.py` - Environment configuration management, provides `get_collection_name()` helper
- `auth.py` - Shared authentication utilities, provides `verify_bearer_token()` with constant-time comparison

**Route modules** (`routes/`):
- `daily_challenge_reader.py` / `daily_challenge_writer.py` - Daily challenge CRUD
- `special_map_routes.py` - Special themed maps
- `video_explanation_routes.py` - Video explanations API with Bearer token authentication
  - GET `/api/video-explanations` - 公開端點，取得所有日期的影片資料
  - POST `/api/video-explanations` - 受保護端點（Bearer Token），部分更新影片資料
    - 空白欄位會被自動忽略，不影響現有資料
    - 使用 Firestore merge 模式，只更新有提供的地圖
    - 驗證日期格式、地圖 ID 白名單、YouTube URL 格式

**All route modules import and use `get_collection_name()` from `config.py` to ensure environment-aware collection access.**

**Scripts** (`scripts/`):
- `copy_to_staging.py` - Copy production Firestore data to staging collections
- `migrate_map_ids.py` - Rename daily challenge / video explanation mapId values
- `migrate_special_map_fields.py` - Rename special_maps Firestore field names

**Tests** (`tests/`):
- `test_auth.py` - Unit tests for shared authentication utilities (Bearer token extraction and verification)

### Data Flow

Frontend fetches data via React Query hooks → Backend Flask API → Firestore database

## Language

The codebase uses:
- Traditional Chinese (zh-TW) for UI text and comments
- English for code identifiers and technical documentation

## Development Workflow

### Feature Development

```bash
# 1. Create feature branch
git checkout -b feature/new-feature

# 2. Develop locally
cd frontend
npm run dev

# 3. Deploy to staging for testing
cd ../backend
./deploy.sh staging

cd ../frontend
./deploy.sh staging

# 4. Test on staging URL
# Visit: https://staging--geopingkak.web.app

# 5. If tests pass, merge to main and push (CI/CD auto-deploys production)
git checkout main
git merge feature/new-feature
git push origin main
```

### Important Notes

- **Production deployment is fully automated** via GitHub Actions CI/CD (push to main)
- **Deploy scripts only support staging** - production must go through CI/CD
- **Backend staging deployment automatically updates frontend `.env.staging`** with the deployed service URL
- **Staging and production data are completely isolated** via Firestore collection prefixes
