import Script from "next/script";
import { generateMetadata } from "./metadata";
import FlagsDomainsClient from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <Script id="tutorial-flags-domains-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": "GeoGuessr 國旗與網域辨識教學",
            "description": "學習如何透過路邊國旗、廣告招牌與網域後綴辨識國家。",
            "author": { "@type": "Person", "name": "山葵冰角 Wasabi Pingkak", "url": "https://geopingkak.web.app/about" },
            "publisher": { "@type": "Organization", "name": "GeoPingKak" },
            "datePublished": "2026-01-24",
            "dateModified": "2026-03-21",
            "inLanguage": "zh-TW",
            "mainEntityOfPage": "https://geopingkak.web.app/tutorial/flags-domains"
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
              { "@type": "ListItem", "position": 2, "name": "教學", "item": "https://geopingkak.web.app/tutorial" },
              { "@type": "ListItem", "position": 3, "name": "國旗與網域" }
            ]
          }
        ])}
      </Script>
      <FlagsDomainsClient />
    </>
  );
}
