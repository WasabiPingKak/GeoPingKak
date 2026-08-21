import JsonLd from "@/components/shared/JsonLd";
import { generateMetadata } from "./metadata";
import LicensePlatesClient from "./client";
import { PAGE_DATES, toIsoDateTime } from "@/data/pageDates";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "GeoGuessr 車牌辨識完整教學",
          "image": "https://geopingkak.web.app/og-image.png",
          "description": "詳細解說各國車牌特徵：歐盟藍條車牌、亞洲車牌差異、美洲車牌樣式。透過車牌快速辨識國家。",
          "author": { "@type": "Person", "name": "山葵冰角 Wasabi Pingkak", "url": "https://geopingkak.web.app/about" },
          "publisher": { "@type": "Organization", "name": "GeoPingKak" },
          "datePublished": toIsoDateTime(PAGE_DATES["/tutorial/license-plates"].published),
          "dateModified": toIsoDateTime(PAGE_DATES["/tutorial/license-plates"].modified),
          "inLanguage": "zh-TW",
          "mainEntityOfPage": "https://geopingkak.web.app/tutorial/license-plates"
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
            { "@type": "ListItem", "position": 2, "name": "教學", "item": "https://geopingkak.web.app/tutorial/intro" },
            { "@type": "ListItem", "position": 3, "name": "車牌辨識" }
          ]
        }
      ]} />
      <LicensePlatesClient />
    </>
  );
}
