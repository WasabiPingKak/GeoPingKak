import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GeoGuessr 遊戲直播企劃書與節目提案 - GeoPingKak",
  description:
    "提供 GeoGuessr 直播企劃提案與節目建議，包含育樂合作與娛樂企劃，適合 Vtuber 與實況主參考。",
  alternates: {
    canonical: "https://geopingkak.web.app/show-proposals",
  },
  openGraph: {
    title: "GeoGuessr 遊戲直播企劃書與節目提案 - GeoPingKak",
    description:
      "GeoGuessr 直播企劃提案與節目建議，適合 Vtuber 與實況主參考。",
    url: "https://geopingkak.web.app/show-proposals",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "article",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoGuessr 直播企劃提案 - GeoPingKak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 遊戲直播企劃書 - GeoPingKak",
    description: "GeoGuessr 直播企劃與節目提案，適合 Vtuber 與實況主參考。",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
  other: {
    "article:published_time": "2025-07-31",
    "article:modified_time": "2025-08-14",
  },
};
