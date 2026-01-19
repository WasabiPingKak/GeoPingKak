# PRD: 影片說明資料動態化 API

## 📌 文件資訊

- **功能名稱**: Video Explanations API
- **建立日期**: 2026-01-19
- **版本**: v1.0
- **相關分支**: `claude/review-video-explanations-9Sw5H`

---

## 🎯 背景與目標

### 現況問題
目前影片連結資料儲存在靜態檔案 `frontend/data/videoExplanations.ts` 中，每次新增或更新資料需要：
1. 手動編輯檔案
2. Git commit
3. Git push
4. 重新部署前端

這個流程繁瑣且不利於快速更新內容。

### 解決方案
將影片連結資料遷移至 Firestore，並提供 RESTful API 進行動態更新，實現：
- ✅ 即時更新資料，無需重新部署
- ✅ 透過 Bearer Token 保護寫入權限
- ✅ 前端從 API 動態載入資料

---

## 🏗️ 技術架構

### 環境配置

本專案支援 **Staging** 和 **Production** 雙環境，透過 `DEPLOY_ENV` 環境變數自動切換：

| 環境 | Collection 名稱 | 自動切換機制 |
|------|----------------|-------------|
| Production | `video_explanations` | `DEPLOY_ENV=production` |
| Staging | `staging_video_explanations` | `DEPLOY_ENV=staging` |

**環境隔離機制**：
- Backend 使用 `backend/config.py` 的 `get_collection_name()` 函數自動處理
- 同一份程式碼部署到不同環境，自動讀寫對應的 collection
- 資料完全隔離，互不影響

### Firestore 資料結構

**Collection Name**:
- Production: `video_explanations`
- Staging: `staging_video_explanations`

**Document 結構**:
```
video_explanations/  (或 staging_video_explanations/)
  ├── 2026-01-15/           (Document ID = 日期 YYYY-MM-DD)
  │   ├── tw-urban: {
  │   │     livestream: "https://youtube.com/...",
  │   │     explanation: "https://youtu.be/..."
  │   │   }
  │   ├── the-world: {
  │   │     livestream: "https://youtube.com/..."
  │   │   }
  │   └── world-ACW: { ... }
  │
  └── 2026-01-10/
      └── ...
```

**設計說明**:
- 每個日期為獨立 document，Document ID 為日期字串
- 每個地圖 ID 為 document 的 field
- 每個地圖包含 `livestream` 和 `explanation` 兩個可選欄位
- 允許欄位值為空字串（表示無影片）

---

## 🔌 API 規格

### 1. GET /api/video-explanations

**用途**: 取得所有日期的影片資料

**認證**: 不需要（公開端點）

**請求範例**:
```bash
GET https://your-backend.run.app/api/video-explanations
```

**成功回應** (200 OK):
```json
{
  "2026-01-15": {
    "tw-urban": {
      "livestream": "https://www.youtube.com/live/evx_gpXQqUE?si=yTnpStQew1Cdkbqf&t=1028",
      "explanation": ""
    },
    "the-world": {
      "livestream": "",
      "explanation": "https://youtu.be/abc123"
    }
  },
  "2026-01-10": {
    "tw-urban": {
      "livestream": "https://www.youtube.com/live/ZUGFuGtSI7w?si=K6jiZ3Z23gz3pbAr&t=526"
    }
  }
}
```

**錯誤回應**:
- 500 Internal Server Error: 資料庫錯誤

---

### 2. POST /api/video-explanations

**用途**: 新增或更新特定日期的影片資料（覆蓋式更新）

**認證**: 需要 `Authorization: Bearer <token>` header

**請求範例**:
```bash
POST https://your-backend.run.app/api/video-explanations
Content-Type: application/json
Authorization: Bearer your-secret-token

{
  "date": "2026-01-15",
  "maps": {
    "tw-urban": {
      "livestream": "https://www.youtube.com/live/evx_gpXQqUE?si=yTnpStQew1Cdkbqf&t=1028"
    },
    "the-world": {
      "explanation": "https://youtu.be/Xg4AYWTtohw?si=AI0-tkTd1a2QrrK0&t=27",
      "livestream": "https://www.youtube.com/live/evx_gpXQqUE?si=CYpdqp35xWQnsjZY&t=8913"
    }
  }
}
```

