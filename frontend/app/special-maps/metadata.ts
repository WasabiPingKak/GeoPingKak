import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 特殊主題地圖推薦 | 精選趣味挑戰地圖 - GeoPingKak",
    description: "精心挑選的 GeoGuessr 特殊主題地圖，包含各國特色場景、趣味挑戰題庫。每個連結都是固定五題，免費遊玩、可重複挑戰，探索更多地理樂趣！",
    openGraph: {
      title: "GeoGuessr 特殊主題地圖推薦 | 精選趣味挑戰 - GeoPingKak",
      description: "手選的 GeoGuessr 特色地圖題庫，各國主題挑戰等你來探索。免費、固定題目、可重複遊玩。",
      url: "https://geopingkak.web.app/special-maps",
      siteName: "GeoPingKak",
      locale: "zh_TW",
      type: "website",
      images: [
        {
          url: "https://geopingkak.web.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "GeoGuessr 特殊主題地圖推薦 - GeoPingKak",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GeoGuessr 特殊主題地圖推薦 - GeoPingKak",
      description: "精選特色地圖題庫，各國主題挑戰等你來探索。免費、可重複遊玩。",
      images: ["https://geopingkak.web.app/og-image.png"],
    },
    alternates: {
      canonical: "https://geopingkak.web.app/special-maps",
    },
  };
}
