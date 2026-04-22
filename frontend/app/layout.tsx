import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import QueryProvider from "@/components/QueryProvider";
import RootShell from "@/components/layout/RootShell";

export const metadata = {
  title: "GeoPingKak | GeoGuessr 台灣中文攻略與教學資源站",
  description: "台灣最完整的 GeoGuessr 中文資源站，提供攻略教學、每日挑戰連結與遊戲企劃資源。",
  alternates: {
    canonical: "https://geopingkak.web.app/",
  },
  openGraph: {
    title: "GeoPingKak | GeoGuessr 台灣中文攻略與教學資源站",
    description: "台灣最完整的 GeoGuessr 中文資源站，提供攻略教學、每日挑戰連結與遊戲企劃資源。",
    url: "https://geopingkak.web.app/",
    siteName: "GeoPingKak",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoPingKak 網站預覽圖",
      },
    ],
    locale: "zh_TW",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoPingKak | GeoGuessr 台灣中文攻略與教學資源站",
    description: "台灣最完整的 GeoGuessr 中文資源站，提供攻略教學、每日挑戰連結與遊戲企劃資源。",
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
        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
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
          })}
        </Script>

        {/* 其餘內容 */}
        <QueryProvider>
          <RootShell>{children}</RootShell>
        </QueryProvider>
      </body>
    </html>
  );
}