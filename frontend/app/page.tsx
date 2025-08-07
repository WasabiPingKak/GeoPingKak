import SocialLinks from "@/components/SocialLinks";

export default function HomePage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">歡迎來到 GeoPingKak 中文推廣站</h1>

      <p className="mb-4 leading-relaxed">
        這裡是台灣 Vtuber <strong>山葵冰角</strong> 推廣 GeoGuessr 的網站，目標是擴大中文玩家社群。
      </p>

      <p className="mb-4 leading-relaxed">
        <span className="text-green-600 font-bold">
          ← 長話短說：來玩遊戲就直接點每日題目，Nickname 隨便打，不用登入也不用錢，合法的。
        </span>
      </p>

      <p className="mb-4 leading-relaxed">
        自 2024 年起，GeoGuessr 改為訂閱制。但透過付費玩家建立的 <strong>挑戰模式（Challenge Mode）</strong>，
        只要取得連結，即使未登入也能免費遊玩！
      </p>

      <p className="mb-4 leading-relaxed">
        <strong>挑戰模式（Challenge Mode）</strong>，是目前官方唯一可以讓非訂閱玩家免費遊玩的管道，挑戰模式是付費玩家可以挑選遊戲內任一張地圖，產生一個固定五題的連結，每個知道連結的玩家都會玩到一模一樣的題目。<br />
        除了題目是固定的、無法多人對戰以外，遊玩方式皆與正常遊戲相同。
      </p>
      <p className="mb-4 leading-relaxed">
        GeoGuessr 的入門門檻偏高，官方每日只提供三題免費挑戰，且每題又有兩分鐘的時限，新手難以練習；也有不少人只是想試玩或製作短期企劃，需要更多遊戲體驗與心得才能決定是否訂閱。<br />
        本站希望提供更多新手友善的遊玩連結與教學資源，讓大家有機會體驗這款遊戲的魅力。
      </p>

      <p className="mb-4 leading-relaxed">
        如果你是 Vtuber 或實況主，有企劃需求，也可以參考本站「企劃分頁」中提供的企劃書與素材。<br />
        歡迎直接使用本站的內容做為你的直播企劃，不用告知管理者(我)，就當作是「
        <a href="https://2pick.app/" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-blue-600">
          殘酷二選一
        </a>
        」一樣，只要附上出處即可。
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
          推薦你使用我的邀請連結訂閱
        </a>
        。
      </p>

      <p className="mb-4 leading-relaxed">
        GeoGuessr 目前有兩種付費方案：<strong>Pro Unlimited</strong> 和 <strong>Pro Elite</strong>。<br />
        使用邀請連結的話，可以用與 Pro Unlimited 相同的價格，直接升級到更高級的 Pro Elite 方案。
      </p>
      <p className="mb-4 leading-relaxed font-bold text-red-500">
        GeoGuessr 在 Steam 有上架，但 Steam 版是相同價格的閹割版，目前只做完對戰模式，沒有其他東西能玩。<br />
        目前不建議購買 Steam 版。
      </p>
    </div >
  );
}