**請求欄位說明**:
| 欄位 | 類型 | 必填 | 說明 |
|------|------|------|------|
| date | string | ✅ | 日期格式 YYYY-MM-DD |
| maps | object | ✅ | 地圖資料物件，不可為空 |
| maps.{mapId} | object | ✅ | 每個地圖 ID 對應的影片資料 |
| maps.{mapId}.livestream | string | ❌ | 直播連結（可為空字串） |
| maps.{mapId}.explanation | string | ❌ | 講解影片連結（可為空字串） |

**成功回應** (200 OK):
```json
{
  "success": true,
  "message": "Video explanations updated for 2026-01-15",
  "date": "2026-01-15"
}
```

**錯誤回應**:

**401 Unauthorized**:
```json
{
  "error": "Unauthorized",
  "message": "Invalid or missing token"
}
```

**400 Bad Request** (範例):
```json
{
  "error": "Bad Request",
  "message": "Invalid date format. Expected YYYY-MM-DD"
}
```

```json
{
  "error": "Bad Request",
  "message": "Invalid map ID: 'invalid-map'. Allowed: jp-urban, jp-balanced, the-world, world-ACW, tw-balanced, tw-urban"
}
```

```json
{
  "error": "Bad Request",
  "message": "Invalid URL format for explanation. Must be a YouTube URL"
}
```

```json
{
  "error": "Bad Request",
  "message": "Map 'tw-urban' must have at least one of livestream or explanation"
}
```

---

## ✅ 資料驗證規則

### 1. 日期格式驗證

**規則**:
- 必須符合格式 `YYYY-MM-DD`
- 必須是有效日期（例如：`2026-02-30` 會被拒絕）

**實作**:
```python
from datetime import datetime

def validate_date(date_str):
    try:
        datetime.strptime(date_str, '%Y-%m-%d')
        return True
    except ValueError:
        return False
```

---

### 2. 地圖 ID 白名單驗證

**允許的地圖 ID**:
```python
ALLOWED_MAP_IDS = [
    "jp-urban",
    "jp-balanced",
    "the-world",
    "world-ACW",
    "tw-balanced",
    "tw-urban"
]
```

**規則**:
- 所有 `maps` 中的 key 必須在白名單內
- 大小寫需完全符合

---

### 3. URL 格式驗證

**規則**:
- 允許空字串 `""`（表示無影片）
- 非空時必須符合：
  - 以 `https://` 開頭
  - 域名必須為 `youtube.com`、`youtu.be` 或 `www.youtube.com`

**實作**:
```python
import re

def validate_youtube_url(url):
    if url == "":
        return True
    pattern = r'^https://(www\.)?(youtube\.com|youtu\.be)/.*$'
    return bool(re.match(pattern, url))
```

---

### 4. 欄位必填規則

**規則**:
- `date` 欄位必填
- `maps` 欄位必填且不可為空 object `{}`
- 每個地圖至少要有 `livestream` 或 `explanation` 其中一個非空值

**驗證邏輯**:
```python
def validate_map_entry(map_data):
    livestream = map_data.get('livestream', '')
    explanation = map_data.get('explanation', '')

    if not livestream and not explanation:
        return False
    return True
```

---

## 🔐 認證機制

### Google Secret Manager 設定

**Secret 名稱**: `VIDEO_EXPLANATIONS_ADMIN_TOKEN`

**建立指令**:
```bash
echo -n "your-secure-random-token" | gcloud secrets create VIDEO_EXPLANATIONS_ADMIN_TOKEN \
  --data-file=- \
  --project=geopingkak
```

**Cloud Run 環境變數注入**:

