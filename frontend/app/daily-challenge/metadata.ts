// app/daily-challenge/metadata.ts

import type { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "GeoGuessr 免費每日挑戰 | 台灣、日本、世界地圖 - 免登入立即玩 - GeoPingKak",
  description:
    "每天更新！GeoGuessr 免費挑戰模式（challenge links），提供世界、台灣、日本地圖，完全免費、免登入、不限時間。過去的連結也可以重複練習，適合新手玩家。",
  alternates: {
    canonical: "https://geopingkak.web.app/daily-challenge",
  },
  openGraph: {
    title: "GeoGuessr 免費每日挑戰 | 台灣、日本、世界地圖 - 免登入 - GeoPingKak",
    description:
      "每天更新 GeoGuessr 免費挑戰模式（challenge links），提供世界、台灣、日本地圖。完全免費、免登入、不限時間，適合新手玩家。",
    url: "https://geopingkak.web.app/daily-challenge",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoGuessr 免費每日挑戰 - GeoPingKak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 免費每日挑戰 | 免登入立即玩 - GeoPingKak",
    description:
      "每天更新！提供世界、台灣、日本地圖。完全免費、免登入、不限時間，過去連結可重複練習。",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
});
