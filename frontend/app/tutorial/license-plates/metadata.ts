import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 車牌辨識教學 | 歐盟車牌、亞洲車牌特徵解析 - GeoPingKak",
    description: "詳細解說各國車牌特徵：歐盟藍條車牌、亞洲車牌差異、美洲車牌樣式。透過車牌快速辨識 GeoGuessr 中國家的實戰技巧完整教學。",
    openGraph: {
      title: "GeoGuessr 車牌辨識完整教學 - GeoPingKak",
      description: "歐盟藍條車牌、亞洲車牌、美洲車牌...各國車牌特徵詳解，教你快速辨識國家。",
      url: "https://geopingkak.web.app/tutorial/license-plates",
      siteName: "GeoPingKak",
      locale: "zh_TW",
      type: "article",
      images: [
        {
          url: "https://geopingkak.web.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "GeoGuessr 車牌辨識教學 - GeoPingKak",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GeoGuessr 車牌辨識完整教學 - GeoPingKak",
      description: "歐盟藍條車牌、亞洲車牌、美洲車牌特徵詳解，教你快速辨識國家。",
      images: ["https://geopingkak.web.app/og-image.png"],
    },
    alternates: {
      canonical: "https://geopingkak.web.app/tutorial/license-plates",
    },
  };
}
