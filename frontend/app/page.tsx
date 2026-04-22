import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GeoGuessr 台灣中文攻略站 | 教學、地圖資源與每日挑戰 - GeoPingKak",
  description: "GeoPingKak 是台灣最完整的 GeoGuessr 中文資源站，提供新手入門教學、攻略技巧、特殊主題地圖與每日挑戰連結。加入中文 GeoGuessr 社群，一起探索世界！",
  openGraph: {
    title: "GeoGuessr 台灣中文攻略站 | 教學與地圖資源 - GeoPingKak",
    description: "台灣最完整的 GeoGuessr 中文資源站：新手教學、攻略技巧、特殊地圖推薦與每日挑戰。加入社群一起玩！",
    url: "https://geopingkak.web.app/",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "website",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoPingKak - GeoGuessr 台灣中文攻略站",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 台灣中文攻略站 - GeoPingKak",
    description: "新手教學、攻略技巧、特殊地圖推薦與每日挑戰。台灣最完整的 GeoGuessr 中文資源站！",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
  alternates: {
    canonical: "https://geopingkak.web.app/",
  },
  other: {
    "article:published_time": "2025-07-29",
    "article:modified_time": "2026-03-21",
  },
};

export default function HomePage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">GeoGuessr 台灣中文攻略站 — GeoPingKak</h1>

      <p className="mb-4 text-lg leading-relaxed">
        這是一個為台灣及中文圈玩家設立的 GeoGuessr 攻略網站，目標是擴大社群、提供新手友善的教學與遊玩資源。
      </p>

      <p className="mb-8 p-4 bg-green-900/50 border-l-4 border-green-500 rounded-r-lg">
        <span className="text-green-400 font-bold">
          長話短說：來玩遊戲就直接點<a href="/daily-challenge" className="underline hover:text-green-300">每日免費挑戰</a>，Nickname 隨便打，不用登入也不用錢，合法的。
        </span>
      </p>

      {/* 卡片 1: 什麼是挑戰模式 */}
      <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-bold mb-3">什麼是「挑戰模式 Challenge Mode」？</h2>
        <p className="mb-4 leading-relaxed">
          自 2024 年起，GeoGuessr 改為訂閱制。但透過付費玩家建立的 <strong>挑戰模式</strong>，
          只要取得連結，即使未登入也能<a href="/daily-challenge" className="text-blue-400 underline hover:text-blue-300">免費遊玩</a>！
        </p>
        <p className="leading-relaxed text-zinc-300">
          這是目前官方唯一可以讓非訂閱玩家免費遊玩的管道。挑戰模式是付費玩家可以挑選遊戲內任一張地圖，產生一個固定五題的連結，每個知道連結的玩家都會玩到一模一樣的題目。除了題目是固定的、無法多人對戰以外，遊玩方式皆與正常遊戲相同。
        </p>
      </div>

      {/* 引言區塊 (取代原本的純文字段落) */}
      <div className="my-10 px-6 py-4 bg-zinc-800/60 border-l-4 border-blue-500 rounded-r-lg">
        <p className="leading-relaxed text-zinc-200">
          GeoGuessr 的入門門檻偏高，官方免費版限制多，新手難以練習。因此，本站希望提供更多新手友善的遊玩連結與<a href="/tutorial" className="text-blue-400 underline hover:text-blue-300">教學資源</a>，讓大家有機會體驗這款遊戲的魅力。
        </p>
      </div>

      {/* 快速導覽 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
        <a href="/daily-challenge" className="bg-zinc-800 border border-zinc-700 p-5 rounded-lg hover:border-blue-500 transition-colors group">
          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">每日免費挑戰</h3>
          <p className="text-sm text-zinc-400">每天更新的世界、台灣、日本地圖，免登入直接玩。</p>
        </a>
        <a href="/tutorial" className="bg-zinc-800 border border-zinc-700 p-5 rounded-lg hover:border-blue-500 transition-colors group">
          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">新手教學攻略</h3>
          <p className="text-sm text-zinc-400">從零開始學習 GeoGuessr，掌握車牌、國旗、街景等判斷技巧。</p>
        </a>
        <a href="/special-maps" className="bg-zinc-800 border border-zinc-700 p-5 rounded-lg hover:border-blue-500 transition-colors group">
          <h3 className="text-lg font-bold mb-2 group-hover:text-blue-400 transition-colors">特殊主題地圖</h3>
          <p className="text-sm text-zinc-400">精選趣味挑戰題庫，各國特色場景免費遊玩。</p>
        </a>
      </div>

      {/* 卡片 2: 給實況主的建議 */}
      <div className="bg-zinc-800 border border-zinc-700 p-6 rounded-lg my-8">
        <h2 className="text-2xl font-bold mb-3">給 Vtuber 與實況主</h2>
        <p className="leading-relaxed text-zinc-300">
          有企劃需求嗎？歡迎參考本站<a href="/show-proposals" className="text-blue-400 underline hover:text-blue-300">「直播企劃提案」</a>中提供的企劃書與建議，可以直接使用本站的內容做為你的直播企劃。
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

        {/* Discord 社群連結 */}
        <a
          href="https://discord.gg/ABpdGBbDe4"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 flex items-center gap-3 p-4 bg-blue-900/30 border border-blue-700 rounded-lg hover:bg-blue-900/50 hover:border-blue-600 transition-colors group"
        >
          <svg
            className="w-6 h-6 flex-shrink-0 text-blue-400 group-hover:text-blue-300 transition-colors"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
          </svg>
          <div className="flex items-center gap-2">
            <span className="text-blue-300 group-hover:text-blue-200 transition-colors">加入 GeoPingKak Discord 社群</span>
            <svg className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </a>

        <p className="mt-6 p-4 bg-red-900/50 border-l-4 border-red-500 rounded-r-lg font-bold text-red-400">
          注意：GeoGuessr 在 Steam 有上架，但 Steam 版是相同價格的閹割版，目前只做完對戰模式，沒有其他東西能玩。目前不建議購買 Steam 版。
        </p>
      </div>
    </div>
  );
}