import Script from "next/script";
import { generateMetadata } from "./metadata";
import SunPositionClient from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <Script id="tutorial-sun-position-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "GeoGuessr 太陽位置判斷教學",
            "description": "學會用太陽方位判斷南北半球與緯度範圍，實用的推理技巧。",
            "author": { "@type": "Organization", "name": "GeoPingKak" },
            "publisher": { "@type": "Organization", "name": "GeoPingKak" },
            "datePublished": "2026-01-24",
            "dateModified": "2026-03-21",
            "inLanguage": "zh-TW",
            "mainEntityOfPage": "https://geopingkak.web.app/tutorial/sun-position"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
              { "@type": "ListItem", "position": 2, "name": "教學", "item": "https://geopingkak.web.app/tutorial" },
              { "@type": "ListItem", "position": 3, "name": "太陽位置" }
            ]
          }
        ])}
      </Script>
      <SunPositionClient />
    </>
  );
}
