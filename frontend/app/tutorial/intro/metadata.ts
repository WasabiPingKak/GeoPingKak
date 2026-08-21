import type { Metadata } from "next";
import { PAGE_MODIFIED } from "@/data/pageDates";

export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 新手入門攻略｜從零開始學推理技巧 - GeoPingKak",
    description: "GeoGuessr 怎麼玩？新手該怎麼練？本篇教你建立推理思路與基礎技巧，不靠死背，從觀察世界開始的中文入門攻略。",
    openGraph: {
      title: "GeoGuessr 新手入門攻略｜推理技巧建立 - GeoPingKak",
      description: "GeoGuessr 新手怎麼練？建立推理思路與基礎技巧，不靠死背、從觀察世界開始。",
      url: "https://geopingkak.web.app/tutorial/intro",
      siteName: "GeoPingKak",
      locale: "zh_TW",
      type: "article",
      images: [
        {
          url: "https://geopingkak.web.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "GeoGuessr 新手入門指南 - GeoPingKak",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GeoGuessr 新手入門指南 - GeoPingKak",
      description: "了解 GeoGuessr 的魅力與正確的學習方向，適合完全新手的中文入門指南。",
      images: ["https://geopingkak.web.app/og-image.png"],
    },
    alternates: {
      canonical: "https://geopingkak.web.app/tutorial/intro",
    },
    other: {
      "article:published_time": "2026-01-24",
      "article:modified_time": PAGE_MODIFIED["/tutorial/intro"],
    },
  };
}