Cloud Run 可直接從 Secret Manager 注入環境變數，無需在程式碼中讀取：

```bash
# Staging 環境
gcloud run services update geopingkak-backend-staging \
  --update-secrets=VIDEO_EXPLANATIONS_ADMIN_TOKEN=VIDEO_EXPLANATIONS_ADMIN_TOKEN:latest \
  --region=asia-east1

# Production 環境
gcloud run services update geopingkak-backend \
  --update-secrets=VIDEO_EXPLANATIONS_ADMIN_TOKEN=VIDEO_EXPLANATIONS_ADMIN_TOKEN:latest \
  --region=asia-east1
```

部署時 `deploy.sh` 會自動處理環境變數設定。

### 驗證流程

1. 從 HTTP header 提取 `Authorization: Bearer <token>`
2. 從環境變數讀取正確的 token
3. 使用常數時間比較避免 timing attack
4. 驗證失敗返回 401 Unauthorized

**實作範例**:
```python
import os
import hmac

def verify_token(request):
    auth_header = request.headers.get('Authorization', '')

    if not auth_header.startswith('Bearer '):
        return False

    provided_token = auth_header[7:]  # Remove 'Bearer ' prefix
    correct_token = os.getenv('VIDEO_EXPLANATIONS_ADMIN_TOKEN', '')

    if not correct_token:
        return False

    # Constant-time comparison
    return hmac.compare_digest(provided_token, correct_token)
```

---

## 💻 Backend 實作

### 新增檔案

**`backend/routes/video_explanation_routes.py`**

實作 GET 和 POST 端點，包含：
- 資料驗證邏輯
- Token 認證
- 環境隔離支援

**實作結構** (函數式註冊模式)：
```python
from flask import Blueprint, request, jsonify
from google.cloud.firestore import Client
from datetime import datetime
import os
import hmac
import re

from config import get_collection_name

def init_video_explanation_routes(app, db: Client):
    bp = Blueprint("video_explanation", __name__, url_prefix="/api")

    # 地圖 ID 白名單
    ALLOWED_MAP_IDS = [
        "jp-urban", "jp-balanced", "the-world",
        "world-ACW", "tw-balanced", "tw-urban"
    ]

    @bp.route("/video-explanations", methods=["GET"])
    def get_video_explanations():
        collection_name = get_collection_name("video_explanations")
        # ... 實作邏輯

    @bp.route("/video-explanations", methods=["POST"])
    def update_video_explanations():
        # Token 驗證
        if not verify_token(request):
            return jsonify({"error": "Unauthorized"}), 401

        collection_name = get_collection_name("video_explanations")
        # ... 實作邏輯

    def verify_token(request):
        # ... 驗證邏輯（參考上方認證機制章節）

    app.register_blueprint(bp)
```

**關鍵設計要點**：
1. ✅ 使用 `get_collection_name()` 支援環境自動切換
2. ✅ 函數式註冊 - `init_video_explanation_routes(app, db)`
3. ✅ Token 從環境變數讀取

### 修改檔案

**`backend/app.py`**
```python
from routes.video_explanation_routes import init_video_explanation_routes

# 在其他路由註冊之後加入
init_video_explanation_routes(app, db)
```

### 環境變數設定

**Cloud Run 環境變數**:
- `DEPLOY_ENV`: `staging` 或 `production`（由 `deploy.sh` 自動設定）
- `VIDEO_EXPLANATIONS_ADMIN_TOKEN`: 從 Secret Manager 注入（見上方認證機制章節）

**無需額外安裝依賴**：
- ❌ 不需要 `google-cloud-secret-manager`（使用環境變數即可）
- ✅ 所有必要依賴已在 `requirements.txt` 中

---

## 🎨 Frontend 實作

### 新增檔案

