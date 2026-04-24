import Script from "next/script";
import { generateMetadata } from "./metadata";
import DrivingSideClient from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <Script id="tutorial-driving-side-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "GeoGuessr 道路通行方向判斷教學",
            "description": "了解全球道路通行方向分佈，靠左行駛的國家相對少數，掌握這個知識能快速縮小猜測範圍。",
            "author": { "@type": "Person", "name": "山葵冰角 Wasabi Pingkak", "url": "https://geopingkak.web.app/about" },
            "publisher": { "@type": "Organization", "name": "GeoPingKak" },
            "datePublished": "2026-01-24",
            "dateModified": "2026-03-21",
            "inLanguage": "zh-TW",
            "mainEntityOfPage": "https://geopingkak.web.app/tutorial/driving-side"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
              { "@type": "ListItem", "position": 2, "name": "教學", "item": "https://geopingkak.web.app/tutorial" },
              { "@type": "ListItem", "position": 3, "name": "道路通行方向" }
            ]
          }
        ])}
      </Script>
      <DrivingSideClient />
    </>
  );
}
