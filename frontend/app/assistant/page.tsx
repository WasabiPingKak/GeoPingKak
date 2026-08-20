import React from "react";
import type { Metadata } from "next";
import AssistantClient from "./client";

export const metadata: Metadata = {
  title: "GeoGuessr 助手 | 地理辨識問答 - GeoPingKak",
  description:
    "用中文詢問任何 GeoGuessr 相關問題，助手會根據本站教學資料為你整理判斷技巧與策略建議。",
  alternates: {
    canonical: "https://geopingkak.web.app/assistant",
  },
  // 實驗功能，站內沒有連結，後端是付費的 LLM 問答。不讓搜尋引擎收錄，
  // 避免陌生流量直接打到付費端點。分享網址給別人用不受影響。
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "GeoGuessr 助手 | 地理辨識問答 - GeoPingKak",
    description:
      "用中文詢問任何 GeoGuessr 相關問題，助手會根據本站教學資料為你整理判斷技巧與策略建議。",
    url: "https://geopingkak.web.app/assistant",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoGuessr 助手 - GeoPingKak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 助手 | 地理辨識問答 - GeoPingKak",
    description:
      "用中文詢問任何 GeoGuessr 相關問題，助手會根據教學資料整理判斷技巧與建議。",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
};

export default function AssistantPage() {
  return <AssistantClient />;
}
