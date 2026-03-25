#!/bin/bash

# 部署 GeoPingKak 前端到 Staging 環境（Firebase Hosting Channel）
# Production 部署請使用 CI/CD（push 到 main 自動觸發 GitHub Actions）

set -e

# 驗證環境參數
if [ "$1" != "staging" ]; then
  echo "使用方式："
  echo "  ./deploy.sh staging    # 部署到 Staging 環境 (Firebase Hosting Channel)"
  echo ""
  echo "Production 部署請 push 到 main branch，由 GitHub Actions 自動執行。"
  exit 1
fi

echo "🟡 部署至 Staging 環境"
npm run deploy:staging

echo "✅ 部署完成！"
