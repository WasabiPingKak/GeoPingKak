# PRD: 建立 Staging 環境

## 文件資訊
- **專案**: GeoPingKak
- **版本**: 1.0
- **建立日期**: 2026-01-19
- **狀態**: 待實作

---

## 1. 專案背景

### 現況
目前 GeoPingKak 專案只有單一 production 環境：
- **前端**: Firebase Hosting (`geopingkak.web.app`)
- **後端**: Cloud Run (`geopingkak-backend`)
- **資料庫**: Firestore (單一專案)

### 問題
1. 所有程式碼變更直接部署到 production，風險高
2. 無法在真實環境中測試新功能
3. Feature branch 無法在雲端環境驗證

---

## 2. 專案目標

建立一個獨立的 **Staging 環境**，用於：
- 在 merge 到 main 之前測試新功能
- 驗證前後端整合
- 確保部署流程正確性

### 非目標（本階段不包含）
- CI/CD 自動化部署
- 自動測試流程
- 多個 preview 環境

---

## 3. 技術規格

### 3.1 前端 (Frontend)

#### 環境變數配置
建立兩個環境變數檔案：

**`.env.staging`**
```env
NEXT_PUBLIC_API_BASE=https://geopingkak-backend-staging-<hash>.a.run.app
```

**`.env.production`**
```env
NEXT_PUBLIC_API_BASE=https://geopingkak-backend-<hash>.a.run.app
```

#### 建置與部署指令
在 `package.json` 新增以下 scripts：

```json
{
  "scripts": {
    "build:staging": "cp .env.staging .env.production.local && next build",
    "build:prod": "rm -f .env.production.local && next build",
    "deploy:staging": "npm run build:staging && firebase hosting:channel:deploy staging --expires 30d",
    "deploy:prod": "npm run build:prod && firebase deploy --only hosting"
  }
}
```

#### 部署 URL
- **Staging**: `https://staging--geopingkak.web.app` (Firebase Hosting Channel)
- **Production**: `https://geopingkak.web.app` (維持不變)

---

### 3.2 後端 (Backend)

#### Cloud Run 服務
- **Staging 服務**: `geopingkak-backend-staging`
  - Region: `asia-east1`
  - 環境變數: `DEPLOY_ENV=staging`

- **Production 服務**: `geopingkak-backend`
  - Region: `asia-east1`
  - 環境變數: `DEPLOY_ENV=production`

#### 部署腳本
修改 `backend/deploy.sh` 支援環境參數：

```bash
#!/bin/bash

ENV=${1:-production}

if [ "$ENV" = "staging" ]; then
  SERVICE_NAME="geopingkak-backend-staging"
  DEPLOY_ENV="staging"
else
  SERVICE_NAME="geopingkak-backend"
  DEPLOY_ENV="production"
fi

gcloud run deploy $SERVICE_NAME \
  --source . \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated \
  --set-env-vars DEPLOY_ENV=$DEPLOY_ENV
```

使用方式：
```bash
./deploy.sh staging   # 部署到 staging
./deploy.sh prod      # 部署到 production
```

---

### 3.3 資料庫隔離

#### 方案：Collection 前綴隔離

使用不同的 Firestore collection 名稱區分環境：

| 功能 | Production Collection | Staging Collection |
|------|----------------------|-------------------|
| 每日挑戰 | `daily_challenges` | `staging_daily_challenges` |
| 特殊地圖 | `special_maps` | `staging_special_maps` |
| 社群地圖 | `community_maps` | `staging_community_maps` |

#### 實作方式
在後端程式碼中根據環境變數動態選擇 collection：

```python
# 範例
import os

DEPLOY_ENV = os.getenv('DEPLOY_ENV', 'production')

def get_collection_name(base_name: str) -> str:
    if DEPLOY_ENV == 'staging':
        return f'staging_{base_name}'
    return base_name

# 使用
db.collection(get_collection_name('daily_challenges'))
```

---

## 4. 實作項目

### 4.1 後端調整

#### 檔案修改清單
1. **`backend/deploy.sh`**
   - 新增環境參數支援
   - 根據環境選擇服務名稱

