// src/app/quick-reference/jp/page.tsx
import React from "react";
import JsonLd from "@/components/shared/JsonLd";
import JapanRegionMap from "@/components/quick-reference/jp/JapanRegionMap";
import { regionFill } from "@/components/quick-reference/jp/jpMapColors";
import {
  JP_CITIES,
  JP_OKINAWA_INSET,
  JP_PREFECTURES,
  JP_REGIONS,
} from "@/components/quick-reference/jp/jpRegionMapData";
import { PAGE_DATES } from "@/data/pageDates";

export const metadata = {
  title: "日本地方區分與電話區碼速查表 | GeoGuessr 日本辨識工具 - GeoPingKak",
  description:
    "GeoGuessr 日本地圖速查：九大地方、47 都道府縣分布與市外電話區碼對照，透過路邊招牌上的電話號碼快速判斷所在縣市。",
  openGraph: {
    title: "日本地方區分與電話區碼速查表 | GeoGuessr 工具 - GeoPingKak",
    description: "日本九大地方、47 都道府縣與市外電話區碼對照地圖",
    type: "article",
    url: "https://geopingkak.web.app/quick-reference/jp",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "日本地方區分與電話區碼速查表 - GeoPingKak",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "日本地方區分與電話區碼速查表 - GeoPingKak",
    description: "GeoGuessr 日本辨識必備工具",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
  alternates: {
    canonical: "https://geopingkak.web.app/quick-reference/jp",
  },
  other: {
    "article:published_time": PAGE_DATES["/quick-reference/jp"].published,
    "article:modified_time": PAGE_DATES["/quick-reference/jp"].modified,
  },
};

// 卡片內容跟地圖共用同一份資料
const ALL_PREFECTURES = [...JP_PREFECTURES, JP_OKINAWA_INSET];
const CITY_NOTE = JP_CITIES.map((c) => `${c.name} ${c.code}`).join("、");
const REGION_CARDS = JP_REGIONS.map((r) => ({
  ...r,
  prefectures: r.ids.map((id) => {
    const p = ALL_PREFECTURES.find((x) => x.id === id)!;
    const code = p.code.split("/").join(" / ");
    return { name: p.name, code: id === 1 ? `${code}（${CITY_NOTE}）` : code };
  }),
}));

export default function JapanQuickReferencePage() {
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
            { "@type": "ListItem", position: 3, name: "日本地方區分與電話區碼" },
          ],
        }}
      />
      <h1 className="text-3xl font-semibold mb-2">日本地方區分與電話區碼速查表</h1>
      <p className="text-zinc-400 mb-6">
        日本分成九大地方、47 個都道府縣。招牌上的市外電話區碼能直接指出大概在哪個縣。
      </p>

      <div className="mb-8">
        <JapanRegionMap />
      </div>

      <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
        <ul className="list-disc list-inside space-y-1">
          <li>
            東京 <strong className="text-white">03</strong> 和大阪{" "}
            <strong className="text-white">06</strong> 只有兩碼，看到就能直接鎖定。
          </li>
          <li>區碼第二碼大致由北往南遞增，01 在北海道，09 在九州與沖繩。</li>
          <li>同一個區碼可能跨兩個縣，例如 076 是富山和石川，085 是鳥取和島根。</li>
          <li>
            <strong className="text-white">0120</strong> 和{" "}
            <strong className="text-white">0800</strong> 是免付費電話，全日本通用，看不出地區。
          </li>
        </ul>

        <div className="grid gap-4 sm:grid-cols-2">
          {REGION_CARDS.map((region) => (
            <section
              key={region.name}
              className="rounded-md border border-zinc-700 bg-zinc-900/60 p-4"
            >
              <h2 className="mb-3 flex items-baseline gap-2">
                <span
                  className="rounded px-2 py-0.5 font-semibold text-zinc-900"
                  style={{ background: regionFill(region.hue) }}
                >
                  {region.name}
                </span>
                <span className="text-xs text-zinc-500">{region.en}</span>
              </h2>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1">
                {region.prefectures.map((p) => (
                  <React.Fragment key={p.name}>
                    <dt>{p.name}</dt>
                    <dd className="font-mono text-white">{p.code}</dd>
                  </React.Fragment>
                ))}
              </dl>
            </section>
          ))}
        </div>

        <p className="text-xs text-zinc-500">
          ＊區碼為該縣主要市外局號開頭，部分地區另有細分。
        </p>
      </div>
    </main>
  );
}
