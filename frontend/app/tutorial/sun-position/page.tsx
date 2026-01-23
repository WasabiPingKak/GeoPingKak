import Script from "next/script";
import { generateMetadata } from "./metadata";
import SunPositionClient from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <Script id="tutorial-sun-position-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "GeoGuessr 太陽位置判斷教學",
          "description": "學會用太陽方位判斷南北半球與緯度範圍，實用的推理技巧。",
          "author": { "@type": "Organization", "name": "GeoPingKak" },
          "publisher": { "@type": "Organization", "name": "GeoPingKak" },
          "inLanguage": "zh-TW",
          "mainEntityOfPage": "https://geopingkak.web.app/tutorial/sun-position"
        })}
      </Script>
      <SunPositionClient />
    </>
  );
}
