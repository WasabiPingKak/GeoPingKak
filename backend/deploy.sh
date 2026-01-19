#!/bin/bash

# ✅ 讀取環境參數（預設為 production）
ENV=${1:-production}

# ✅ 根據環境設定服務名稱與環境變數
if [ "$ENV" = "staging" ]; then
  SERVICE_NAME="geopingkak-backend-staging"
  DEPLOY_ENV="staging"
  echo "🟡 部署至 Staging 環境"
elif [ "$ENV" = "prod" ] || [ "$ENV" = "production" ]; then
  SERVICE_NAME="geopingkak-backend"
  DEPLOY_ENV="production"
  echo "🟢 部署至 Production 環境"
else
  echo "❌ 無效的環境參數: $ENV"
  echo "使用方式: ./deploy.sh [staging|prod|production]"
  exit 1
fi

# ✅ 設定部署參數
GOOGLE_CLOUD_PROJECT="geopingkak"
REGION="asia-east1"
REPO_NAME="geopingkak-backend-repo"

# (已移除 .env 讀取區塊)

# ✅ Docker 映像名稱
IMAGE_URI="asia-east1-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/$REPO_NAME/$SERVICE_NAME"

# ✅ 設定 GCP 專案
echo "🔧 設定 GCP 專案 ID: $GOOGLE_CLOUD_PROJECT"
gcloud config set project "$GOOGLE_CLOUD_PROJECT"

# ✅ 寫入 Git Commit Hash 至 version.txt
commit_hash=$(git rev-parse --short=6 HEAD)
echo "🔖 寫入 Git Commit Hash: $commit_hash"
echo "$commit_hash" > version.txt

# ✅ 建構與推送 Docker 映像
echo "📦 建立 Docker 映像..."
docker build -t "$IMAGE_URI" .
docker push "$IMAGE_URI"
if [ $? -ne 0 ]; then
  echo "❌ 推送映像失敗"
  exit 1
fi

# ✅ 確認 Cloud Run 服務是否存在
SERVICE_EXISTS=$(gcloud run services describe "$SERVICE_NAME" --region="$REGION" --format="value(metadata.name)" 2>/dev/null)
if [ -z "$SERVICE_EXISTS" ]; then
  echo "🆕 初次建立服務（直接導流）"
  NO_TRAFFIC_FLAG=""
else
  echo "🔁 服務已存在，使用 --no-traffic 部署"
  NO_TRAFFIC_FLAG="--no-traffic"
fi

# ✅ 部署至 Cloud Run
# 使用 --set-secrets 讀取 Secret Manager
# 使用 --set-env-vars 設定非敏感變數
echo "🚀 部署至 Cloud Run：$SERVICE_NAME (DEPLOY_ENV=$DEPLOY_ENV)"
gcloud run deploy "$SERVICE_NAME" \
  --image "$IMAGE_URI" \
  --region "$REGION" \
  --allow-unauthenticated \
  $NO_TRAFFIC_FLAG \
  --set-env-vars "DEPLOY_ENV=$DEPLOY_ENV" \
  --set-secrets "ADMIN_API_KEY=ADMIN_API_KEY:latest,GEOGUESSR_NCFA=GEOGUESSR_NCFA:latest"

if [ $? -ne 0 ]; then
  echo "❌ 部署失敗"
  exit 1
fi

# ✅ 切換流量（若服務已存在）
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