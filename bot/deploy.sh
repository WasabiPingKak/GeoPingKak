#!/bin/bash

# 部署 Discord Daily Challenge Bot 到 Cloud Run Job
# 用法：./deploy.sh --staging 或 ./deploy.sh --production

set -e

# 驗證環境參數
if [ "$1" != "--staging" ] && [ "$1" != "--production" ]; then
  echo "使用方式："
  echo "  ./deploy.sh --staging      # 部署到 Staging"
  echo "  ./deploy.sh --production   # 部署到 Production"
  exit 1
fi

if [ "$1" == "--staging" ]; then
  DEPLOY_ENV="staging"
  JOB_NAME="discord-daily-bot-staging"
  API_BASE_URL_SECRET="DISCORD_BOT_API_BASE_URL_STAGING"
  echo "🟡 部署至 Staging 環境"
else
  DEPLOY_ENV="production"
  JOB_NAME="discord-daily-bot"
  API_BASE_URL_SECRET="DISCORD_BOT_API_BASE_URL"
  echo "🟢 部署至 Production 環境"
fi

# GCP 設定
GOOGLE_CLOUD_PROJECT="geopingkak"
REGION="asia-east1"
REPO_NAME="geopingkak-backend-repo"
IMAGE_URI="asia-east1-docker.pkg.dev/$GOOGLE_CLOUD_PROJECT/$REPO_NAME/$JOB_NAME"

echo "🔧 設定 GCP 專案 ID: $GOOGLE_CLOUD_PROJECT"
gcloud config set project "$GOOGLE_CLOUD_PROJECT"

# 建構與推送 Docker 映像
echo "📦 建立 Docker 映像..."
docker build -t "$IMAGE_URI" .
docker push "$IMAGE_URI"
if [ $? -ne 0 ]; then
  echo "❌ 推送映像失敗"
  exit 1
fi

# 部署 Cloud Run Job（建立或更新）
echo "🚀 部署 Cloud Run Job：$JOB_NAME"
JOB_EXISTS=$(gcloud run jobs describe "$JOB_NAME" --region="$REGION" --format="value(metadata.name)" 2>/dev/null || true)

JOB_CMD="create"
if [ -n "$JOB_EXISTS" ]; then
  JOB_CMD="update"
  echo "🔁 Job 已存在，更新中..."
fi

gcloud run jobs $JOB_CMD "$JOB_NAME" \
  --image "$IMAGE_URI" \
  --region "$REGION" \
  --max-retries=1 \
  --task-timeout=120s \
  --set-secrets "\
API_BASE_URL=${API_BASE_URL_SECRET}:latest,\
DISCORD_WEBHOOK_WORLD=DISCORD_WEBHOOK_WORLD:latest,\
DISCORD_WEBHOOK_TW=DISCORD_WEBHOOK_TW:latest,\
DISCORD_WEBHOOK_JP=DISCORD_WEBHOOK_JP:latest"

if [ $? -ne 0 ]; then
  echo "❌ 部署失敗"
  exit 1
fi

echo "✅ Cloud Run Job 部署完成：$JOB_NAME"
echo ""
echo "📋 後續步驟："
echo "  1. 手動測試：gcloud run jobs execute $JOB_NAME --region=$REGION"
echo "  2. 設定 Cloud Scheduler（若尚未建立）："
echo "     gcloud scheduler jobs create http discord-daily-bot-scheduler \\"
echo "       --schedule='10 3 * * *' \\"
echo "       --time-zone='Asia/Taipei' \\"
echo "       --location=$REGION \\"
echo "       --uri='https://$REGION-run.googleapis.com/apis/run.googleapis.com/v1/namespaces/$GOOGLE_CLOUD_PROJECT/jobs/$JOB_NAME:run' \\"
echo "       --oauth-service-account-email=\$SERVICE_ACCOUNT_EMAIL"
