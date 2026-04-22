// app/daily-challenge/metadata.ts

import type { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "GeoGuessr 免費玩！每日挑戰連結 | 免登入、免註冊 - GeoPingKak",
  description:
    "每天更新的 GeoGuessr 免費挑戰連結！不用付費、不用註冊，點開就能玩。提供世界、台灣、日本等地圖，過去的題目也可以重複練習，新手老手都適合。",
  alternates: {
    canonical: "https://geopingkak.web.app/daily-challenge",
  },
  openGraph: {
    title: "GeoGuessr 免費玩！每日挑戰連結 | 免登入即玩 - GeoPingKak",
    description:
      "每天更新的 GeoGuessr 免費挑戰連結！不用付費、不用註冊，點開就能玩。世界、台灣、日本地圖每日更新。",
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
    title: "GeoGuessr 免費玩！每日挑戰連結 - GeoPingKak",
    description:
      "每天更新！不用付費、不用註冊，點開就能玩。世界、台灣、日本地圖每日更新，歷史題目可重複練習。",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
  other: {
    "article:published_time": "2025-07-29",
    "article:modified_time": "2026-04-22",
  },
});
