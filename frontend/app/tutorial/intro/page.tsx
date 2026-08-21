import JsonLd from "@/components/shared/JsonLd";
import { generateMetadata } from "./metadata";
import IntroClient from "./client";
import { PAGE_DATES, toIsoDateTime } from "@/data/pageDates";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "GeoGuessr 新手入門指南",
          "image": "https://geopingkak.web.app/og-image.png",
          "description": "了解 GeoGuessr 的魅力與正確的學習方向，從觀察世界開始建立推理邏輯。",
          "author": { "@type": "Person", "name": "山葵冰角 Wasabi Pingkak", "url": "https://geopingkak.web.app/about" },
          "publisher": { "@type": "Organization", "name": "GeoPingKak" },
          "datePublished": toIsoDateTime(PAGE_DATES["/tutorial/intro"].published),
          "dateModified": toIsoDateTime(PAGE_DATES["/tutorial/intro"].modified),
          "inLanguage": "zh-TW",
          "mainEntityOfPage": "https://geopingkak.web.app/tutorial/intro"
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
            { "@type": "ListItem", "position": 2, "name": "教學", "item": "https://geopingkak.web.app/tutorial/intro" },
            { "@type": "ListItem", "position": 3, "name": "新手入門" }
          ]
        }
      ]} />
      <IntroClient />
    </>
  );
}
