import Script from "next/script";
import { generateMetadata } from "./metadata";
import StreetCoverageClient from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <Script id="tutorial-street-coverage-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "GeoGuessr 街景覆蓋國家一覽",
          "description": "掌握全球 Google 街景覆蓋範圍，了解哪些國家有街景，快速排除不可能的國家。",
          "author": { "@type": "Organization", "name": "GeoPingKak" },
          "publisher": { "@type": "Organization", "name": "GeoPingKak" },
          "inLanguage": "zh-TW",
          "mainEntityOfPage": "https://geopingkak.web.app/tutorial/street-coverage"
        })}
      </Script>
      <StreetCoverageClient />
    </>
  );
}
