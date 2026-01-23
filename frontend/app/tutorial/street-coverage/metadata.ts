import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 街景覆蓋國家一覽 | 哪些國家有 Google 街景 - GeoPingKak",
    description: "掌握全球 Google 街景覆蓋範圍！了解哪些國家有街景、各洲覆蓋情況，快速排除不可能的國家，縮小 GeoGuessr 猜測範圍。",
    openGraph: {
      title: "GeoGuessr 街景覆蓋國家完整列表 - GeoPingKak",
      description: "全球只有約 100 個國家有 Google 街景，掌握覆蓋範圍就能快速縮小猜測範圍。各洲覆蓋情況一覽。",
      url: "https://geopingkak.web.app/tutorial/street-coverage",
      siteName: "GeoPingKak",
      locale: "zh_TW",
      type: "article",
      images: [
        {
          url: "https://geopingkak.web.app/og-image.png",
          width: 1200,
          height: 630,
          alt: "GeoGuessr 街景覆蓋國家 - GeoPingKak",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "GeoGuessr 街景覆蓋國家一覽 - GeoPingKak",
      description: "哪些國家有 Google 街景？各洲覆蓋情況完整列表，快速縮小猜測範圍。",
      images: ["https://geopingkak.web.app/og-image.png"],
    },
    alternates: {
      canonical: "https://geopingkak.web.app/tutorial/street-coverage",
    },
  };
}
