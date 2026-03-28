# GeoPingKak Frontend

GeoGuessr resource website for the Taiwanese Vtuber community, built with Next.js 16 (App Router), React 19, TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev           # Start dev server (Turbopack)
npm run build         # Production build
npm run lint          # ESLint
```

## Architecture

- **App Router** with Server/Client component split for SEO optimization
- **TanStack React Query** for data fetching and caching
- **Firebase Hosting** for deployment (staging channel + production)

See the root `CLAUDE.md` for full project documentation.
