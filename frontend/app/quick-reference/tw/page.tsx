// src/app/quick-reference/tw/page.tsx
import React from "react";
import JsonLd from "@/components/shared/JsonLd";
import NtpcLampMap from "@/components/quick-reference/tw/NtpcLampMap";
import { digitFill } from "@/components/quick-reference/tw/ntpcMapColors";
import {
  NTPC_DISTRICTS,
  NTPC_EXTRA_DIGITS,
  NTPC_LAMP_SUMMARY,
  NTPC_ZONES,
} from "@/components/quick-reference/tw/ntpcLampMapData";
import { PAGE_DATES } from "@/data/pageDates";

export const metadata = {
  title: "台灣路燈編號速查表 | 新北市燈桿編號對照行政區 - GeoPingKak",
  description:
    "GeoGuessr 台灣速查：新北市路燈燈桿編號的第一碼對應七大區塊，前兩碼可以直接對到 29 個行政區。附對照地圖與各區編號列表。",
  openGraph: {
    title: "台灣路燈編號速查表 | GeoGuessr 工具 - GeoPingKak",
    description: "新北市路燈燈桿編號對照行政區地圖",
    type: "article",
    url: "https://geopingkak.web.app/quick-reference/tw",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "台灣路燈編號速查表 - GeoPingKak",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "台灣路燈編號速查表 - GeoPingKak",
    description: "GeoGuessr 台灣辨識工具：新北市路燈編號對照行政區",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
  alternates: {
    canonical: "https://geopingkak.web.app/quick-reference/tw",
  },
  other: {
    "article:published_time": PAGE_DATES["/quick-reference/tw"].published,
    "article:modified_time": PAGE_DATES["/quick-reference/tw"].modified,
  },
};

const DATA_SOURCE = "https://data.ntpc.gov.tw/datasets/39149fe0-85ab-4e6c-99e5-60657d44895f";

// 7、8、9 開頭不劃區，說明各是什麼
const EXTRA_NOTES: Record<string, string> = {
  "7": "土城區部分路段",
  "8": "河濱高灘地與水利局管理的路燈",
  "9": "零星編號，散在三重、板橋等區",
};

const ZONE_CARDS = NTPC_ZONES.map((z) => ({
  ...z,
  count: NTPC_LAMP_SUMMARY.digits[z.digit],
  districts: NTPC_DISTRICTS.filter((d) => d.digit === z.digit),
}));

const fmt = (n: number) => n.toLocaleString("zh-TW");

export default function TaiwanQuickReferencePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 text-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "首頁", item: "https://geopingkak.web.app/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "速查筆記",
              item: "https://geopingkak.web.app/quick-reference",
            },
            { "@type": "ListItem", position: 3, name: "台灣路燈編號" },
          ],
        }}
      />
      <h1 className="text-3xl font-semibold mb-2">台灣路燈編號速查表</h1>
      <p className="text-zinc-400 mb-8">
        街景裡看得到路燈的燈桿編號時，開頭幾碼就能指出大概在哪一區。目前整理了新北市。
      </p>

      <section>
        <h2 className="text-2xl font-semibold mb-2">新北市</h2>
        <p className="text-zinc-400 mb-6 text-sm">
          新北市約 {Math.round(NTPC_LAMP_SUMMARY.total / 10000)} 萬盞路燈，燈桿編號以 6 位數為主。
        </p>

        <div className="mb-8">
          <NtpcLampMap />
        </div>

        <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong className="text-white">第一碼</strong> 0～6 把新北市分成七大區塊，例如 0
              是板橋、中和、土城。
            </li>
            <li>
              <strong className="text-white">前兩碼</strong>
              可以直接對到單一行政區。路燈多的區會用到好幾組，例如板橋是 00～03。
            </li>
            <li>
              少數編號只有 5 位數（約 {fmt(NTPC_LAMP_SUMMARY.fiveDigit)} 盞），第一碼一樣對得上區塊，前兩碼就不適用了。
            </li>
          </ul>

          <div className="grid gap-4 sm:grid-cols-2">
            {ZONE_CARDS.map((zone) => (
              <section
                key={zone.digit}
                className="rounded-md border border-zinc-700 bg-zinc-900/60 p-4"
              >
                <h3 className="mb-3 flex items-baseline gap-2">
                  <span
                    className="rounded px-2 py-0.5 font-mono text-lg font-bold text-zinc-900"
                    style={{ background: digitFill(zone.digit) }}
                  >
                    {zone.digit}
                  </span>
                  <span className="text-xs text-zinc-500">{fmt(zone.count)} 盞</span>
                </h3>
                <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                  {zone.districts.map((d) => (
                    <React.Fragment key={d.name}>
                      <dt>{d.name}</dt>
                      <dd className="font-mono text-white">{d.prefixes.join("、")}</dd>
                    </React.Fragment>
                  ))}
                </dl>
              </section>
            ))}

            <section className="rounded-md border border-zinc-700 bg-zinc-900/60 p-4">
              <h3 className="mb-3 font-semibold text-zinc-200">其他開頭</h3>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                {NTPC_EXTRA_DIGITS.map((e) => (
                  <React.Fragment key={e.digit}>
                    <dt className="font-mono text-white">{e.digit}</dt>
                    <dd>
                      {EXTRA_NOTES[e.digit]}
                      <span className="text-xs text-zinc-500">（{fmt(e.count)} 盞）</span>
                    </dd>
                  </React.Fragment>
                ))}
              </dl>
            </section>
          </div>

          <p className="text-xs text-zinc-500">
            ＊資料來源：
            <a
              href={DATA_SOURCE}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-zinc-300"
            >
              新北市政府資料開放平臺「新北市路燈資料」
            </a>
            ，2026 年 11 月下載。前兩碼只列出占該區 1% 以上的組合，區界採用內政部鄉鎮市區界線。
          </p>
        </div>
      </section>
    </main>
  );
}
