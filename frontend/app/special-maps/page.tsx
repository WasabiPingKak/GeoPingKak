// app/special-maps/page.tsx (Server Component)

import JsonLd from "@/components/shared/JsonLd";
import { generateMetadata } from "./metadata";
import ClientPage from "./client";
import { PAGE_DATES, toIsoDateTime } from "@/data/pageDates";

export { generateMetadata };

export default function Page() {
  return (
    <>
      {/* ItemList 結構化資料 */}
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "GeoGuessr 特殊主題地圖推薦",
        "description": "精選的 GeoGuessr 主題挑戰地圖集合，包含各國特色場景與趣味題庫",
        "datePublished": toIsoDateTime(PAGE_DATES["/special-maps"].published),
        "dateModified": toIsoDateTime(PAGE_DATES["/special-maps"].modified),
        "inLanguage": "zh-TW",
      }} />

      <ClientPage />
    </>
  );
}
