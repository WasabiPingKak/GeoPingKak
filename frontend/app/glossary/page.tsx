// app/glossary/page.tsx
import React from "react";
import type { Metadata } from "next";
import GlossaryClientPage from "./client";
import RelatedLinks from "@/components/shared/RelatedLinks";
import { glossaryEntries } from "@/data/glossary";

export const generateMetadata = (): Metadata => ({
  title: "GeoGuessr 術語與名詞解釋 | 中文對照字典 - GeoPingKak",
  description:
    "GeoGuessr 常見術語中文解釋：NMPZ、移動限制、Meta 等遊戲名詞一次搞懂。支援搜尋、卡片式瀏覽與圖片輔助說明。",
  alternates: {
    canonical: "https://geopingkak.web.app/glossary",
  },
  openGraph: {
    title: "GeoGuessr 術語與名詞解釋 | 中文對照字典 - GeoPingKak",
    description:
      "GeoGuessr 常見術語中文解釋：NMPZ、移動限制、Meta 等遊戲名詞一次搞懂。支援搜尋與圖片輔助。",
    url: "https://geopingkak.web.app/glossary",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "article",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoGuessr 術語名詞解釋 - GeoPingKak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 術語與名詞解釋 - GeoPingKak",
    description:
      "NMPZ、移動限制、Meta 等 GeoGuessr 常見術語中文解釋，快速查詢搞懂遊戲名詞。",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
  other: {
    "article:published_time": "2025-12-15",
    "article:modified_time": "2026-03-28",
  },
});

/**
 * 簡易函式：移除 Markdown 符號，讓 Schema description 保持純文字
 * 避免 Schema 中出現 **粗體** 或 [連結](...) 語法
 */
function stripMarkdown(markdown: string): string {
  if (!markdown) return "";
  return markdown
    // 移除圖片語法
    .replace(/!\[.*?\]\(.*?\)/g, "")
    // 移除連結語法，保留文字
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    // 移除粗體/斜體符號
    .replace(/[*_~`]/g, "")
    // 移除標題井號
    .replace(/^#+\s+/gm, "")
    // 壓縮多餘空白
    .replace(/\s+/g, " ")
    .trim();
}

export default function GlossaryPage() {
  // 2. 建構 JSON-LD 資料
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "GeoGuessr 名詞解釋",
    "description": "常見的 GeoGuessr 遊戲術語、縮寫與地理猜測技巧名詞定義。",
    "datePublished": "2025-12-15",
    "dateModified": "2026-03-28",
    "inLanguage": "zh-TW",
    "hasDefinedTerm": glossaryEntries.map((entry) => ({
      "@type": "DefinedTerm",
      "name": entry.title,
      "description": stripMarkdown(entry.content),
      // 如果你的 entry 有 slug 或 ID，可以加上 url
      // "url": `https://geopingkak.web.app/glossary#${entry.slug}`
    })),
  };

  return (
    <>
      {/* 3. 注入 Schema Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-4xl">
        <GlossaryClientPage />
        <RelatedLinks links={[
          { href: "/tutorial", title: "入門教學", description: "從零開始學 GeoGuessr，掌握各種判斷技巧" },
          { href: "/daily-challenge", title: "每日免費挑戰", description: "每天更新的免費挑戰連結，實際練習學到的技巧" },
          { href: "/source", title: "進階學習資源", description: "Plonk It、GeoTips 等攻略網站推薦" },
        ]} />
      </div>
    </>
  );
}