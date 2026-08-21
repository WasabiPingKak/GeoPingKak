import JsonLd from "@/components/shared/JsonLd";
import { generateMetadata } from "./metadata";
import StreetCoverageClient from "./client";
import { PAGE_DATES, toIsoDateTime } from "@/data/pageDates";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "GeoGuessr 街景覆蓋國家一覽",
          "image": "https://geopingkak.web.app/og-image.png",
          "description": "掌握全球 Google 街景覆蓋範圍，了解哪些國家有街景，快速排除不可能的國家。",
          "author": { "@type": "Person", "name": "山葵冰角 Wasabi Pingkak", "url": "https://geopingkak.web.app/about" },
          "publisher": { "@type": "Organization", "name": "GeoPingKak" },
          "datePublished": toIsoDateTime(PAGE_DATES["/tutorial/street-coverage"].published),
          "dateModified": toIsoDateTime(PAGE_DATES["/tutorial/street-coverage"].modified),
          "inLanguage": "zh-TW",
          "mainEntityOfPage": "https://geopingkak.web.app/tutorial/street-coverage"
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
            { "@type": "ListItem", "position": 2, "name": "教學", "item": "https://geopingkak.web.app/tutorial/intro" },
            { "@type": "ListItem", "position": 3, "name": "街景覆蓋" }
          ]
        }
      ]} />
      <StreetCoverageClient />
    </>
  );
}
