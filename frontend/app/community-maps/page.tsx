// src/app/community-maps/page.tsx

import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import RelatedLinks from "@/components/shared/RelatedLinks";
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
  other: {
    "article:published_time": "2025-09-17",
    "article:modified_time": "2026-03-21",
  },
};

export default function CommunityMapPage() {
  return (
    <>
      <Script id="community-maps-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "GeoGuessr 推薦社群地圖清單",
            "description": "由社群玩家推薦的優質 GeoGuessr 地圖集合",
            "datePublished": "2025-09-17",
            "dateModified": "2026-03-21",
            "inLanguage": "zh-TW"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
              { "@type": "ListItem", "position": 2, "name": "社群地圖推薦" }
            ]
          }
        ])}
      </Script>
    <div className="w-full px-4 md:px-6 lg:px-8 pt-10 pb-16">
      <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
        GeoGuessr 推薦社群地圖清單
      </h1>
      <RecommendedMapIntro />
      <CommunityMapList />
      <RelatedLinks links={[
        { href: "/special-maps", title: "特殊主題地圖", description: "精選趣味挑戰題庫，各國特色場景免費遊玩" },
        { href: "/daily-challenge", title: "每日免費挑戰", description: "每天更新的免費挑戰連結，不用登入直接玩" },
        { href: "/tutorial", title: "入門教學", description: "從零開始學 GeoGuessr，掌握各種判斷技巧" },
      ]} />
    </div>
    </>
  );
}
