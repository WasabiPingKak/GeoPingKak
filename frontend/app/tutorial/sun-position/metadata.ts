import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 太陽位置判斷教學 | 南北半球與緯度推理 - GeoPingKak",
    description: "學會用太陽方位判斷南北半球與緯度範圍！太陽在北方代表南半球，在南方代表北半球。GeoGuessr 實用的推理技巧教學。",
    openGraph: {
      title: "GeoGuessr 太陽位置判斷教學 - GeoPingKak",
      description: "利用太陽方位判斷南北半球與緯度範圍，實用的 GeoGuessr 推理技巧。",
      url: "https://geopingkak.web.app/tutorial/sun-position",
      siteName: "GeoPingKak",
      locale: "zh_TW",
      type: "article",
      images: [
        {
          url: "https://geopingkak.web.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "GeoGuessr 太陽位置判斷 - GeoPingKak",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GeoGuessr 太陽位置判斷教學 - GeoPingKak",
      description: "利用太陽方位判斷南北半球與緯度範圍的實用推理技巧。",
      images: ["https://geopingkak.web.app/og-image.png"],
    },
    alternates: {
      canonical: "https://geopingkak.web.app/tutorial/sun-position",
    },
  };
}
