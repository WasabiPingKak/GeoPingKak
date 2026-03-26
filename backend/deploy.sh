#!/bin/bash

# 部署 GeoPingKak 後端到 Staging 環境（Cloud Run）
# Production 部署請使用 CI/CD（push 到 main 自動觸發 GitHub Actions）

set -e

# 驗證環境參數
if [ "$1" != "staging" ]; then
  echo "使用方式："
  echo "  ./deploy.sh staging    # 部署到 Staging 環境"
  echo ""
  echo "Production 部署請 push 到 main branch，由 GitHub Actions 自動執行。"
  exit 1
fi

echo "🟡 部署至 Staging 環境"

# 設定部署參數
SERVICE_NAME="geopingkak-backend-staging"
DEPLOY_ENV="staging"
GOOGLE_CLOUD_PROJECT="geopingkak"
REGION="asia-east1"
REPO_NAME="geopingkak-backend-repo"
IMAGE_URI="asia-east1-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/$REPO_NAME/$SERVICE_NAME"

# 設定 GCP 專案
echo "🔧 設定 GCP 專案 ID: $GOOGLE_CLOUD_PROJECT"
gcloud config set project "$GOOGLE_CLOUD_PROJECT"

# 寫入 Git Commit Hash 至 version.txt
commit_hash=$(git rev-parse --short=6 HEAD)
echo "🔖 寫入 Git Commit Hash: $commit_hash"
echo "$commit_hash" > version.txt

# 建構與推送 Docker 映像
echo "📦 建立 Docker 映像..."
docker build -t "$IMAGE_URI" .
docker push "$IMAGE_URI"
if [ $? -ne 0 ]; then
  echo "❌ 推送映像失敗"
  exit 1
fi

# 確認 Cloud Run 服務是否存在
SERVICE_EXISTS=$(gcloud run services describe "$SERVICE_NAME" --region="$REGION" --format="value(metadata.name)" 2>/dev/null)
if [ -z "$SERVICE_EXISTS" ]; then
  echo "🆕 初次建立服務（直接導流）"
  NO_TRAFFIC_FLAG=""
else
  echo "🔁 服務已存在，使用 --no-traffic 部署"
  NO_TRAFFIC_FLAG="--no-traffic"
fi

# 部署至 Cloud Run
echo "🚀 部署至 Cloud Run：$SERVICE_NAME (DEPLOY_ENV=$DEPLOY_ENV)"
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_URI" \
  --region "$REGION" \
  --allow-unauthenticated \
  $NO_TRAFFIC_FLAG \
  --set-env-vars "DEPLOY_ENV=$DEPLOY_ENV" \
  --set-env-vars "CORS_ORIGINS=re:https://geopingkak--staging.*\.web\.app" \
  --set-secrets "ADMIN_API_KEY=ADMIN_API_KEY:latest,GEOGUESSR_NCFA=GEOGUESSR_NCFA:latest,VIDEO_EXPLANATIONS_ADMIN_TOKEN=VIDEO_EXPLANATIONS_ADMIN_TOKEN:latest"

if [ $? -ne 0 ]; then
  echo "❌ 部署失敗"
  exit 1
fi

# 切換流量（若服務已存在）
if [ -n "$NO_TRAFFIC_FLAG" ]; then
  echo "🔍 查詢 READY revision..."
  LATEST_READY_REVISION=$(gcloud run revisions list \
    --service="$SERVICE_NAME" \
    --region="$REGION" \
    --filter="status.conditions.type=Ready AND status.conditions.status=True" \
    --sort-by="~metadata.creationTimestamp" \
    --limit=1 \
    --format="value(metadata.name)")

  if [ -n "$LATEST_READY_REVISION" ]; then
    gcloud run services update-traffic "$SERVICE_NAME" \
      --region="$REGION" \
      --to-revisions="$LATEST_READY_REVISION=100"
    echo "✅ 已導流至：$LATEST_READY_REVISION"
  else
    echo "❌ 找不到 READY revision"
    exit 1
  fi
else
  echo "✅ 初次部署完成，已導流"
fi

# 取得部署後的服務 URL 並更新前端 .env.staging
echo ""
echo "🔍 取得服務 URL..."
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" \
  --region="$REGION" \
  --format="value(status.url)")

if [ -z "$SERVICE_URL" ]; then
  echo "⚠️  無法取得服務 URL，請手動更新前端 .env 檔案"
  exit 0
fi

echo "✅ 服務 URL: $SERVICE_URL"

ENV_FILE="../frontend/.env.staging"
echo ""
echo "📝 自動更新 frontend/.env.staging"
echo "NEXT_PUBLIC_API_BASE=$SERVICE_URL" > "$ENV_FILE"

if [ $? -eq 0 ]; then
  echo "✅ 已更新 $ENV_FILE"
  echo "   NEXT_PUBLIC_API_BASE=$SERVICE_URL"
  echo ""
  echo "🚀 下一步：部署前端"
  echo "   cd ../frontend && ./deploy.sh staging"
else
  echo "❌ 更新 $ENV_FILE 失敗，請手動更新"
fi
