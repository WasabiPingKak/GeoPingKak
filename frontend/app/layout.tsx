import "./globals.css";
import type { ReactNode } from "react";
import QueryProvider from "@/components/QueryProvider";
import RootShell from "@/components/layout/RootShell";

export const metadata = {
  title: "GeoPingKak",
  description: "推廣 GeoGuessr 的中文玩家網站，提供每日挑戰、教學與遊戲企劃資源",
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
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <QueryProvider>
          <RootShell>{children}</RootShell>
        </QueryProvider>
      </body>
    </html>
  );
}
