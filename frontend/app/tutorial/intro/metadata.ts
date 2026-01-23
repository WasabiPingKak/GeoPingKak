import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 新手入門指南 | 從零開始學推理 - GeoPingKak",
    description: "了解 GeoGuessr 的魅力與正確的學習方向。不靠死背，從觀察世界開始建立推理邏輯，適合完全新手的中文入門指南。",
    openGraph: {
      title: "GeoGuessr 新手入門指南 - GeoPingKak",
      description: "了解 GeoGuessr 的魅力與正確的學習方向。不靠死背，從觀察世界開始建立推理邏輯。",
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
  };
}
