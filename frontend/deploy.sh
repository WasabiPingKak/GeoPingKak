#!/bin/bash

# ❇️ 部署 GeoPingKak 前端到 Firebase Hosting
# 若出錯將停止執行
set -e

# ✅ 強制要求環境參數
if [ -z "$1" ]; then
  echo "❌ 錯誤：必須指定部署環境"
  echo ""
  echo "使用方式："
  echo "  ./deploy.sh staging    # 部署到 Staging 環境 (Firebase Hosting Channel)"
  echo "  ./deploy.sh prod       # 部署到 Production 環境 (Firebase Hosting)"
  exit 1
fi

ENV=$1

# ✅ 根據環境執行對應的部署指令
if [ "$ENV" = "staging" ]; then
  echo "🟡 部署至 Staging 環境"
  npm run deploy:staging
elif [ "$ENV" = "prod" ] || [ "$ENV" = "production" ]; then
  echo "🟢 部署至 Production 環境"
  npm run deploy:prod
else
  echo "❌ 無效的環境參數: $ENV"
  echo "使用方式: ./deploy.sh [staging|prod]"
  exit 1
fi

echo "✅ 部署完成！"
