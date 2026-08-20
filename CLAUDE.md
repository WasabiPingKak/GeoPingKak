# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GeoGuessr 繁體中文資源站。Next.js 16 + Flask + Firestore，前端 Firebase Hosting、後端 Cloud Run。

## Directory Structure

```
GeoPingKak/
├── .pre-commit-config.yaml           # Pre-commit hooks（Ruff + mypy + ESLint）
├── backend/                          # Flask API (Cloud Run)
│   ├── app.py                        # Flask 入口，初始化 Firestore，全域 error handler，structured logging + request ID
│   ├── config.py                     # 環境配置管理（staging/production）
│   ├── auth.py                       # 共用認證工具（Bearer token 驗證）
│   ├── validators.py                 # 共用驗證工具（日期、YouTube URL、GeoGuessr URL）
│   ├── deploy.sh                     # Staging 部署腳本（Production 由 CI/CD 處理）
│   ├── openapi.yaml                  # OpenAPI 3.0 spec（Swagger UI 用）
│   ├── mypy.ini                      # mypy 型別檢查設定
│   ├── ruff.toml                     # Ruff linter 設定
│   ├── Dockerfile
│   ├── requirements.txt              # Production dependencies (Docker image)
│   ├── requirements-dev.txt           # Dev dependencies (mypy, type stubs — CI only)
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
├── firebase.json                     # Firestore Emulator 設定（port 8080）
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
│   │   ├── about/
│   │   │   └── page.tsx
│   │   ├── assistant/                # GeoGuessr 問答助手
│   │   │   ├── page.tsx
│   │   │   └── client.tsx
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
│   │   └── tutorial/                 # /tutorial 本身由 next.config.ts 308 轉址到 /tutorial/intro
│   │       ├── layout.tsx
│   │       └── {intro,street-coverage,flags-domains,driving-side,sun-position,license-plates}/
│   │           ├── page.tsx
│   │           ├── client.tsx
│   │           └── metadata.ts
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
│   │   │   ├── JsonLd.tsx            # JSON-LD 結構化資料 inline 輸出
│   │   │   ├── MapLinkCard.tsx
│   │   │   └── WarningCard.tsx
│   │   ├── community-maps/
│   │   │   ├── CommunityMapList.tsx
│   │   │   └── RecommendedMapIntro.tsx
│   │   ├── daily-challenge/
│   │   │   ├── CasualGuessrPromo.tsx # CasualGuessr 導流卡
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
│   │   ├── glossary.ts               # 名詞解釋資料
│   │   └── pageDates.ts              # 各頁最後更新日期（metadata 與 sitemap 共用）
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
├── bot/                              # Discord Notification Bot (Cloud Run Job)
│   ├── main.py                       # 進入點：呼叫 API → 發 Discord Webhook
│   ├── config.py                     # 環境變數 & 地圖 metadata
│   ├── requirements.txt
│   ├── Dockerfile
│   ├── deploy.sh                     # Cloud Run Job 部署腳本
│   └── .env.example
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
mypy .                    # Run mypy type checker
pytest tests/ -v          # Run all backend tests (integration tests auto-skip without emulator)
```

### Firestore Emulator Integration Tests

Integration tests require the Firestore Emulator (Java 11+ required):

```bash
# Start emulator (from project root)
firebase emulators:start --only firestore --project demo-geopingkak

# Run integration tests only (in another terminal)
cd backend
pytest tests/integration/ -v

# Run all tests (unit + integration)
pytest tests/ -v
```

Integration tests auto-skip when the emulator is not running, so CI and `pytest tests/` always pass.

### Pre-commit Hooks

