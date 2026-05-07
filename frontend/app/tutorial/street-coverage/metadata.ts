import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return {
    title: "GeoGuessr 街景覆蓋國家技巧｜哪些國家有 Google 街景 - GeoPingKak",
    description: "GeoGuessr 哪些國家有街景？全球只有約 100 個國家被 Google 街景覆蓋，掌握範圍就能快速排除不可能的選項。各洲覆蓋一覽與實用判斷技巧。",
    openGraph: {
      title: "GeoGuessr 街景覆蓋國家技巧一覽 - GeoPingKak",
      description: "全球只有約 100 個國家有 Google 街景，這是 GeoGuessr 最基本的排除技巧。各洲覆蓋情況一覽。",
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
    other: {
      "article:published_time": "2026-01-24",
      "article:modified_time": "2026-03-21",
    },
  };
}
