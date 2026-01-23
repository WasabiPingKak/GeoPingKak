import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 道路通行方向教學 | 靠左行駛國家列表 - GeoPingKak",
    description: "了解全球道路通行方向分佈！靠左行駛的國家相對少數，掌握這個知識能快速縮小 GeoGuessr 的猜測範圍。完整靠左行駛國家列表。",
    openGraph: {
      title: "GeoGuessr 道路通行方向判斷教學 - GeoPingKak",
      description: "靠左行駛的國家相對少數，是重要的判斷依據。完整靠左行駛國家列表與判斷技巧。",
      url: "https://geopingkak.web.app/tutorial/driving-side",
      siteName: "GeoPingKak",
      locale: "zh_TW",
      type: "article",
      images: [
        {
          url: "https://geopingkak.web.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "GeoGuessr 道路通行方向 - GeoPingKak",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GeoGuessr 道路通行方向教學 - GeoPingKak",
      description: "靠左行駛國家列表與判斷技巧，快速縮小猜測範圍。",
      images: ["https://geopingkak.web.app/og-image.png"],
    },
    alternates: {
      canonical: "https://geopingkak.web.app/tutorial/driving-side",
    },
  };
}
