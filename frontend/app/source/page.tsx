import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import RelatedLinks from "@/components/shared/RelatedLinks";

export const metadata: Metadata = {
  title: "GeoGuessr 進階學習資源 | 攻略網站與工具推薦 - GeoPingKak",
  description: "精選 GeoGuessr 進階學習資源：Plonk It、GeoTips、GeoHints 等攻略網站介紹，幫助你從新手晉升高手。",
  alternates: {
    canonical: "https://geopingkak.web.app/source",
  },
  openGraph: {
    title: "GeoGuessr 進階學習資源 | 攻略網站與工具推薦 - GeoPingKak",
    description: "精選 GeoGuessr 進階學習資源：Plonk It、GeoTips、GeoHints 等攻略網站介紹。",
    url: "https://geopingkak.web.app/source",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoGuessr 進階學習資源 - GeoPingKak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 進階學習資源 - GeoPingKak",
    description: "Plonk It、GeoTips、GeoHints 等攻略網站介紹，從新手晉升高手。",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
  other: {
    "article:published_time": "2025-07-31",
    "article:modified_time": "2026-03-21",
  },
};

export default function SourcePage() {
  const sources = [
    {
      name: "Plonk It",
      url: "https://www.plonkit.net/",
      description:
        "最有名的 Geoguessr 攻略網站，也是目前世界最大的 Geoguessr 玩家社群。\n核心遊戲玩家不能不認識的網站。",
    },
    {
      name: "GeoTips",
      url: "https://geotips.net/",
      description:
        "定位與 Plonk It 類似，但提供的資源與攻略角度不同，是個很適合與 Plonk It 交叉參考的網站。",
    },
    {
      name: "GeoHints",
      url: "https://geohints.com/",
      description:
        "跟 Plonk It 與 GeoTips 不同，GeoHints 是一個針對特定特徵所設計的索引型網站，集中整理了各國的號誌、街景車、路樁、電線桿等細節資訊。\n\n這個網站最適合用來快速比對「同一項物件在不同國家之間的差異」。\n雖然它不太適合新手當作起點，但當你的實力提升後，它將會成為非常有價值的參考資源。",
    },
    {
      name: "图寻文档",
      url: "https://www.yuque.com/chaofun/tuxun",
      description:
        "中國的地理猜謎網站「图寻」的攻略，裡面有經過授權翻譯後的 Plonk It 教學，以及中國社群的整理與討論。\n\n沒錯，中國有自己的 GeoGuessr。",
    },
    {
      name: "Reddit - GeoGuessr 討論區",
      url: "https://www.reddit.com/r/geoguessr/",
      description:
        "各種 GeoGuessr 迷因與遊戲討論。\n討論區中常常會看到新手提問，老手的回應中常有思考脈絡與更細節的線索，不同於系統化的攻略資源，幫助非常的大。",
    },
    {
      name: "維基百科",
      url: "https://zh.wikipedia.org/",
      description:
        "沒有錯，就是維基百科。\n這個遊戲裡的攻略都來自於真實世界的知識，維基百科是我在這個遊戲中，查詢數量僅次於 Plonk It 的資訊來源。",
    },
  ];

  return (
    <>
      <Script id="source-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": "GeoGuessr 進階學習資源",
            "description": "精選 GeoGuessr 進階學習資源與攻略網站推薦",
            "numberOfItems": sources.length,
            "datePublished": "2025-07-31",
            "dateModified": "2026-03-21",
            "inLanguage": "zh-TW",
            "itemListElement": sources.map((src, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "name": src.name,
              "url": src.url
            }))
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
              { "@type": "ListItem", "position": 2, "name": "進階學習資源" }
            ]
          }
        ])}
      </Script>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">進階學習資源</h1>

      <div className="grid gap-4 md:grid-cols-2">
        {sources.map((src) => (
          <div
            key={src.url}
            className="border border-border rounded-lg p-4 bg-card shadow-sm space-y-2"
          >
            {/* 標題 */}
            <h2 className="text-lg font-semibold text-white">{src.name}</h2>

            {/* 連結 */}
            <a
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline break-all"
            >
              {src.url}
            </a>

            {/* 文案 */}
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {src.description}
            </p>
          </div>
        ))}
      </div>
      <RelatedLinks links={[
        { href: "/tutorial", title: "入門教學", description: "從零開始學 GeoGuessr，掌握各種判斷技巧" },
        { href: "/glossary", title: "名詞解釋", description: "GeoGuessr 常見術語與遊戲名詞中文對照" },
        { href: "/quick-reference", title: "速查筆記", description: "巴西電話區碼、印尼文地名等實用速查工具" },
      ]} />
    </div>
    </>
  );
}
