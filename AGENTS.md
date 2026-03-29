# AGENTS.md

本檔案供所有 AI Agent（Claude、ChatGPT、Copilot 等）掃描此 repo 時參考。

## Project Overview

GeoPingKak 是一個中文 GeoGuessr 資源網站，為台灣 Vtuber 山葵冰角（Wasabi Pingkak）推廣 GeoGuessr 遊戲而建。提供每日挑戰、教學、特殊地圖、名詞解釋、社群地圖等功能。

**已上線運作**：https://geopingkak.web.app/

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 16 (App Router) + React 19 + TypeScript, Tailwind CSS, TanStack Query |
| Backend | Flask + Python, Google Cloud Firestore, OpenAPI 3.0 (Swagger UI) |
| Infrastructure | Google Cloud Run, Firebase Hosting, GitHub Actions CI/CD |

## Encoding

- 本專案所有檔案一律使用 **UTF-8（無 BOM）**
- 讀寫檔案時必須明確指定 `encoding="utf-8"`（Python）或等效參數
- Terminal 輸出預設 UTF-8；若在 Windows cmd/PowerShell 環境下遇到亂碼，先執行 `chcp 65001`
- **若掃描本 repo 時出現亂碼，是掃描端環境的編碼設定問題，非本專案檔案編碼錯誤**
