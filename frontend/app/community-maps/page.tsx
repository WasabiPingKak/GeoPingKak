// src/app/community-maps/page.tsx

import React from "react";
import type { Metadata } from "next";
import RecommendedMapIntro from "@/components/community-maps/RecommendedMapIntro";
import CommunityMapList from "@/components/community-maps/CommunityMapList";

export const metadata: Metadata = {
  title: "GeoGuessr 社群推薦地圖 | 玩家精選地圖分享 - GeoPingKak",
  description: "由社群玩家推薦的優質 GeoGuessr 地圖集合，包含台灣在地場景、特色主題地圖等，發掘更多有趣的遊戲內容。",
  alternates: {
    canonical: "https://geopingkak.web.app/community-maps",
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
