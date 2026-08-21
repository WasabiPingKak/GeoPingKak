import JsonLd from "@/components/shared/JsonLd";
import { generateMetadata } from "./metadata";
import SunPositionClient from "./client";
import { PAGE_DATES, toIsoDateTime } from "@/data/pageDates";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "GeoGuessr 太陽位置判斷教學",
          "image": "https://geopingkak.web.app/og-image.png",
          "description": "學會用太陽方位判斷南北半球與緯度範圍，實用的推理技巧。",
          "author": { "@type": "Person", "name": "山葵冰角 Wasabi Pingkak", "url": "https://geopingkak.web.app/about" },
          "publisher": { "@type": "Organization", "name": "GeoPingKak" },
          "datePublished": toIsoDateTime(PAGE_DATES["/tutorial/sun-position"].published),
          "dateModified": toIsoDateTime(PAGE_DATES["/tutorial/sun-position"].modified),
          "inLanguage": "zh-TW",
          "mainEntityOfPage": "https://geopingkak.web.app/tutorial/sun-position"
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
            { "@type": "ListItem", "position": 2, "name": "教學", "item": "https://geopingkak.web.app/tutorial/intro" },
            { "@type": "ListItem", "position": 3, "name": "太陽位置" }
          ]
        }
      ]} />
      <SunPositionClient />
    </>
  );
}
