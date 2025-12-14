// app/glossary/page.tsx
import React from "react";
import type { Metadata } from "next";
import GlossaryClientPage from "./client";

export const generateMetadata = (): Metadata => ({
  title: "名詞解釋 | GeoPingKak",
  description:
    "GeoGuessr 相關名詞解釋字典：以卡片式目錄整理常見術語，支援搜尋與圖片輔助。",
  openGraph: {
    title: "名詞解釋 | GeoPingKak",
    description:
      "GeoGuessr 相關名詞解釋字典：以卡片式目錄整理常見術語，支援搜尋與圖片輔助。",
    url: "https://geopingkak.web.app/glossary",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "article",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoPingKak 名詞解釋頁",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "名詞解釋 | GeoPingKak",
    description:
      "GeoGuessr 相關名詞解釋字典：支援搜尋與圖片輔助，快速查詢常見術語。",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
});

export default function GlossaryPage() {
  return (
    <div className="max-w-4xl">
      <GlossaryClientPage />
    </div>
  );
}
