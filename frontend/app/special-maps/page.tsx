// app/special-maps/page.tsx (Server Component)

import Script from "next/script";
import { generateMetadata } from "./metadata";
import ClientPage from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      {/* ItemList 結構化資料 */}
      <Script id="special-maps-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "GeoGuessr 特殊主題地圖推薦",
          "description": "精選的 GeoGuessr 主題挑戰地圖集合，包含各國特色場景與趣味題庫",
          "inLanguage": "zh-TW",
        })}
      </Script>

      <ClientPage />
    </>
  );
}
