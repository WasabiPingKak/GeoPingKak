import Script from "next/script";
import { generateMetadata } from "./metadata";
import DrivingSideClient from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <Script id="tutorial-driving-side-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "GeoGuessr 道路通行方向判斷教學",
          "description": "了解全球道路通行方向分佈，靠左行駛的國家相對少數，掌握這個知識能快速縮小猜測範圍。",
          "author": { "@type": "Organization", "name": "GeoPingKak" },
          "publisher": { "@type": "Organization", "name": "GeoPingKak" },
          "inLanguage": "zh-TW",
          "mainEntityOfPage": "https://geopingkak.web.app/tutorial/driving-side"
        })}
      </Script>
      <DrivingSideClient />
    </>
  );
}
