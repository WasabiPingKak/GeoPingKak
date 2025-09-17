import SocialLinks from "@/components/SocialLinks"; // 確保這個元件路徑是正確的

export default function AboutPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">管理者</h1>

      {/* --- 主要介紹區塊 --- */}
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-8 bg-zinc-800 p-6 rounded-lg border border-zinc-700">
        {/* 頭像 */}
        <img
          src="/assets/site_icon.png" // 確保圖片路徑正確
          alt="山葵冰角頭像"
          className="w-24 h-24 rounded-full border-2 border-zinc-600 shrink-0"
        />

        {/* 文字 + 社群連結區塊 */}
        <div className="flex flex-col text-center sm:text-left">
          <h2 className="text-2xl font-semibold mb-2">山葵冰角 Wasabi Pingkak</h2>
          <div className="mx-auto sm:mx-0">
            <SocialLinks />
          </div>
        </div>
      </div>

      {/* 嵌入 YouTube 影片 */}
      <iframe width="560" height="315" src="https://www.youtube.com/embed/qgUkJo5ufxI?si=D3Lul4MetUFzCYC8"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin" allowFullScreen>
      </iframe>

      {/* --- 邀請連結說明 --- */}
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
      </div>

    </div>
  );
}