**`frontend/hooks/useVideoExplanations.ts`**
```typescript
import { useQuery } from '@tanstack/react-query';

interface VideoLink {
  livestream?: string;
  explanation?: string;
}

interface VideoExplanations {
  [date: string]: {
    [mapId: string]: VideoLink;
  };
}

export function useVideoExplanations() {
  return useQuery<VideoExplanations>({
    queryKey: ['video-explanations'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/video-explanations`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch video explanations');
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 分鐘
    refetchOnWindowFocus: false,
  });
}
```

### 刪除檔案

- ❌ `frontend/data/videoExplanations.ts`

### 修改使用該資料的元件

需要找出所有引用 `VIDEO_EXPLANATIONS` 的地方並改用新 hook：

**搜尋指令**:
```bash
cd frontend
grep -r "VIDEO_EXPLANATIONS" app/ components/
grep -r "from.*videoExplanations" app/ components/
```

**改動範例**:

**Before**:
```typescript
import VIDEO_EXPLANATIONS from '@/data/videoExplanations';

export default function SomeComponent() {
  const videoData = VIDEO_EXPLANATIONS['2026-01-15']?.['tw-urban'];
  // ...
}
```

**After**:
```typescript
import { useVideoExplanations } from '@/hooks/useVideoExplanations';

export default function SomeComponent() {
  const { data: videoExplanations, isLoading, error } = useVideoExplanations();

  if (isLoading) return <div>載入中...</div>;
  if (error) return <div>載入失敗</div>;

  const videoData = videoExplanations?.['2026-01-15']?.['tw-urban'];
  // ...
}
```

---

## 🧪 測試計畫

### 1. Backend API 測試

#### GET 端點測試
```bash
# 測試取得所有資料
curl https://your-backend.run.app/api/video-explanations
```

**預期**: 返回 200 及所有資料

---

#### POST 端點測試

**測試案例 1: 成功新增資料**
```bash
curl -X POST https://your-backend.run.app/api/video-explanations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "date": "2026-01-20",
    "maps": {
      "tw-urban": {
        "livestream": "https://www.youtube.com/watch?v=test123"
      }
    }
  }'
```
**預期**: 返回 200 及成功訊息

---

**測試案例 2: Token 驗證失敗**
```bash
curl -X POST https://your-backend.run.app/api/video-explanations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer wrong-token" \
  -d '{
    "date": "2026-01-20",
    "maps": {
      "tw-urban": {
        "livestream": "https://www.youtube.com/watch?v=test123"
      }
    }
  }'
```
**預期**: 返回 401 Unauthorized

---

**測試案例 3: 日期格式錯誤**
```bash
curl -X POST https://your-backend.run.app/api/video-explanations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "date": "2026/01/20",
    "maps": {
      "tw-urban": {
        "livestream": "https://www.youtube.com/watch?v=test123"
      }
    }
  }'
```
**預期**: 返回 400 及日期格式錯誤訊息

---

**測試案例 4: 無效地圖 ID**
```bash
curl -X POST https://your-backend.run.app/api/video-explanations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "date": "2026-01-20",
    "maps": {
      "invalid-map": {
        "livestream": "https://www.youtube.com/watch?v=test123"
      }
    }
  }'
```
**預期**: 返回 400 及地圖 ID 錯誤訊息

---

**測試案例 5: 無效 URL**
```bash
curl -X POST https://your-backend.run.app/api/video-explanations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "date": "2026-01-20",
    "maps": {
      "tw-urban": {
        "livestream": "http://example.com/video"
      }
    }
  }'
```
**預期**: 返回 400 及 URL 格式錯誤訊息

---

**測試案例 6: 空欄位**
```bash
curl -X POST https://your-backend.run.app/api/video-explanations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "date": "2026-01-20",
    "maps": {
      "tw-urban": {
        "livestream": "",
        "explanation": ""
      }
    }
  }'
```
**預期**: 返回 400 及至少需要一個欄位的錯誤訊息

---

**測試案例 7: 覆蓋更新**
```bash
# 第一次建立
curl -X POST https://your-backend.run.app/api/video-explanations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "date": "2026-01-20",
    "maps": {
      "tw-urban": {"livestream": "https://youtube.com/1"},
      "the-world": {"livestream": "https://youtube.com/2"}
    }
  }'

