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
│   ├── deploy.sh                     # Cloud Run 部署腳本（支援環境參數）
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── routes/
│   │   ├── daily_challenge_reader.py
│   │   ├── daily_challenge_writer.py
│   │   ├── geoguessr_map_routes.py
│   │   ├── special_map_routes.py
│   │   └── video_explanation_routes.py # 影片說明 API
│   ├── services/
│   │   └── geoguessr_challenge.py
│   └── scripts/
│       ├── copy_to_staging.py        # Firestore 資料複製腳本
│       └── migrate_video_data.py     # 影片資料遷移腳本
│
├── frontend/                         # Next.js App (Firebase Hosting)
│   ├── .env.staging                  # Staging 環境變數
│   ├── .env.production               # Production 環境變數
│   ├── deploy.sh                     # Firebase Hosting 部署腳本（支援環境參數）
│   ├── app/
│   │   ├── layout.tsx                # 根佈局 (QueryProvider + RootShell)
│   │   ├── page.tsx                  # 首頁
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
│   │   │   ├── br/page.tsx
│   │   │   └── id/page.tsx
│   │   ├── recommend_settings/
│   │   │   └── page.tsx
│   │   ├── show-proposals/
│   │   │   └── page.tsx
│   │   ├── source/
│   │   │   └── page.tsx
│   │   ├── special-maps/
│   │   │   └── page.tsx
│   │   └── tutorial/
│   │       └── page.tsx
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
npm run build:prod        # Build with production environment variables
npm run lint              # Run ESLint
```

### Deployment

The project supports two environments: **Staging** and **Production**. All deployment scripts require explicit environment parameter to prevent accidental deployments.

#### Backend Deployment
```bash
cd backend
./deploy.sh staging      # Deploy to geopingkak-backend-staging (auto-updates frontend/.env.staging)
./deploy.sh prod         # Deploy to geopingkak-backend (auto-updates frontend/.env.production)
```

#### Frontend Deployment
```bash
cd frontend
./deploy.sh staging      # Deploy to Firebase Hosting Channel (staging--geopingkak.web.app)
./deploy.sh prod         # Deploy to Firebase Hosting (geopingkak.web.app)
```

**Note**: Running `./deploy.sh` without parameters will show usage instructions.

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
| `geoguessr_map_index` | `staging_geoguessr_map_index` |
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
- `components/layout/RootShell.tsx` - Client component handling responsive sidebar (mobile drawer vs desktop fixed)
- `components/QueryProvider.tsx` - React Query client provider
- `hooks/` - Custom hooks using `useQuery` for API data fetching (e.g., `useDailyChallengeData.ts`, `useVideoExplanations.ts`)
- `types/` - TypeScript interfaces for API responses
- `data/` - Static data files (glossary)

**Environment variables**:
- `NEXT_PUBLIC_API_BASE` - Backend API endpoint URL
- Configured in `.env.staging` and `.env.production`
- Automatically updated by backend `deploy.sh` after Cloud Run deployment
- Build process uses `.env.production.local` (temporary, git-ignored) to override during staging builds

### Backend (`backend/`)

- **Framework**: Flask with CORS enabled
- **Database**: Firebase Firestore
- **Hosting**: Google Cloud Run

**Core modules**:
- `app.py` - Flask application entry point, initializes Firestore client
- `config.py` - Environment configuration management, provides `get_collection_name()` helper

**Route modules** (`routes/`):
- `daily_challenge_reader.py` / `daily_challenge_writer.py` - Daily challenge CRUD
- `special_map_routes.py` - Special themed maps
- `geoguessr_map_routes.py` - GeoGuessr map integration
- `video_explanation_routes.py` - Video explanations CRUD with Bearer token authentication

**All route modules import and use `get_collection_name()` from `config.py` to ensure environment-aware collection access.**

**Scripts** (`scripts/`):
- `copy_to_staging.py` - One-time data migration script for staging environment initialization
- `migrate_video_data.py` - Migrate video explanation data from static file to Firestore

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

# 5. If tests pass, merge to main
git checkout main
git merge feature/new-feature

# 6. Deploy to production
cd backend
./deploy.sh prod

cd ../frontend
./deploy.sh prod
```

### Important Notes

- **Always test in staging before deploying to production**
- **Deploy scripts require explicit environment parameter** - no defaults to prevent accidents
- **Backend deployment automatically updates frontend .env files** with the deployed service URL
- **Staging and production data are completely isolated** via Firestore collection prefixes
