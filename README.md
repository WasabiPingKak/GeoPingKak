[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/WasabiPingKak/GeoPingKak)

# GeoPingKak — GeoGuessr 台灣中文攻略與教學資源站

GeoGuessr 轉為全訂閱制後，新手進入門檻提高。本站透過自動化整理每日免費練習題庫與教學資源，降低非付費玩家的入門障礙。

上線八個月累積超過 9,400 名活躍使用者，Google 自然搜尋為最大流量來源。

👉 **[geopingkak.web.app](https://geopingkak.web.app/)**

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16 (App Router, SSR), React 19, TypeScript, Tailwind CSS |
| **Backend** | Python Flask, Gunicorn |
| **Database** | Firebase Firestore (NoSQL) |
| **Hosting** | Google Cloud Run (backend), Firebase Hosting (frontend) |
| **CI/CD** | GitHub Actions — push to `main` auto-deploys production |
| **Testing** | pytest |

## Architecture

```
Browser → Firebase Hosting (Next.js SSR)
              ↓ React Query
         Cloud Run (Flask API)
              ↓
         Firestore
              ↓
         GeoGuessr API (challenge generation)
```

- **SSR for SEO**: Server Components 處理 metadata 與 JSON-LD，Client Components 處理互動
- **環境隔離**: Staging / Production 透過 Firestore collection prefix 完全隔離
- **認證**: 寫入端點使用 Bearer token + constant-time comparison

## Development

```bash
# Frontend dev server
cd frontend
npm run dev

# Backend tests
cd backend
pytest tests/ -v
```

### Deployment

- **Production**: 自動化 — push 到 `main` 觸發 GitHub Actions
- **Staging**: 手動 — `./deploy.sh staging`（前後端各自執行）

環境變數範例見 `backend/.env.example` 和 `frontend/.env.example`。

## Project Structure

```
GeoPingKak/
├── .github/workflows/
│   └── deploy-production.yml       # CI/CD pipeline
├── backend/                        # Flask API (Cloud Run)
│   ├── app.py                      # Entry point
│   ├── auth.py                     # Shared auth utilities
│   ├── config.py                   # Environment isolation
│   ├── routes/                     # API endpoints
│   ├── services/                   # External API integration
│   └── tests/                      # pytest test suite
├── frontend/                       # Next.js (Firebase Hosting)
│   ├── app/                        # Pages (SSR + client split)
│   ├── components/                 # UI components
│   ├── hooks/                      # React Query data fetching
│   └── types/                      # TypeScript definitions
└── README.md
```

---

## License

This project is maintained by [山葵冰角 Wasabi Pingkak](https://www.youtube.com/@PingKak山葵冰角).
