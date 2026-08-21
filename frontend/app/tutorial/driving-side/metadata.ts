import type { Metadata } from "next";
import { PAGE_MODIFIED } from "@/data/pageDates";

export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 靠左／靠右行駛判斷技巧｜全球通行方向教學 - GeoPingKak",
    description: "GeoGuessr 看到道路怎麼判斷國家？靠左行駛的國家全球只有約 60 個，掌握這個技巧能瞬間縮小猜測範圍。完整靠左行駛國家列表與實戰判斷教學。",
    openGraph: {
      title: "GeoGuessr 靠左／靠右行駛判斷技巧 - GeoPingKak",
      description: "全球只有約 60 個國家靠左行駛，是 GeoGuessr 最快縮小範圍的判斷技巧之一。",
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
    other: {
      "article:published_time": "2026-01-24",
      "article:modified_time": PAGE_MODIFIED["/tutorial/driving-side"],
    },
  };
}
