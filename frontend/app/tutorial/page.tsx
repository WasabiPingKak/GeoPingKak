import Script from "next/script";
import { generateMetadata } from "./metadata";
import TutorialLandingClient from "./client";

export { generateMetadata };

const SECTIONS = [
  { slug: "intro", name: "前言", url: "https://geopingkak.web.app/tutorial/intro" },
  { slug: "street-coverage", name: "街景覆蓋國家", url: "https://geopingkak.web.app/tutorial/street-coverage" },
  { slug: "flags-domains", name: "國旗/網域", url: "https://geopingkak.web.app/tutorial/flags-domains" },
  { slug: "driving-side", name: "道路通行方向", url: "https://geopingkak.web.app/tutorial/driving-side" },
  { slug: "sun-position", name: "太陽位置", url: "https://geopingkak.web.app/tutorial/sun-position" },
  { slug: "license-plates", name: "車牌辨識", url: "https://geopingkak.web.app/tutorial/license-plates" },
];

export default function Page() {
  return (
    <>
      <Script id="tutorial-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "GeoGuessr 入門教學章節",
          "description": "六大基本原則教你快速辨識 GeoGuessr 中的國家位置",
          "numberOfItems": SECTIONS.length,
          "itemListElement": SECTIONS.map((section, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": section.name,
            "url": section.url,
          })),
        })}
      </Script>
      <TutorialLandingClient />
    </>
  );
}
