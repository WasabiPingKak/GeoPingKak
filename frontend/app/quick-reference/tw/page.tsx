// src/app/quick-reference/tw/page.tsx
import React from "react";
import JsonLd from "@/components/shared/JsonLd";
import NtpcLampMap from "@/components/quick-reference/tw/NtpcLampMap";
import TaipowerCodeDiagram from "@/components/quick-reference/tw/TaipowerCodeDiagram";
import TaipowerGridMap from "@/components/quick-reference/tw/TaipowerGridMap";
import { digitFill } from "@/components/quick-reference/tw/ntpcMapColors";
import {
  NTPC_DISTRICTS,
  NTPC_EXTRA_DIGITS,
  NTPC_LAMP_SUMMARY,
  NTPC_ZONES,
} from "@/components/quick-reference/tw/ntpcLampMapData";
import { PAGE_DATES } from "@/data/pageDates";

export const metadata = {
  title: "台灣電線桿與路燈編號速查表 | 台電座標、新北市燈桿編號 - GeoPingKak",
  description:
    "GeoGuessr 台灣速查：台電電線桿牌上的座標碼可以直接換算位置，附可放大的分區網格地圖。新北市路燈燈桿編號的前兩碼可以對到 29 個行政區。",
  openGraph: {
    title: "台灣電線桿與路燈編號速查表 | GeoGuessr 工具 - GeoPingKak",
    description: "台電電線桿座標網格地圖與新北市路燈編號對照",
    type: "article",
    url: "https://geopingkak.web.app/quick-reference/tw",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "台灣電線桿與路燈編號速查表 - GeoPingKak",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "台灣電線桿與路燈編號速查表 - GeoPingKak",
    description: "GeoGuessr 台灣辨識工具：台電電線桿座標與新北市路燈編號",
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
const PLONKIT_TAIWAN = "https://www.plonkit.net/taiwan";
const OSGEO_TAIPOWER_GRID = "https://wiki.osgeo.org/wiki/Taiwan_Power_Company_grid";

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

// 頁首的跳轉連結
const TOC = [
  { id: "taipower", label: "台電電線桿座標" },
  { id: "ntpc-streetlights", label: "新北市路燈" },
];

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
            { "@type": "ListItem", position: 3, name: "台灣電線桿與路燈編號" },
          ],
        }}
      />
      <h1 className="text-3xl font-semibold mb-2">台灣電線桿與路燈編號速查表</h1>
      <p className="text-zinc-400 mb-4">
        街景裡看得到電線桿或路燈上的編號牌時，可以直接推出大概的位置。
      </p>
      <nav aria-label="本頁內容" className="mb-8 flex flex-wrap gap-2 text-sm">
        {TOC.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-md border border-zinc-600 bg-zinc-800 px-3 py-1.5 text-zinc-200 hover:bg-zinc-700"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <section id="taipower" className="mb-12 scroll-mt-6">
        <h2 className="text-2xl font-semibold mb-2">台電電線桿座標</h2>
        <p className="text-zinc-400 mb-6 text-sm">
          台電的電線桿上常有一塊藍色牌子，最下面兩行像「B7658」「DA14」的碼就是座標，全台通用。
        </p>

        <div className="mb-6 rounded-lg border border-zinc-700 bg-zinc-800/50 p-4">
          <TaipowerCodeDiagram />
        </div>

        <div className="space-y-4 text-sm text-zinc-300 leading-relaxed">
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong className="text-white">英文字母</strong>
              是分區，本島由北到南是 A～V，蘭嶼是 W。
            </li>
            <li>
              <strong className="text-white">澎湖</strong>是 X、Y（橘色框）。
              <strong className="text-white">金門</strong>是 Z，<strong className="text-white">馬祖</strong>
              是 S，地圖上沒有畫出來。
            </li>
            <li>
              <strong className="text-white">四位數字</strong>
              是在分區裡的位置，前兩位由左往右、後兩位由下往上。例如 B7658 就是 B 區往右 76%、往上 58%。
            </li>
            <li>
              <strong className="text-white">DA14</strong>
              是在那一格裡更精確的位置。第一個字母把格子由左往右切成 A～H 八段，第二個字母由下往上切成 A～E
              五段，DA 就是往右第 4 段、最下面那段。14 再把這一小塊各切 10 份，往右 1、往上 4。地圖放大到街道時會顯示。
            </li>
          </ul>
        </div>

        <div className="mt-6 mb-3">
          <TaipowerGridMap />
        </div>

        <div className="text-sm leading-relaxed">
          <p className="text-xs text-zinc-500">
            ＊地圖上的位置可能有幾十公尺誤差。參考資料：
            <a
              href={PLONKIT_TAIWAN}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-zinc-300"
            >
              Plonkit 台灣指南
            </a>
            、
            <a
              href={OSGEO_TAIPOWER_GRID}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-zinc-300"
            >
              OSGeo Wiki「Taiwan Power Company grid」
            </a>
            。底圖來自 OpenFreeMap 與 OpenStreetMap。
          </p>
        </div>
      </section>

      <section id="ntpc-streetlights" className="scroll-mt-6">
        <h2 className="text-2xl font-semibold mb-2">新北市路燈</h2>
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
