import type { Metadata } from "next";
import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";

export const metadata: Metadata = {
  title: "關於管理者 | GeoPingKak - GeoGuessr 台灣中文攻略站",
  description: "認識 GeoPingKak 網站管理者山葵冰角，了解網站的創立初衷與推廣理念。",
  alternates: {
    canonical: "https://geopingkak.web.app/about",
  },
  openGraph: {
    title: "關於管理者 | GeoPingKak - GeoGuessr 台灣中文攻略站",
    description: "認識 GeoPingKak 網站管理者山葵冰角，了解網站的創立初衷與推廣理念。",
    url: "https://geopingkak.web.app/about",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "關於管理者 - GeoPingKak",
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">管理者</h1>

      {/* 主要介紹區塊 */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 bg-zinc-800 p-6 rounded-lg border border-zinc-700">
        <Image
          src="/assets/site_icon.png"
          alt="山葵冰角頭像"
          width={96}
          height={96}
          className="rounded-full border-2 border-zinc-600 shrink-0"
        />
        <div className="flex flex-col text-center sm:text-left">
          <h2 className="text-2xl font-semibold mb-2">山葵冰角 Wasabi Pingkak</h2>
          <div className="mx-auto sm:mx-0">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* 嵌入 YouTube 影片 */}
      <div className="relative w-full max-w-xl aspect-video mb-8">
        <iframe
          className="absolute inset-0 w-full h-full rounded-lg"
          src="https://www.youtube.com/embed/_v6-N_PLbic?si=5iQ6mrrvSFDd9muo"
          title="山葵冰角 YouTube 頻道介紹"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>

      {/* 邀請連結說明 */}
      <div>
        <h3 className="text-2xl font-bold mb-4">訂閱遊戲</h3>
        <p className="mb-4 leading-relaxed">
          如果你覺得這個網站對你有幫助，也玩得很開心，非常鼓勵你正式訂閱 GeoGuessr！
        </p>
        <p className="p-4 bg-blue-900/50 border-l-4 border-blue-500 rounded-r-lg leading-relaxed">
          <strong>
            <a
              href="https://www.geoguessr.com/referral-program/LINP-KENI-QEF0?s=rp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 underline hover:text-blue-200"
            >
              推薦你使用我的邀請連結訂閱
            </a>
          </strong>
          ，這樣不僅能以 Pro Unlimited 的價格直接升級到 Pro Elite 方案，我也能從中獲得一點點分潤，支持我繼續維護這個網站與推廣遊戲。
        </p>
        <div className="mt-3 p-4 bg-yellow-900/40 border-l-4 border-yellow-500 rounded-r-lg text-sm text-yellow-300">
          此邀請連結每個帳號最多只能使用五次，如果顯示無效，也歡迎加入本站的 Discord 群，在「邀請碼分享」頻道尋找可用的推薦連結。
        </div>
      </div>
    </div>
  );
}
