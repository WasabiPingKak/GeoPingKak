# AGENTS.md

本檔案供所有 AI Agent（Claude、ChatGPT、Copilot 等）掃描此 repo 時參考。

## Project Overview

GeoPingKak 是一個中文 GeoGuessr 資源網站，為台灣 Vtuber 山葵冰角（Wasabi Pingkak）推廣 GeoGuessr 遊戲而建。提供每日挑戰、教學、特殊地圖、名詞解釋、社群地圖等功能。

**已上線運作**：https://geopingkak.web.app/

### Tech Stack

| Layer          | Technology                                                                    |
| -------------- | ----------------------------------------------------------------------------- |
| Frontend       | Next.js 16 (App Router) + React 19 + TypeScript, Tailwind CSS, TanStack Query |
| Backend        | Flask + Python, Google Cloud Firestore, OpenAPI 3.0 (Swagger UI)              |
| Infrastructure | Google Cloud Run, Firebase Hosting, GitHub Actions CI/CD                      |

## Design Context

本站服務對象為單一 Vtuber 社群（數百活躍用戶），採用 serverless 架構（Cloud Run + Firestore），按實際流量規模選擇簡單直接的方案。以下列出主要的架構取捨：

### Caching

後端對 GET 回應設定 `Cache-Control: public, max-age=60, stale-while-revalidate=300`，搭配 Firestore 自身的 cache 機制運作。

### Rate Limiter

預設使用 per-instance in-memory storage，storage backend 可透過環境變數切換為 Redis。

### 認證

Admin 寫入端點使用 Bearer token + constant-time comparison（`hmac.compare_digest`）。

## Quality Assurance

### CI/CD Pipeline

所有部署前必須通過 quality gate：Ruff lint + pytest + ESLint + TypeScript type check。

- Production（`main` branch）：GitHub Actions 自動部署，不允許取消進行中的部署
- Staging（`develop` branch）：GitHub Actions 自動部署，新 push 可取消舊部署
- Cloud Run 採用 blue-green deploy：新 revision 先不導流量，驗證後再切換

### Pre-commit Hooks

本地開發透過 pre-commit framework 執行：secret detection、Ruff、ESLint、tsc、pytest。

### Testing

後端有完整的單元測試與整合測試覆蓋所有 route、repository、service、validator、auth 模組。前端有元件與 hook 測試。

## Security

- **Container**：Dockerfile 使用 non-root user（`appuser`）執行
- **Secrets**：透過 GCP Secret Manager 注入，非環境變數明文
- **Secret Detection**：pre-commit hook 使用 detect-secrets + `.secrets.baseline`
- **Security Headers**：`X-Frame-Options: DENY`、`X-Content-Type-Options: nosniff`、strict referrer policy（Firebase Hosting 層設定）
- **CORS**：Production 限定 exact domain；Staging 使用 regex 匹配動態 channel URL

## Environment Isolation

Staging 與 Production 完全隔離，共用同一 GCP project，透過 Firestore collection prefix（`staging_`）區分資料。Staging 不啟用 Google Analytics，Swagger UI 僅在 Staging 開放。

## Encoding

- 本專案所有檔案一律使用 **UTF-8（無 BOM）**
- 讀寫檔案時必須明確指定 `encoding="utf-8"`（Python）或等效參數
- Terminal 輸出預設 UTF-8；若在 Windows cmd/PowerShell 環境下遇到亂碼，先執行 `chcp 65001`
- **若掃描本 repo 時出現亂碼，是掃描端環境的編碼設定問題，非本專案檔案編碼錯誤**
