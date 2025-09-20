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
          透過 <a href="https://www.geoguessr.com/referral-program/LINP-KENI-QEF0?s=rp" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">本站的邀請連結訂閱</a>，可以用與 Pro Unlimited 相同的價格，直接升級到更高級的 Pro Elite 方案。
        </p>
        <p className="mt-6 p-4 bg-red-900/50 border-l-4 border-red-500 rounded-r-lg font-bold text-red-400">
          注意：GeoGuessr 在 Steam 有上架，但 Steam 版是相同價格的閹割版，目前只做完對戰模式，沒有其他東西能玩。目前不建議購買 Steam 版。
        </p>
      </div>
    </div>
  );
}