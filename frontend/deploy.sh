#!/bin/bash

# ❇️ 部署 GeoPingKak 專案到 Firebase Hosting
# 若出錯將停止執行（推薦）
set -e

echo "📦 Building Next.js 專案與 sitemap..."
npm run build

echo "🚀 Deploying to Firebase Hosting..."
firebase deploy

echo "✅ 部署完成！網站已更新至 geopingkak.web.app"
