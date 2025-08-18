import "./globals.css";
import type { ReactNode } from "react";
import Script from "next/script";
import QueryProvider from "@/components/QueryProvider";
import RootShell from "@/components/layout/RootShell";

export const metadata = {
  title: "GeoPingKak",
  description: "推廣 GeoGuessr 的中文玩家網站，提供每日挑戰、教學與遊戲企劃資源",
  alternates: {
    canonical: "https://geopingkak.web.app/",
  },
  openGraph: {
    title: "GeoPingKak - 中文 GeoGuessr 推廣站",
    description: "每日挑戰、中文教學與遊戲企劃一站式資源平台",
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
    title: "GeoPingKak",
    description: "每日挑戰、教學與遊戲地圖資源，推廣 GeoGuessr 中文社群",
    images: ["https://geopingkak.web.app/og-image.png"],
    site: "@wasabi_pingkak",
  },
  other: {
    "google-site-verification": "gS23lxy8S2g24-OYxKFRD5skjZ_jfghkjzPO4XfxWBg"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        {/* ✅ GA 初始化（首次載入） */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3C6D7CMCKV"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3C6D7CMCKV');
          `}
        </Script>

        {/* ✅ 結構化資料 Schema.org */}
        <Script id="ld-json" type="application/ld+json" strategy="afterInteractive">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "GeoPingKak",
            "url": "https://geopingkak.web.app/",
            "inLanguage": "zh-TW",
            "description": "每日提供 GeoGuessr 挑戰連結與中文教學的玩家網站，由山葵冰角建立。",
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