# 第二次更新（應完全覆蓋）
curl -X POST https://your-backend.run.app/api/video-explanations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-token" \
  -d '{
    "date": "2026-01-20",
    "maps": {
      "tw-urban": {"livestream": "https://youtube.com/3"}
    }
  }'

# 驗證結果
curl https://your-backend.run.app/api/video-explanations
```
**預期**: `2026-01-20` 只剩 `tw-urban`，`the-world` 被移除

---

### 2. Frontend 整合測試

**測試項目**:
1. ✅ 頁面載入時正確從 API 取得資料
2. ✅ Loading 狀態正確顯示
3. ✅ Error 狀態正確處理
4. ✅ 資料格式與原靜態檔案相容
5. ✅ 影片連結正確顯示在 UI 上

**測試方式**:
1. `npm run dev` 啟動開發環境
2. 檢查 Network tab 確認 API 呼叫
3. 確認每日挑戰頁面的影片連結正常顯示

---

### 3. 資料遷移測試

**步驟**:
1. 執行資料遷移腳本（將靜態資料匯入 Firestore）
2. 驗證 Firestore 中的資料完整性
3. 對比 GET API 返回的資料與原靜態檔案
4. 確保無資料遺失或格式錯誤

---

## 📦 資料遷移

### 遷移腳本

建立一次性腳本將現有資料匯入 Firestore（支援環境配置）：

**`backend/scripts/migrate_video_data.py`**
```python
import json
import os
import sys
import firebase_admin
from firebase_admin import credentials, firestore

