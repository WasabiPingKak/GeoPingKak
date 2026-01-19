# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GeoPingKak is a Chinese-language GeoGuessr resource website promoting the game for Taiwanese Vtuber 山葵冰角 (Wasabi Pingkak). The site provides daily challenges, tutorials, special maps, and community resources.

## Directory Structure

```
GeoPingKak/
├── backend/                          # Flask API (Cloud Run)
│   ├── app.py                        # Flask 入口，初始化 Firestore
│   ├── deploy.sh                     # Cloud Run 部署腳本
│   ├── Dockerfile
│   ├── requirements.txt
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
│   │   ├── glossary.ts               # 名詞解釋資料
│   │   └── videoExplanations.ts      # 影片說明資料
│   │
│   ├── hooks/
│   │   ├── useDailyChallengeData.ts  # 每日挑戰 API hook
│   │   └── useSpecialMapData.ts      # 特殊地圖 API hook
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
npm run dev          # Start Next.js dev server with Turbopack
npm run build        # Production build
npm run lint         # Run ESLint
```

### Deployment

- **Frontend**: `firebase deploy` (deploys to Firebase Hosting, region: asia-east1)
- **Backend**: Run `./deploy.sh` from the `backend/` directory (deploys to Cloud Run)

## Architecture

### Frontend (`frontend/`)

- **Framework**: Next.js 16 with App Router, React 19, TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack React Query for server state

**Key patterns**:
- `app/layout.tsx` - Root layout with QueryProvider wrapper and RootShell for responsive sidebar
- `components/layout/RootShell.tsx` - Client component handling responsive sidebar (mobile drawer vs desktop fixed)
- `components/QueryProvider.tsx` - React Query client provider
- `hooks/` - Custom hooks using `useQuery` for API data fetching (e.g., `useDailyChallengeData.ts`)
- `types/` - TypeScript interfaces for API responses
- `data/` - Static data files (glossary, video explanations)

**Environment variable**: `NEXT_PUBLIC_API_BASE` for API endpoint configuration

### Backend (`backend/`)

- **Framework**: Flask with CORS enabled
- **Database**: Firebase Firestore
- **Hosting**: Google Cloud Run

**Route modules** (`routes/`):
- `daily_challenge_reader.py` / `daily_challenge_writer.py` - Daily challenge CRUD
- `special_map_routes.py` - Special themed maps
- `geoguessr_map_routes.py` - GeoGuessr map integration

### Data Flow

Frontend fetches data via React Query hooks → Backend Flask API → Firestore database

## Language

The codebase uses:
- Traditional Chinese (zh-TW) for UI text and comments
- English for code identifiers and technical documentation
