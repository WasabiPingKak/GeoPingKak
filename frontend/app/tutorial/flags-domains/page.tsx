import Script from "next/script";
import { generateMetadata } from "./metadata";
import FlagsDomainsClient from "./client";

export { generateMetadata };

export default function Page() {
  return (
    <>
      <Script id="tutorial-flags-domains-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": "GeoGuessr 國旗與網域辨識教學",
          "description": "學習如何透過路邊國旗、廣告招牌與網域後綴辨識國家。",
          "author": { "@type": "Organization", "name": "GeoPingKak" },
          "publisher": { "@type": "Organization", "name": "GeoPingKak" },
          "inLanguage": "zh-TW",
          "mainEntityOfPage": "https://geopingkak.web.app/tutorial/flags-domains"
        })}
      </Script>
      <FlagsDomainsClient />
    </>
  );
}
