// src/app/community-maps/page.tsx

import React from "react";
import type { Metadata } from "next";
import RecommendedMapIntro from "@/components/community-maps/RecommendedMapIntro";
import CommunityMapList from "@/components/community-maps/CommunityMapList";

export const metadata: Metadata = {
  title: "GeoGuessr 地圖推薦清單 | 社群精選免費地圖 - GeoPingKak",
  description: "由社群玩家推薦的優質 GeoGuessr 地圖集合，包含台灣在地場景、各國特色主題地圖，免費遊玩、發掘更多有趣的遊戲內容。",
  alternates: {
    canonical: "https://geopingkak.web.app/community-maps",
  },
  openGraph: {
    title: "GeoGuessr 地圖推薦清單 | 社群精選免費地圖 - GeoPingKak",
    description: "社群玩家推薦的優質 GeoGuessr 地圖集合，包含台灣在地場景與各國特色主題地圖。",
    url: "https://geopingkak.web.app/community-maps",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoGuessr 社群推薦地圖 - GeoPingKak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 地圖推薦清單 - GeoPingKak",
    description: "社群精選的優質 GeoGuessr 地圖，台灣場景與各國特色主題地圖，免費遊玩。",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
};

export default function CommunityMapPage() {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 pt-10 pb-16">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
        GeoGuessr 推薦社群地圖清單
      </h1>
      <RecommendedMapIntro />
      <CommunityMapList />
    </div>
  );
}
