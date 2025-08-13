// app/qna/page.tsx

import React from "react";

export default function QnAPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">常見問答 Q&A</h1>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：這個網站可以免費使用嗎？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          可以，本網站提供的每日挑戰與特殊主題地圖連結都可以免費遊玩，<br />
          不需要註冊 GeoGuessr 帳號，也不需要付費訂閱。
        </p>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：這是合法的嗎？為什麼這裡不用錢就能玩？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          是的，這是合法的，這也是 GeoGuessr 官方設計的一種遊戲模式。<br />
          所謂「挑戰連結（challenge link）」是由付費玩家建立的一種玩法，會提供五題固定題目的遊戲連結。<br />
          題目的地圖、時間限制與其他設定，都是由產生連結的玩家決定。<br />
          免費玩家只能透過這些連結體驗遊戲，無法自由選擇地圖或模式。<br />
          如果你還不太理解這個模式，可以參考官方的說明頁面：<br />
          <a
            href="https://www.geoguessr.com/organizations"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            https://www.geoguessr.com/organizations
          </a>
        </p>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：我只是路過的普通人，不是主播也可以玩嗎？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          當然可以！這個網站的設計初衷就是希望讓還在觀望、不確定是否付費的人，也能輕鬆體驗 GeoGuessr。<br />
          如果你是 Vtuber 或實況主，也歡迎參考本站的「直播企劃提案」分頁，獲得更多實況建議與免費資源。
        </p>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：免費玩家可以使用本站提供的連結進行對戰或多人遊戲嗎？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          不行。<br />
          挑戰連結是遊戲內提供的一種「單人模式」，所有與玩家之間即時互動的模式（例如對戰或多人同場遊玩）都是付費功能。<br />
          如果你想開 Party 或進行觀眾互動，需要先付費訂閱 GeoGuessr 才能使用「Party」模式。<br />
          本站所提供的挑戰連結則僅供一人一連結一局的免費體驗。
        </p>
      </div>

      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：我可以送你錢嗎？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本網站是自發性的遊戲推廣專案，本專案目前沒有打算接受任何贊助。<br />
          如果你真的想花錢，那我會支持你直接訂閱 GeoGuessr 遊戲本體，讓遊戲能繼續營利與運作。<br />
          你可以使用我的邀請連結訂閱，會有額外的優惠：<br />
          <a
            href="https://www.geoguessr.com/referral-program/LINP-KENI-QEF0?s=rp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            https://www.geoguessr.com/referral-program/LINP-KENI-QEF0?s=rp
          </a>
        </p>
      </div>

    </div>
  );
}