2. **`backend/app.py`** 或新建 **`backend/config.py`**
   - 新增 `get_collection_name()` 輔助函式
   - 統一管理環境配置

3. **`backend/routes/daily_challenge_reader.py`**
   - 更新所有 collection 引用為動態名稱

4. **`backend/routes/daily_challenge_writer.py`**
   - 更新所有 collection 引用為動態名稱

5. **`backend/routes/special_map_routes.py`**
   - 更新所有 collection 引用為動態名稱

6. **`backend/routes/geoguessr_map_routes.py`**
   - 更新所有 collection 引用為動態名稱

#### 測試重點
- 確認環境變數正確讀取
- 驗證 collection 名稱在不同環境下正確切換
- 測試 CORS 設定對 staging URL 有效

---

### 4.2 前端調整

#### 檔案修改清單
1. **新增檔案**
   - `frontend/.env.staging`
   - `frontend/.env.production`

2. **`frontend/package.json`**
   - 新增 `build:staging`, `build:prod`, `deploy:staging`, `deploy:prod` scripts

3. **`frontend/.gitignore`**
   - 確認忽略 `.env.production.local`

#### 測試重點
- 確認建置時正確載入對應的環境變數
- 驗證 staging 建置連接到 staging API
- 驗證 production 建置連接到 production API

---

### 4.3 文件更新

更新 **`README.md`** 新增 Staging 環境相關說明：
- 環境變數設定說明
- 部署指令使用方式
- Staging 環境 URL

---

## 5. 部署工作流程

### 開發新功能流程

```
1. 建立 feature branch
   git checkout -b feature/new-feature

2. 本地開發與測試
   cd frontend && npm run dev

3. 部署到 Staging 環境測試
   cd backend && ./deploy.sh staging
   cd frontend && npm run deploy:staging

4. 在 staging URL 驗證功能
   https://staging--geopingkak.web.app

5. 測試通過後 merge 到 main
   git checkout main
   git merge feature/new-feature

6. 部署到 Production 環境
   cd backend && ./deploy.sh prod
   cd frontend && npm run deploy:prod
```

---

## 6. 驗收標準

### 6.1 功能驗收
- [ ] Staging 前端可正常訪問 `staging--geopingkak.web.app`
- [ ] Staging 後端服務 `geopingkak-backend-staging` 正常運行
- [ ] Staging 環境連接到 staging collections
- [ ] Production 環境不受影響，功能正常
- [ ] Staging 和 Production 資料完全隔離

### 6.2 部署驗收
- [ ] `./deploy.sh staging` 成功部署到 staging 服務
- [ ] `./deploy.sh prod` 成功部署到 production 服務
- [ ] `npm run deploy:staging` 成功部署到 staging channel
- [ ] `npm run deploy:prod` 成功部署到 production hosting

### 6.3 文件驗收
- [ ] README.md 包含 staging 環境說明
- [ ] 環境變數檔案建立完成
- [ ] PRD 文件歸檔

---

## 7. 風險與注意事項

### 風險
1. **環境變數洩漏**: `.env` 檔案不應提交到 git
2. **成本增加**: 新增 Cloud Run 服務會產生額外費用（預期極低）
3. **資料誤用**: 需確保不會在 production 使用 staging 資料

### 緩解措施
1. `.gitignore` 確實忽略 `.env.production` 和 `.env.staging`
2. 監控 Cloud Run 用量，設定預算警報
3. 程式碼 review 時檢查 collection 名稱邏輯

---

## 8. 未來規劃

本次實作完成後，未來可考慮：
1. 整合 GitHub Actions 實現自動部署
2. 新增自動化測試流程
3. 支援多個 preview 環境（per branch）
4. 整合 Firebase Remote Config 管理環境配置

---

## 附錄

### 相關資源
- [Firebase Hosting Channels 文件](https://firebase.google.com/docs/hosting/test-preview-deploy)
- [Cloud Run 環境變數設定](https://cloud.google.com/run/docs/configuring/environment-variables)
- [Next.js 環境變數](https://nextjs.org/docs/pages/building-your-application/configuring/environment-variables)

### 聯絡資訊
- 專案負責人: WasabiPingKak
- 技術支援: Claude Code
