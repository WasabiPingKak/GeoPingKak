// app/glossary/page.tsx
import React from "react";
import type { Metadata } from "next";
import GlossaryClientPage from "./client";
import { glossaryEntries } from "@/data/glossary";

export const generateMetadata = (): Metadata => ({
  title: "名詞解釋 | GeoPingKak",
  description:
    "GeoGuessr 相關名詞解釋字典：以卡片式目錄整理常見術語，支援搜尋與圖片輔助。",
  openGraph: {
    title: "名詞解釋 | GeoPingKak",
    description:
      "GeoGuessr 相關名詞解釋字典：以卡片式目錄整理常見術語，支援搜尋與圖片輔助。",
    url: "https://geopingkak.web.app/glossary",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "article",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoPingKak 名詞解釋頁",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "名詞解釋 | GeoPingKak",
    description:
      "GeoGuessr 相關名詞解釋字典：支援搜尋與圖片輔助，快速查詢常見術語。",
    images: ["https://geopingkak.web.app/og-image.png"],
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
      </div>
    </>
  );
}