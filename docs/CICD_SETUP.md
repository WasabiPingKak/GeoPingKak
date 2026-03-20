# CI/CD 設定指南：GitHub Actions 自動部署到 Production

> 建立日期：2026-03-20
> 適用專案：GeoPingKak

## 概述

Push 到 `main` branch 時，GitHub Actions 自動部署前後端到 Production 環境。
前後端兩個 job **並行執行**，互不依賴。

手動部署（`deploy.sh`）仍可正常使用，CI/CD 沒有修改任何現有檔案。

---

## 架構圖

```
push to main
    │
    ├── deploy-backend（並行）
    │   ├── GCP 認證（Service Account Key）
    │   ├── Build Docker image → push 到 Artifact Registry
    │   ├── gcloud run deploy --no-traffic
    │   └── 確認 revision ready → 切換 100% 流量
    │
    └── deploy-frontend（並行）
        ├── npm ci → npm run build:prod
        └── Firebase Hosting deploy（web frameworks mode）
```

---

## 認證方式：Service Account Key

使用 GCP Service Account 的 JSON Key 進行認證，存放在 GitHub Secrets。

**為什麼選這個方式？**

| 方式 | 優點 | 缺點 |
|------|------|------|
| **Service Account Key**（我們用的） | 設定簡單，下載 JSON 就好 | 需要自己管理 key 輪替 |
| Workload Identity Federation (WIF) | 不用管理 key，安全性較高 | 設定步驟多（要建 Pool、Provider、綁定） |

選擇 SA Key 是因為設定步驟少，與 VTaxon 專案一致。

---

## 前置作業（一次性設定）

### 步驟 1：建立 GCP Service Account

1. [GCP Console](https://console.cloud.google.com) → 確認專案是 **geopingkak**
2. 左側選單 → **IAM 與管理** → **服務帳戶**
3. 點 **「+ 建立服務帳戶」**
   - 名稱：`github-actions-deploy`
   - 點 **「建立並繼續」**
4. 授予以下 5 個角色（點「新增其他角色」依序加入）：
   - `Cloud Run 管理員` — 部署 Cloud Run 服務
   - `Artifact Registry 寫入者` — push Docker image
   - `Secret Manager 密鑰存取者` — Cloud Run 讀取 secrets
   - `服務帳戶使用者` — 允許以其他 SA 身份部署
   - `Firebase Hosting 管理員` — 部署前端到 Firebase
5. 點 **「完成」**

### 步驟 2：下載 Service Account JSON Key

1. 在服務帳戶列表，點進 **github-actions-deploy**
2. 上方切到 **「金鑰」** 頁籤
3. **「新增金鑰」** → **「建立新的金鑰」** → 選 **JSON** → **「建立」**
4. 瀏覽器會下載一個 `.json` 檔案（妥善保管，不要 commit 進 repo）

### 步驟 3：下載 Firebase Service Account Key

1. [Firebase Console](https://console.firebase.google.com) → 選 **geopingkak** 專案
2. 左上齒輪 → **專案設定** → **服務帳戶** 頁籤
3. 點 **「產生新的私密金鑰」** → 下載 JSON

### 步驟 4：設定 GitHub Repository Secrets

1. GitHub repo 頁面 → **Settings** → 左側 **Secrets and variables** → **Actions**
2. 點 **「New repository secret」**，依序建立 3 個：

| Secret 名稱 | 值 |
|---|---|
| `GCP_SA_KEY` | 步驟 2 下載的 JSON 檔案**全部內容** |
| `GCP_PROJECT_ID` | `geopingkak` |
| `FIREBASE_SERVICE_ACCOUNT` | 步驟 3 下載的 JSON 檔案**全部內容** |

> `GITHUB_TOKEN` 不需要手動設定，GitHub Actions 會自動提供。

---

## Workflow 檔案說明

檔案位置：`.github/workflows/deploy-production.yml`

### 觸發條件

```yaml
on:
  push:
    branches: [main]
```

只有 push 到 `main` 才會觸發。

### 並行控制

```yaml
concurrency:
  group: production-deploy
  cancel-in-progress: false
```

同一時間只會有一個部署在跑，但不會取消進行中的部署（等它跑完再跑下一個）。

### Backend 部署流程

1. **GCP 認證**：用 `GCP_SA_KEY` 透過 `google-github-actions/auth@v2`
2. **Docker 認證**：`gcloud auth configure-docker` 讓 docker push 到 Artifact Registry
3. **寫入 version.txt**：git commit hash，方便追蹤部署版本
4. **Build & Push Image**：image tag 使用完整 commit SHA
   - 路徑：`asia-east1-docker.pkg.dev/geopingkak/geopingkak-backend-repo/geopingkak-backend:{sha}`
5. **部署到 Cloud Run**：
   - `--no-traffic`：先部署但不導流（安全起見）
   - `--set-env-vars`：設定 `DEPLOY_ENV=production`
   - `--set-secrets`：從 GCP Secret Manager 注入敏感環境變數
6. **切換流量**：查詢最新 Ready revision，切換 100% 流量

### Frontend 部署流程

1. **npm ci**：根據 `package-lock.json` 安裝（確保可重現）
2. **npm run build:prod**：會先 `rm -f .env.production.local`，然後 `next build`
   - 前端讀取 repo 裡已 commit 的 `.env.production`（含 backend URL）
3. **Firebase deploy**：使用 `FirebaseExtended/action-hosting-deploy@v0`
   - 必須設定 `FIREBASE_CLI_EXPERIMENTS: webframeworks`（因為 `firebase.json` 有 `frameworksBackend`）

### 為什麼前後端可以並行？

Backend URL（Cloud Run service URL）基本上不會變。前端 build 時直接讀 repo 裡的 `.env.production` 即可，不需要等 backend 部署完才拿 URL。

---

## 環境變數來源

Backend 的所有環境變數都來自 Cloud Run，**不讀本地 `.env` 檔案**：

| 環境變數 | 來源 | 用途 |
|---|---|---|
| `DEPLOY_ENV` | `--set-env-vars` | 決定 Firestore collection 前綴 |
| `ADMIN_API_KEY` | GCP Secret Manager | 每日挑戰寫入 API 認證 |
| `GEOGUESSR_NCFA` | GCP Secret Manager | GeoGuessr API cookie |
| `VIDEO_EXPLANATIONS_ADMIN_TOKEN` | GCP Secret Manager | 影片說明寫入 API 認證 |
| `GOOGLE_CLOUD_PROJECT` | Cloud Run 自動注入 | Firestore 初始化 |

---

## 除錯紀錄

### Firebase deploy 報錯 `experiment webframeworks is not enabled`

**原因**：`firebase.json` 設定了 `frameworksBackend`（Next.js SSR 模式），Firebase CLI 需要啟用 `webframeworks` 實驗功能。

**解法**：在 Firebase deploy step 加上環境變數：

```yaml
env:
  FIREBASE_CLI_EXPERIMENTS: webframeworks
```

---

## 驗證部署

1. Push 到 `main` 後，到 GitHub repo → **Actions** 頁籤確認 workflow 狀態
2. 兩個 job 都顯示綠勾 ✓ 即成功
3. 驗證 backend：訪問 `https://geopingkak-backend-xxxxxxxx.a.run.app/ping`
4. 驗證 frontend：訪問 `https://geopingkak.web.app`
