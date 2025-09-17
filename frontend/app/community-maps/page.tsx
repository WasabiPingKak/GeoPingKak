// src/app/community-maps/page.tsx

import React from "react";
import RecommendedMapIntro from "@/components/community-maps/RecommendedMapIntro";
import CommunityMapList from "@/components/community-maps/CommunityMapList";

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
