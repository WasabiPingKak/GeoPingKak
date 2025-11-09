// app/daily-challenge/metadata.ts

import type { Metadata } from "next";

export const generateMetadata = (): Metadata => ({
  title: "GeoGuessr 每日挑戰連結 | GeoPingKak 免費每日地圖推薦",
  description:
    "每日更新 GeoGuessr 挑戰連結（geoguessr challenge），提供世界地圖、台灣、日本等主題，不需登入帳號即可免費遊玩。過去連結也可重複練習。",
  openGraph: {
    title: "GeoGuessr 每日挑戰連結 | GeoPingKak",
    description:
      "提供 GeoGuessr 免費挑戰模式（geoguessr challenge links），每日五題題目不限時、不需登入、可自由練習，支援台灣、日本、世界等地圖。",
    url: "https://geopingkak.web.app/daily-challenge",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoGuessr 每日挑戰入口",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 免費每日挑戰連結 | GeoPingKak",
    description:
      "每日更新 GeoGuessr 挑戰題目，不需登入也能免費遊玩 geoguessr daily challenge。",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
});
