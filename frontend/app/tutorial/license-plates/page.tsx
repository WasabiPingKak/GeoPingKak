import Script from "next/script";
import { generateMetadata } from "./metadata";
import LicensePlatesClient from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <Script id="tutorial-license-plates-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "GeoGuessr 車牌辨識完整教學",
          "description": "詳細解說各國車牌特徵：歐盟藍條車牌、亞洲車牌差異、美洲車牌樣式。透過車牌快速辨識國家。",
          "author": { "@type": "Organization", "name": "GeoPingKak" },
          "publisher": { "@type": "Organization", "name": "GeoPingKak" },
          "inLanguage": "zh-TW",
          "mainEntityOfPage": "https://geopingkak.web.app/tutorial/license-plates"
        })}
      </Script>
      <LicensePlatesClient />
    </>
  );
}
