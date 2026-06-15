#!/bin/bash

# 部署 GeoPingKak Assistant 後端到 Staging 環境（Cloud Run）

set -e

if [ "$1" != "--staging" ]; then
  echo "使用方式："
  echo "  ./deploy.sh --staging    # 部署到 Staging 環境"
  exit 1
fi

echo "🟡 部署 Assistant 至 Staging 環境"

SERVICE_NAME="geopingkak-assistant-staging"
DEPLOY_ENV="staging"
GOOGLE_CLOUD_PROJECT="geopingkak"
REGION="asia-east1"
REPO_NAME="geopingkak-backend-repo"
IMAGE_URI="asia-east1-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/$REPO_NAME/$SERVICE_NAME"

echo "🔧 設定 GCP 專案 ID: $GOOGLE_CLOUD_PROJECT"
gcloud config set project "$GOOGLE_CLOUD_PROJECT"

# 建構與推送 Docker 映像（commit hash + latest 雙 tag）
commit_hash=$(git rev-parse --short=6 HEAD)
echo "📦 建立 Docker 映像 ($commit_hash)..."
docker build -t "$IMAGE_URI:$commit_hash" -t "$IMAGE_URI:latest" .
docker push "$IMAGE_URI:$commit_hash"
docker push "$IMAGE_URI:latest"

# 確認 Cloud Run 服務是否存在
SERVICE_EXISTS=$(gcloud run services describe "$SERVICE_NAME" --region="$REGION" --format="value(metadata.name)" 2>/dev/null || true)
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
  --image "$IMAGE_URI:$commit_hash" \
  --region "$REGION" \
  --allow-unauthenticated \
  $NO_TRAFFIC_FLAG \
  --max-instances=1 \
  --set-env-vars "DEPLOY_ENV=$DEPLOY_ENV" \
  --set-env-vars "CORS_ORIGINS=re:https://geopingkak--staging.*\.web\.app" \
  --set-secrets "SUPABASE_DB_URL=SUPABASE_DB_URL:latest"

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

# 取得服務 URL 並更新前端 .env.staging
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" \
  --region="$REGION" \
  --format="value(status.url)")

echo ""
echo "✅ 服務 URL: $SERVICE_URL"

ENV_FILE="../frontend/.env.staging"
echo ""
echo "📝 更新 frontend/.env.staging"

# 保留既有的 NEXT_PUBLIC_API_BASE，附加或更新 NEXT_PUBLIC_ASSISTANT_API_BASE
if [ -f "$ENV_FILE" ]; then
  # 移除舊的 NEXT_PUBLIC_ASSISTANT_API_BASE 行
  grep -v "^NEXT_PUBLIC_ASSISTANT_API_BASE" "$ENV_FILE" > "$ENV_FILE.tmp" || true
  mv "$ENV_FILE.tmp" "$ENV_FILE"
fi
echo "NEXT_PUBLIC_ASSISTANT_API_BASE=$SERVICE_URL" >> "$ENV_FILE"

echo "✅ 已更新 $ENV_FILE"
cat "$ENV_FILE"
