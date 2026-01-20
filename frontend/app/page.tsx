import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GeoGuessr 台灣中文推廣站 | 免費每日挑戰、新手教學與地圖資源 - GeoPingKak",
  description: "GeoPingKak 是台灣最完整的 GeoGuessr 中文資源站，提供免費每日挑戰連結、新手入門教學、特殊主題地圖推薦。無需登入、不用付費，立即開始你的地理探索之旅！",
  openGraph: {
    title: "GeoGuessr 台灣中文推廣站 | 免費玩、免登入 - GeoPingKak",
    description: "提供 GeoGuessr 免費每日挑戰、完整中文教學、特殊地圖推薦。新手友善、無需付費，立即開始玩！",
    url: "https://geopingkak.web.app/",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoPingKak - GeoGuessr 台灣中文推廣站",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 台灣中文推廣站 | 免費玩 - GeoPingKak",
    description: "免費每日挑戰、新手教學、特殊地圖推薦。完全免登入，立即開始玩！",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
  alternates: {
    canonical: "https://geopingkak.web.app/",
  },
};

export default function HomePage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">歡迎來到 GeoPingKak 中文推廣站</h1>

      <p className="mb-4 text-lg leading-relaxed">
        這是一個為台灣及中文圈玩家設立的 GeoGuessr 推廣網站，目標是擴大社群、提供新手友善的教學與遊玩資源。
      </p>

      <p className="mb-8 p-4 bg-green-900/50 border-l-4 border-green-500 rounded-r-lg">
        <span className="text-green-400 font-bold">
          長話短說：來玩遊戲就直接點每日題目，Nickname 隨便打，不用登入也不用錢，合法的。
        </span>
      </p>

      {/* 卡片 1: 什麼是挑戰模式 */}
      <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-3">什麼是「挑戰模式 Challenge Mode」？</h2>
        <p className="mb-4 leading-relaxed">
          自 2024 年起，GeoGuessr 改為訂閱制。但透過付費玩家建立的 <strong>挑戰模式</strong>，
          只要取得連結，即使未登入也能免費遊玩！
        </p>
        <p className="leading-relaxed text-zinc-300">
          這是目前官方唯一可以讓非訂閱玩家免費遊玩的管道。挑戰模式是付費玩家可以挑選遊戲內任一張地圖，產生一個固定五題的連結，每個知道連結的玩家都會玩到一模一樣的題目。除了題目是固定的、無法多人對戰以外，遊玩方式皆與正常遊戲相同。
        </p>
      </div>

      {/* 引言區塊 (取代原本的純文字段落) */}
      <div className="my-10 px-6 py-4 bg-zinc-800/60 border-l-4 border-blue-500 rounded-r-lg">
        <p className="leading-relaxed text-zinc-200">
          GeoGuessr 的入門門檻偏高，官方免費版限制多，新手難以練習。因此，本站希望提供更多新手友善的遊玩連結與教學資源，讓大家有機會體驗這款遊戲的魅力。
        </p>
      </div>

      {/* 卡片 2: 給實況主的建議 */}
      <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-lg my-8">
        <h2 className="text-2xl font-bold mb-3">給 Vtuber 與實況主</h2>
        <p className="leading-relaxed text-zinc-300">
          有企劃需求嗎？歡迎參考本站「直播企劃提案」中提供的企劃書與建議，可以直接使用本站的內容做為你的直播企劃。
        </p>
      </div>

      {/* 訂閱與方案說明 */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-3">準備好加入 GeoGuessr 了嗎？</h2>
        <p className="mb-4 leading-relaxed">
          如果你玩得開心，也鼓勵你考慮正式訂閱，完整版本將可以無限遊玩所有地圖與進階模式！
        </p>
        <p className="mb-4 leading-relaxed">
          GeoGuessr 目前有兩種付費方案：<strong>Pro Unlimited</strong> 和 <strong>Pro Elite</strong>。<br />
          透過 <a href="https://www.geoguessr.com/referral-program/LINP-KENI-QEF0?s=rp" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">本站的邀請連結訂閱</a>，可以用與 Pro Unlimited 相同的價格，直接升級到更高級的 Pro Elite 方案。<br />
        </p>
        <div className="mt-3 p-4 bg-yellow-900/40 border-l-4 border-yellow-500 rounded-r-lg text-sm text-yellow-300">
          此邀請連結每個帳號最多只能使用五次，如果顯示無效，也歡迎加入本站的 Discord 群，在「邀請碼分享」頻道尋找可用的推薦連結。
        </div>
        <p className="mt-6 p-4 bg-red-900/50 border-l-4 border-red-500 rounded-r-lg font-bold text-red-400">
          注意：GeoGuessr 在 Steam 有上架，但 Steam 版是相同價格的閹割版，目前只做完對戰模式，沒有其他東西能玩。目前不建議購買 Steam 版。
        </p>
      </div>
    </div>
  );
}