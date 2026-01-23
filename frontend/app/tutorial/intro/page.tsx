import Script from "next/script";
import { generateMetadata } from "./metadata";
import IntroClient from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <Script id="tutorial-intro-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "GeoGuessr 新手入門指南",
          "description": "了解 GeoGuessr 的魅力與正確的學習方向，從觀察世界開始建立推理邏輯。",
          "author": { "@type": "Organization", "name": "GeoPingKak" },
          "publisher": { "@type": "Organization", "name": "GeoPingKak" },
          "inLanguage": "zh-TW",
          "mainEntityOfPage": "https://geopingkak.web.app/tutorial/intro"
        })}
      </Script>
      <IntroClient />
    </>
  );
}