The project uses [pre-commit](https://pre-commit.com/) framework (`.pre-commit-config.yaml`):
- **Ruff**: Lints + formats `backend/` Python files (E/F/W/I rules + ruff-format)
- **mypy**: Static type checking for `backend/` Python files (config: `backend/mypy.ini`)
- **ESLint**: Lints `frontend/` JS/TS files

Global git hooks (`~/.git-hooks/pre-commit`) chain: `.env` file protection → pre-commit framework.

```bash
pip install pre-commit    # First-time setup (already chained via global hooks)
pre-commit run --all-files  # Manual full check
```

### Deployment

The project supports two environments: **Staging** and **Production**.

#### CI/CD Architecture

CI 和 CD 採用分層信任模型：staging 負責完整檢查，production 信任 staging 已驗證。

#### Staging Deployment (CI/CD)

Staging is deployed automatically via GitHub Actions when pushing to `develop` branch.
- **Workflow**: `.github/workflows/deploy-staging.yml`
- **Triggers**: `push` to `develop` (quality check + deploy), `pull_request` to `develop` (quality check only)
- **Process**: Quality check (Ruff + mypy + pytest with coverage + ESLint + tsc) → Deploy Cloud Run backend + Firebase Hosting staging channel (parallel)
- **Quality gate**: `quality-check` job must pass before either deploy job starts; deploy jobs only run on `push` events
- **PR coverage comment**: PR 會自動產生 coverage 表格（MishaKav/pytest-coverage-comment）
- **Coverage badge**: Push to `develop` 時自動更新 Gist badge（schneegans/dynamic-badges-action）
- **Frontend**: Deployed to Firebase Hosting channel `staging` (expires 30d)
- **No GA tracking** in staging environment
- **`cancel-in-progress: true`** — 新的 push 會取消正在跑的 staging deploy

#### Production Deployment (CI/CD)

Production is deployed automatically via GitHub Actions when pushing to `main` branch.
- **Workflow**: `.github/workflows/deploy-production.yml`
- **Triggers**: `push` to `main` only
- **Process**: Deploy Cloud Run backend + Firebase Hosting frontend (parallel, no quality check)
- **No quality gate**: Trusts that staging CI has already verified the code
- **Environment variables**: Injected via workflow `env:` (not from local `.env` files)

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
- `data/` - Static data files (glossary, per-page last-modified dates)

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
- **sitemap.ts**: Auto-generates sitemap.xml. `lastModified` is read from `data/pageDates.ts` (the same source as each page's `article:modified_time`), so bump that file when page content changes. `/tutorial` is not listed because `next.config.ts` 308-redirects it to `/tutorial/intro`
- **robots.ts**: Configures crawling rules, disallows `/show-proposals` (internal use)
- **`/assistant` is `noindex`** and not in the sitemap: it is an unlinked experimental feature backed by a paid LLM endpoint. `/quick-reference` (index page) is also left out of the sitemap until it has real content
- **Metadata Pattern**: Pages use separate `metadata.ts` files for SEO metadata (title, description, OG, Twitter Card, canonical URL)
- **Server/Client Split**: Pages requiring client-side state (hooks) are split into:
  - `page.tsx` (Server Component) - exports metadata, renders JSON-LD schema
  - `client.tsx` (Client Component) - contains interactive logic
  - `metadata.ts` - metadata configuration
- **JSON-LD Structured Data**: always rendered through `components/shared/JsonLd.tsx` (an inline `<script>` in a Server Component, so it is present in the initial HTML). Do not use `next/script` for JSON-LD — it injects after hydration and crawlers that read raw HTML never see it
  - Root layout: WebSite schema
  - `/tutorial/*`: Article + BreadcrumbList per page
  - `/special-maps`: ItemList schema
  - `/glossary`: DefinedTermSet schema
  - `/qna`: FAQPage schema
- **All pages have canonical URLs** to prevent duplicate content issues

### Backend (`backend/`)

- **Framework**: Flask with CORS enabled
- **Database**: Firebase Firestore
- **Hosting**: Google Cloud Run

**Core modules**:
- `app.py` - Flask application entry point, initializes Firestore client, structured JSON logging with request ID (RequestIDFilter auto-injects from Flask g, JSONFormatter forwards extra fields to JSON output), Cache-Control headers, HTTPException/429 error handler, Swagger UI (`/api/docs/`)
- `openapi.yaml` - OpenAPI 3.0 spec, served at `/api/openapi.yaml`
- `utils/rate_limiter.py` - Rate Limiter module, storage backend configurable via `RATE_LIMIT_STORAGE_URL` env var (default `memory://`, switchable to Redis). Global default 60/min, write endpoints 10/min
- `config.py` - Environment configuration management, provides `get_collection_name()` helper
- `auth.py` - Shared authentication utilities, provides `verify_bearer_token()` with constant-time comparison
- `validators.py` - Shared validation utilities (`validate_date`, `validate_youtube_url`, `validate_geoguessr_url`)

**Service modules** (`services/`):
- `geoguessr_challenge.py` - GeoGuessr API client with retry/exponential backoff (tenacity). Auto-retries on ConnectionError/Timeout up to 3 attempts. Returns `ChallengeResult` dataclass with typed `ChallengeFailure` enum (timeout, connection_error, http_4xx, http_5xx, invalid_json, missing_token). Structured log fields: event, outcome, map_id, status_code, retry_count

**Repository modules** (`repositories/`):
- `daily_challenge_repo.py` - `DailyChallengeRepo`: `read_month`, `list_months`, `read_day_entries`, `write_day_entries`, `lookup_challenge_url`
- `special_map_repo.py` - `SpecialMapRepo`: `get_document`, `save_entries`
- `video_explanation_repo.py` - `VideoExplanationRepo`: `get_all`, `save`

**Route modules** (`routes/`):
- `daily_challenge_reader.py` / `daily_challenge_writer.py` - Daily challenge CRUD. Writer returns 502 UPSTREAM_FAILURE when all maps fail, 200 partial with failed_maps on mixed results
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
- `test_geoguessr_challenge.py` - Unit tests for GeoGuessr API service (success, retry/backoff, failure paths)
- `test_validators.py` - Unit tests for shared validators (date, YouTube URL, GeoGuessr URL)
- `test_routes_ping.py` - Route tests for /ping and global error handlers (404/405/500)
- `test_routes_daily_challenge_reader.py` - Route tests for GET /api/daily-challenge (mock Firestore)
- `test_routes_daily_challenge_writer.py` - Route tests for POST /api/admin/update-daily-challenge (mock Firestore)
- `test_routes_special_map.py` - Route tests for /api/special-map GET + POST (mock Firestore)
- `test_routes_video_explanation.py` - Route tests for /api/video-explanations GET + POST (mock Firestore)
- `test_repo_daily_challenge.py` - Unit tests for DailyChallengeRepo (list/read/write/lookup)
- `test_repo_special_map.py` - Unit tests for SpecialMapRepo (get/save)
- `test_repo_video_explanation.py` - Unit tests for VideoExplanationRepo (get_all/save)

**Integration tests** (`tests/integration/`) — require Firestore Emulator, auto-skip when unavailable:
- `conftest.py` - Emulator connection, per-test data cleanup, Flask client + repo fixtures
- `test_daily_challenge_repo.py` - DailyChallengeRepo against real Firestore (CRUD, merge, list_documents, lookup)
- `test_special_map_repo.py` - SpecialMapRepo against real Firestore (CRUD, merge semantics)
- `test_video_explanation_repo.py` - VideoExplanationRepo against real Firestore (CRUD, stream, merge)
- `test_routes_daily_challenge_reader.py` - GET routes with real Firestore data
- `test_routes_daily_challenge_writer.py` - POST write flow with real Firestore (GeoGuessr API still mocked)
- `test_routes_special_map.py` - GET/POST with real Firestore (duplicate detection)
- `test_routes_video_explanation.py` - GET/POST with real Firestore (cross-collection challengeUrl lookup)

### Discord Bot (`bot/`)

- **Type**: Cloud Run Job（執行完即結束，非長駐服務）
- **Trigger**: Cloud Scheduler 每天 3:10 AM (Asia/Taipei)
- **Function**: 呼叫後端 API 取得當天每日挑戰連結，透過 Discord Webhook 發送到三個頻道（世界、台灣、日本）
- **Dependencies**: `requests` only（不需要 discord.py，Webhook 原生支援 Embed）

**Key modules**:
- `main.py` - 進入點：fetch API → filter today → build embeds → post webhooks
- `config.py` - 環境變數驗證、地圖 metadata（同步自 `frontend/components/daily-challenge/mapTitles.ts`）、Webhook mapping

**Environment variables** (via Secret Manager):
- `API_BASE_URL` - 後端 API base URL
- `DISCORD_WEBHOOK_WORLD` / `DISCORD_WEBHOOK_TW` / `DISCORD_WEBHOOK_JP` - Discord Webhook URLs

### Data Flow

Frontend fetches data via React Query hooks → Backend Flask API → Firestore database
Discord Bot fetches data via Backend API → Discord Webhooks → Discord channels

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
