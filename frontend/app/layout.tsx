import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import JsonLd from "@/components/shared/JsonLd";
import QueryProvider from "@/components/QueryProvider";
import RootShell from "@/components/layout/RootShell";

export const metadata = {
  title: "GeoGuessr 免費玩｜不用訂閱、免登入直接挑戰 - GeoPingKak",
  description: "GeoGuessr 不用付費也能玩！每天更新免費挑戰連結，免登入、免註冊，點開就能玩世界、台灣、日本地圖。台灣中文攻略站 GeoPingKak 提供完整教學、技巧與每日挑戰。",
  alternates: {
    canonical: "https://geopingkak.web.app/",
  },
  openGraph: {
    title: "GeoGuessr 免費玩｜不用訂閱、免登入直接挑戰 - GeoPingKak",
    description: "GeoGuessr 不用付費也能玩！每天更新免費挑戰連結，免登入、免註冊，點開就能玩。台灣中文攻略站 GeoPingKak 提供完整教學與技巧。",
    url: "https://geopingkak.web.app/",
    siteName: "GeoPingKak",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoPingKak - GeoGuessr 台灣中文免費攻略站",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 免費玩｜不用訂閱直接挑戰 - GeoPingKak",
    description: "GeoGuessr 不用付費也能玩！每天更新免費挑戰連結，免登入點開就能玩。台灣中文攻略站。",
    images: ["https://geopingkak.web.app/og-image.png"],
    site: "@wasabi_pingkak",
  },
  other: {
    "google-site-verification": "gS23lxy8S2g24-OYxKFRD5skjZ_jfghkjzPO4XfxWBg",
    "article:published_time": "2025-07-29",
    "article:modified_time": "2026-04-22",
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        {/* GA 初始化（首次載入） */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}

        {/* ✅ 結構化資料 Schema.org */}
        <JsonLd data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "GeoPingKak | GeoGuessr 台灣中文攻略與教學資源站",
          "url": "https://geopingkak.web.app/",
          "inLanguage": "zh-TW",
          "description": "台灣最完整的 GeoGuessr 中文資源站，提供攻略教學、每日挑戰連結與遊戲企劃資源。",
          "datePublished": "2025-07-29",
          "dateModified": "2026-04-22",
          "creator": {
            "@type": "Person",
            "name": "山葵冰角 Wasabi Pingkak",
          }
        }} />

        {/* 其餘內容 */}
        <QueryProvider>
          <RootShell>{children}</RootShell>
        </QueryProvider>
      </body>
    </html>
  );
}