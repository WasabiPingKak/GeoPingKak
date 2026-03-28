// src/app/quick-reference/indonesia/page.tsx
import React from "react";
import Image from "next/image";
import Script from "next/script";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export const metadata = {
  title: "印尼文地名速查表 | GeoGuessr 印尼辨識工具 - GeoPingKak",
  description: "GeoGuessr 印尼地圖專用！常見印尼文地名、行政區劃對照表，透過路牌文字快速判斷位置，提升印尼答題正確率。",
  openGraph: {
    title: "印尼文地名速查表 | GeoGuessr 工具 - GeoPingKak",
    description: "快速辨識印尼地名的實用查詢工具",
    type: "article",
    url: "https://geopingkak.web.app/quick-reference/id",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "印尼文地名速查表 - GeoPingKak",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "印尼文地名速查表 - GeoPingKak",
    description: "GeoGuessr 印尼辨識必備工具",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
  alternates: {
    canonical: "https://geopingkak.web.app/quick-reference/id",
  },
};

export default function IndonesiaQuickReferencePage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8 text-white">
      <Script id="qr-id-ld-json" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://geopingkak.web.app/" },
              { "@type": "ListItem", "position": 2, "name": "速查筆記", "item": "https://geopingkak.web.app/quick-reference" },
              { "@type": "ListItem", "position": 3, "name": "印尼文地名" }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "VideoObject",
            "name": "GeoGuessr 印尼文地名辨識教學",
            "description": "GeoGuessr 印尼地圖專用教學影片，教你如何透過印尼文地名快速判斷位置。",
            "thumbnailUrl": "https://img.youtube.com/vi/mCrEzRJ4o5s/maxresdefault.jpg",
            "uploadDate": "2025-11-09",
            "contentUrl": "https://www.youtube.com/watch?v=mCrEzRJ4o5s",
            "embedUrl": "https://www.youtube.com/embed/mCrEzRJ4o5s",
            "inLanguage": "zh-TW"
          }
        ])}
      </Script>
      <h1 className="text-3xl font-bold mb-2">印尼文地名速查表</h1>
      <p className="text-zinc-400 mb-8">
        本頁整理了印尼常見的方位詞與行政區名稱，幫助 GeoGuessr 玩家快速辨識地名特徵。
      </p>

      {/* 嵌入 YouTube 影片（支援 RWD） */}
      <div className="relative w-full md:w-2/3 mx-auto aspect-video mb-8">
        <iframe
          src="https://www.youtube.com/embed/mCrEzRJ4o5s?si=EezQPqs-7HU6C5Yg"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 w-full h-full rounded-md"
        />
      </div>

      <Zoom>
        <div className="mb-6">
          <Image
            src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/quick-reference/id/compass.jpg?v=20251109"
            alt="印尼地圖指南針示意圖"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto max-w-md mx-auto rounded-md border border-zinc-700"
          />
        </div>
      </Zoom>

      {/* 🧭 印尼方位詞對照表 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">🧭 印尼方位詞對照表</h2>
        <div className="overflow-x-auto rounded-lg bg-zinc-900">
          <table className="table-auto text-sm text-left whitespace-nowrap border border-zinc-700">
            <thead className="bg-zinc-800 text-zinc-300">
              <tr>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  印尼文
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  中文
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  備註
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Utara</td>
                <td className="px-4 py-2 border border-zinc-700">北</td>
                <td className="px-4 py-2 border border-zinc-700">縮寫常為 U</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Selatan</td>
                <td className="px-4 py-2 border border-zinc-700">南</td>
                <td className="px-4 py-2 border border-zinc-700">縮寫常為 S</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Barat</td>
                <td className="px-4 py-2 border border-zinc-700">西</td>
                <td className="px-4 py-2 border border-zinc-700">縮寫常為 B</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Timur</td>
                <td className="px-4 py-2 border border-zinc-700">東</td>
                <td className="px-4 py-2 border border-zinc-700">縮寫常為 T</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Tengah</td>
                <td className="px-4 py-2 border border-zinc-700">中央、中部</td>
                <td className="px-4 py-2 border border-zinc-700">
                  有時縮寫 Tgh
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 🏝️ 蘇門答臘島（Sumatera）行政區 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          🏝️ 蘇門答臘島（Sumatera）行政區
        </h2>
        <div className="overflow-x-auto rounded-lg bg-zinc-900">
          <table className="table-auto text-sm text-left whitespace-nowrap border border-zinc-700">
            <thead className="bg-zinc-800 text-zinc-300">
              <tr>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  縮寫
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  全名
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  中文名稱
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Aceh</td>
                <td className="px-4 py-2 border border-zinc-700">Aceh</td>
                <td className="px-4 py-2 border border-zinc-700">亞齊省</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Sumut</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Sumatera Utara
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  北蘇門答臘省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Sumbar</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Sumatera Barat
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  西蘇門答臘省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Sumsel</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Sumatera Selatan
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  南蘇門答臘省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Riau</td>
                <td className="px-4 py-2 border border-zinc-700">Riau</td>
                <td className="px-4 py-2 border border-zinc-700">廖內省</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Bengkulu</td>
                <td className="px-4 py-2 border border-zinc-700">Bengkulu</td>
                <td className="px-4 py-2 border border-zinc-700">明古魯省</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Jambi</td>
                <td className="px-4 py-2 border border-zinc-700">Jambi</td>
                <td className="px-4 py-2 border border-zinc-700">占碑省</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Lampung</td>
                <td className="px-4 py-2 border border-zinc-700">Lampung</td>
                <td className="px-4 py-2 border border-zinc-700">楠榜省</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 🏝️ 蘇拉威西島（Sulawesi）行政區 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          🏝️ 蘇拉威西島（Sulawesi）行政區
        </h2>
        <div className="overflow-x-auto rounded-lg bg-zinc-900">
          <table className="table-auto text-sm text-left whitespace-nowrap border border-zinc-700">
            <thead className="bg-zinc-800 text-zinc-300">
              <tr>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  縮寫
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  全名
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  中文名稱
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Sulut</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Sulawesi Utara
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  北蘇拉威西省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Sulsel</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Sulawesi Selatan
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  南蘇拉威西省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Sulbar</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Sulawesi Barat
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  西蘇拉威西省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Sulteng</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Sulawesi Tengah
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  中蘇拉威西省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Gorontalo</td>
                <td className="px-4 py-2 border border-zinc-700">Gorontalo</td>
                <td className="px-4 py-2 border border-zinc-700">哥倫打落省</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 🌳 加里曼丹島（Kalimantan）行政區 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          🌳 加里曼丹島（Kalimantan）行政區
        </h2>
        <div className="overflow-x-auto rounded-lg bg-zinc-900">
          <table className="table-auto text-sm text-left whitespace-nowrap border border-zinc-700">
            <thead className="bg-zinc-800 text-zinc-300">
              <tr>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  縮寫
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  全名
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  中文名稱
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Kaltara</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Kalimantan Utara
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  北加里曼丹省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Kalsel</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Kalimantan Selatan
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  南加里曼丹省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Kalbar</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Kalimantan Barat
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  西加里曼丹省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Kaltim</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Kalimantan Timur
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  東加里曼丹省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Kalteng</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Kalimantan Tengah
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  中加里曼丹省
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 🌋 其他島嶼行政區 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          🌋 其他島嶼行政區
        </h2>
        <div className="overflow-x-auto rounded-lg bg-zinc-900">
          <table className="table-auto text-sm text-left whitespace-nowrap border border-zinc-700">
            <thead className="bg-zinc-800 text-zinc-300">
              <tr>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  縮寫
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  全名
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  中文名稱
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Papua</td>
                <td className="px-4 py-2 border border-zinc-700">Papua</td>
                <td className="px-4 py-2 border border-zinc-700">巴布亞省</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">
                  Papua Barat
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  Papua Barat
                </td>
                <td className="px-4 py-2 border border-zinc-700">西巴布亞省</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">NTT</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Nusa Tenggara Timur
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  東努沙登加拉省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">NTB</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Nusa Tenggara Barat
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  西努沙登加拉省
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Bali</td>
                <td className="px-4 py-2 border border-zinc-700">Bali</td>
                <td className="px-4 py-2 border border-zinc-700">峇里省</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Maluku</td>
                <td className="px-4 py-2 border border-zinc-700">Maluku</td>
                <td className="px-4 py-2 border border-zinc-700">馬魯古省</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Malut</td>
                <td className="px-4 py-2 border border-zinc-700">
                  Maluku Utara
                </td>
                <td className="px-4 py-2 border border-zinc-700">
                  北馬魯古省
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* 🏘️ 常見地名詞與行政單位詞彙 */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3">
          🏘️ 常見地名詞與行政單位詞彙
        </h2>
        <div className="overflow-x-auto rounded-lg bg-zinc-900">
          <table className="table-auto text-sm text-left whitespace-nowrap border border-zinc-700">
            <thead className="bg-zinc-800 text-zinc-300">
              <tr>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  印尼文
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  中文
                </th>
                <th className="px-4 py-2 border border-zinc-700 text-left">
                  說明
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Provinsi</td>
                <td className="px-4 py-2 border border-zinc-700">省</td>
                <td className="px-4 py-2 border border-zinc-700">
                  例如：Prov. Sulbar
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Kabupaten</td>
                <td className="px-4 py-2 border border-zinc-700">縣</td>
                <td className="px-4 py-2 border border-zinc-700">
                  比較偏鄉、郊區
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Kota</td>
                <td className="px-4 py-2 border border-zinc-700">市</td>
                <td className="px-4 py-2 border border-zinc-700">
                  城市區域
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Kecamatan</td>
                <td className="px-4 py-2 border border-zinc-700">區</td>
                <td className="px-4 py-2 border border-zinc-700">
                  次級行政區，常縮寫為 Kec.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Desa</td>
                <td className="px-4 py-2 border border-zinc-700">村</td>
                <td className="px-4 py-2 border border-zinc-700">
                  鄉村行政區
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">Kelurahan</td>
                <td className="px-4 py-2 border border-zinc-700">街道/社區</td>
                <td className="px-4 py-2 border border-zinc-700">
                  都市行政區
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-zinc-700">
                  Jalan (Jln.)
                </td>
                <td className="px-4 py-2 border border-zinc-700">路、街道</td>
                <td className="px-4 py-2 border border-zinc-700">
                  例如：Jln. Pendidikan = 教育路
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
