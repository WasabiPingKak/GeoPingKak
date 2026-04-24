import Script from "next/script";
import { generateMetadata } from "./metadata";
import IntroClient from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <Script id="tutorial-intro-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "GeoGuessr 新手入門指南",
            "description": "了解 GeoGuessr 的魅力與正確的學習方向，從觀察世界開始建立推理邏輯。",
            "author": { "@type": "Person", "name": "山葵冰角 Wasabi Pingkak", "url": "https://geopingkak.web.app/about" },
            "publisher": { "@type": "Organization", "name": "GeoPingKak" },
            "datePublished": "2026-01-24",
            "dateModified": "2026-03-21",
            "inLanguage": "zh-TW",
            "mainEntityOfPage": "https://geopingkak.web.app/tutorial/intro"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
              { "@type": "ListItem", "position": 2, "name": "教學", "item": "https://geopingkak.web.app/tutorial" },
              { "@type": "ListItem", "position": 3, "name": "新手入門" }
            ]
          }
        ])}
      </Script>
      <IntroClient />
    </>
  );
}
