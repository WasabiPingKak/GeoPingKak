import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 國旗與網域辨識教學 | 國旗判斷國家技巧 - GeoPingKak",
    description: "學習如何透過路邊國旗、廣告招牌與網域後綴辨識國家。國旗辨識是 GeoGuessr 中最直觀的判斷方式之一。",
    openGraph: {
      title: "GeoGuessr 國旗與網域辨識教學 - GeoPingKak",
      description: "透過路邊國旗、廣告招牌與網域後綴辨識國家，最直觀的判斷方式。",
      url: "https://geopingkak.web.app/tutorial/flags-domains",
      siteName: "GeoPingKak",
      locale: "zh_TW",
      type: "article",
      images: [
        {
          url: "https://geopingkak.web.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "GeoGuessr 國旗與網域辨識 - GeoPingKak",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GeoGuessr 國旗與網域辨識教學 - GeoPingKak",
      description: "透過路邊國旗、廣告招牌與網域後綴辨識國家的完整教學。",
      images: ["https://geopingkak.web.app/og-image.png"],
    },
    alternates: {
      canonical: "https://geopingkak.web.app/tutorial/flags-domains",
    },
  };
}