def migrate_data(environment='production'):
    """
    遷移影片說明資料到 Firestore

    Args:
        environment: 'production' 或 'staging'
    """
    # 初始化 Firebase（如果尚未初始化）
    if not firebase_admin._apps:
        cred = credentials.ApplicationDefault()
        firebase_admin.initialize_app(cred, {
            'projectId': 'geopingkak'
        })

    db = firestore.client()

    # 讀取現有資料（從 videoExplanations.ts 手動轉換成 JSON）
    with open('video_data.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    # 根據環境決定 collection 名稱
    collection_name = 'video_explanations'
    if environment == 'staging':
        collection_name = 'staging_video_explanations'

    collection_ref = db.collection(collection_name)

    print(f"📦 遷移資料到 {collection_name}...")

    for date, maps in data.items():
        doc_ref = collection_ref.document(date)
        doc_ref.set(maps)
        print(f"✅ 已遷移 {date}")

    print(f"\n🎉 遷移完成！共 {len(data)} 筆資料")

if __name__ == '__main__':
    # 從命令列參數讀取環境
    env = sys.argv[1] if len(sys.argv) > 1 else 'production'

    if env not in ['production', 'staging']:
        print("❌ 環境參數必須是 'production' 或 'staging'")
        sys.exit(1)

    migrate_data(env)
```

**執行步驟**:

1. **準備資料**：將 `videoExplanations.ts` 的資料轉成 JSON
   ```bash
   # 手動編輯或使用 Node.js 腳本轉換
   # 輸出為 backend/scripts/video_data.json
   ```

2. **認證設定**：
   ```bash
   cd backend
   gcloud auth application-default login
   gcloud config set project geopingkak
   ```

3. **遷移到 Production**：
   ```bash
   cd backend/scripts
   python migrate_video_data.py production
   ```

4. **遷移到 Staging**：
   ```bash
   python migrate_video_data.py staging
   ```

5. **驗證資料**：
   ```bash
   # Production
   curl https://geopingkak-backend-xxx.run.app/api/video-explanations

   # Staging
   curl https://geopingkak-backend-staging-xxx.run.app/api/video-explanations
   ```

---

## 📋 部署檢查清單

### 準備階段

- [ ] Secret Manager 中已建立 `VIDEO_EXPLANATIONS_ADMIN_TOKEN`
- [ ] 新路由已註冊到 `app.py`
- [ ] 執行資料遷移腳本（production 和 staging）
- [ ] 建立 `useVideoExplanations` hook
- [ ] 更新 `CommonMapCard.tsx` 使用新 hook

---

### Phase 1: Staging Backend 部署

**部署指令**:
```bash
cd backend
./deploy.sh staging
```

**部署後測試**:
- [ ] 測試 GET 端點返回正確資料
  ```bash
  curl https://geopingkak-backend-staging-xxx.run.app/api/video-explanations
  ```
- [ ] 測試 POST 端點（使用正確 token）
- [ ] 測試 POST 端點（使用錯誤 token，應返回 401）
- [ ] 確認使用 `staging_video_explanations` collection
- [ ] 檢查 Cloud Run 日誌無錯誤

---

### Phase 2: Staging Frontend 部署

**部署指令**:
```bash
cd frontend
./deploy.sh staging
```

**部署前**:
- [ ] 確認 `.env.staging` 的 `NEXT_PUBLIC_API_BASE` 指向 staging backend
- [ ] `npm run build:staging` 確認無 TypeScript 錯誤
- [ ] 本地測試頁面顯示正常

**部署後測試**:
- [ ] 訪問 `staging--geopingkak.web.app`
- [ ] 確認頁面正常顯示影片連結
- [ ] 檢查瀏覽器 Console 無錯誤
- [ ] 驗證影片連結可點擊且正確跳轉
- [ ] 確認 Network tab 顯示正確的 API 請求

---

### Phase 3: Production 部署

**⚠️ 只有在 Staging 環境完全測試通過後才進行 Production 部署**

**Backend 部署**:
```bash
cd backend
./deploy.sh prod
```

**Backend 測試**:
- [ ] 測試 GET 端點返回正確資料
- [ ] 測試 POST 端點功能正常
- [ ] 確認使用 `video_explanations` collection（非 staging）

**Frontend 部署**:
```bash
cd frontend
./deploy.sh prod
```

**Frontend 測試**:
- [ ] 訪問 `geopingkak.web.app`
- [ ] 確認頁面正常顯示
- [ ] 所有功能正常運作

**清理工作**:
- [ ] 刪除 `frontend/data/videoExplanations.ts`
- [ ] Commit 並 push 變更

---

### 環境變數確認

**Staging**:
- Backend: `DEPLOY_ENV=staging`
- Frontend: `NEXT_PUBLIC_API_BASE=https://geopingkak-backend-staging-xxx.run.app`

**Production**:
- Backend: `DEPLOY_ENV=production`
- Frontend: `NEXT_PUBLIC_API_BASE=https://geopingkak-backend-xxx.run.app`

---

## 🔄 未來擴充可能性

### 1. 批次更新 API
新增一個端點支援一次更新多個日期：
```
POST /api/video-explanations/batch
```

### 2. 管理後台介面
建立簡單的前端表單讓管理員透過 UI 更新資料（需整合 Firebase Auth）

### 3. 地圖 ID 動態化
將允許的地圖 ID 清單也儲存在 Firestore，避免硬編碼

### 4. 版本控制
記錄每次更新的時間戳和操作者，建立審計日誌

### 5. Webhook 通知
資料更新後發送通知到 Discord 或 Slack

---

## 📞 技術支援

如有問題請參考：
- Backend 部署文件：`backend/README.md`
- Frontend 開發指南：`frontend/README.md`
- 專案整體說明：`CLAUDE.md`

---

## ✅ 驗收標準

- [ ] 使用者可透過 Postman 成功新增/更新影片資料
- [ ] 前端頁面即時顯示更新後的資料（無需重新部署）
- [ ] 無有效 Token 無法呼叫 POST API
- [ ] 所有驗證規則正確運作
- [ ] 移除靜態檔案後系統運作正常
- [ ] 效能無明顯下降（API 回應時間 < 500ms）

---

**文件結束**
