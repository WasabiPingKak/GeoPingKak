import SocialLinks from "@/components/SocialLinks";

export default function HomePage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">歡迎來到 GeoPingKak</h1>

      <p className="mb-4 leading-relaxed">
        這裡是台灣 Vtuber <strong>山葵冰角</strong> 推廣 GeoGuessr 的網站，目標是擴大中文玩家社群。
      </p>

      <p className="mb-4 leading-relaxed">
        自 2024 年起，GeoGuessr 改為訂閱制。但透過付費玩家建立的 <strong>挑戰模式（Challenge Mode）</strong>，
        只要取得連結，即使未登入也能免費遊玩！
      </p>

      <p className="mb-4 leading-relaxed">
        GeoGuessr 的入門門檻偏高，官方每日只提供三題免費挑戰，新手難以練習；也有不少人只是想試玩或短期企劃，尚未決定是否訂閱。<br />
        本站希望提供更多新手友善的挑戰與教學資源，讓大家有機會體驗這款遊戲的魅力。
      </p>


      <p className="mb-4 leading-relaxed">
        如果你是 Vtuber 或實況主，有企劃需求，也可以參考本站「企劃分頁」中提供的合作企劃書與素材。
      </p>

      <div className="mt-8">
        <h2 className="text-4xl font-semibold mb-2">管理者</h2>

        <div className="flex items-center gap-4 mb-4">
          {/* 頭像 */}
          <img
            src="/assets/site_icon.png"
            alt="山葵冰角頭像"
            className="w-16 h-16 rounded-full border border-zinc-600 shrink-0"
          />

          {/* 文字 + 社群連結區塊 */}
          <div className="flex flex-col">
            <div className="text-lg font-medium mb-1">山葵冰角 Wasabi Pingkak</div>
            <SocialLinks />
          </div>
        </div>
      </div>

      <p className="mt-10 mb-4 leading-relaxed">
        如果你玩得開心，也非常鼓勵你正式訂閱 GeoGuessr，完整版本將可以無限遊玩所有地圖與進階模式！<br />
        <a
          href="https://www.geoguessr.com/referral-program/LINP-KENI-QEF0?s=rp"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline"
        >
          推薦你使用我的邀請連結
        </a>
        。
      </p>

      <p className="mb-4 leading-relaxed">
        GeoGuessr 目前有兩種付費方案：<strong>Pro Unlimited</strong> 和 <strong>Pro Elite</strong>。<br />
        使用邀請碼的話，可以用與 Pro Unlimited 相同的價格，直接升級到更高級的 Pro Elite 方案。
      </p>
    </div>
  );
}
