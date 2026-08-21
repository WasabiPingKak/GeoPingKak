import JsonLd from "@/components/shared/JsonLd";
import { generateMetadata } from "./metadata";
import FlagsDomainsClient from "./client";
import { PAGE_DATES, toIsoDateTime } from "@/data/pageDates";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "GeoGuessr 國旗與網域辨識教學",
          "image": "https://geopingkak.web.app/og-image.png",
          "description": "學習如何透過路邊國旗、廣告招牌與網域後綴辨識國家。",
          "author": { "@type": "Person", "name": "山葵冰角 Wasabi Pingkak", "url": "https://geopingkak.web.app/about" },
          "publisher": { "@type": "Organization", "name": "GeoPingKak" },
          "datePublished": toIsoDateTime(PAGE_DATES["/tutorial/flags-domains"].published),
          "dateModified": toIsoDateTime(PAGE_DATES["/tutorial/flags-domains"].modified),
          "inLanguage": "zh-TW",
          "mainEntityOfPage": "https://geopingkak.web.app/tutorial/flags-domains"
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
            { "@type": "ListItem", "position": 2, "name": "教學", "item": "https://geopingkak.web.app/tutorial/intro" },
            { "@type": "ListItem", "position": 3, "name": "國旗與網域" }
          ]
        }
      ]} />
      <FlagsDomainsClient />
    </>
  );
}
