import React from "react";
import type { Metadata } from "next";
import Script from "next/script";

export const generateMetadata = (): Metadata => ({
  title: "GeoGuessr 常見問題 Q&A | GeoPingKak 免費中文挑戰教學站",
  description:
    "這裡整理了 GeoGuessr 免費玩法（geoguessr free）、每日挑戰連結（geoguessr challenge）、Pro 訂閱差異與台灣地圖攻略，幫助中文玩家快速上手。",
  openGraph: {
    title: "GeoGuessr 常見問題 Q&A | GeoPingKak",
    description:
      "你是否在找 geoguessr free、geoguessr challenge 或中文教學？這一頁完整整理 GeoGuessr 免費遊玩方法與常見問題。",
    url: "https://geopingkak.web.app/qna",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "article",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoGuessr 常見問題說明頁",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 免費玩法與常見問題 | GeoPingKak",
    description:
      "快速了解 GeoGuessr 免費挑戰、Pro 功能差異與台灣地圖推薦，幫助你輕鬆入門這款地理益智遊戲。",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
});

export default function QnAPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">常見問答 Q&A</h1>

      {/* Q1 */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：這個網站可以免費使用嗎？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          可以，本網站提供的每日挑戰與特殊主題地圖連結都可以免費遊玩，<br />
          不需要註冊 GeoGuessr 帳號，也不需要付費訂閱。
        </p>
      </div>

      {/* Q2 */}
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

      {/* Q3 */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：我只是路過的普通人，不是主播也可以玩嗎？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          當然可以！這個網站的設計初衷就是希望讓還在觀望、不確定是否付費的人，也能輕鬆體驗 GeoGuessr。<br />
          如果你是 Vtuber 或實況主，也歡迎參考本站的「直播企劃提案」分頁，獲得更多實況建議與免費資源。
        </p>
      </div>

      {/* Q4 */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：免費玩家可以使用本站提供的連結進行對戰或多人遊戲嗎？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          不行。<br />
          挑戰連結是遊戲內提供的一種「單人模式」，所有與玩家之間即時互動的模式（例如對戰或多人同場遊玩）都是付費功能。<br />
          如果你想開 Party 或進行觀眾互動，需要先付費訂閱 GeoGuessr 才能使用「Party」模式。<br />
          本站所提供的挑戰連結則僅供一人一連結一局的免費體驗。
        </p>
      </div>

      {/* Q5 */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：GeoGuessr 有中文介面嗎？本站怎麼幫助中文玩家？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          GeoGuessr 官方網站目前不支援中文介面，但遊戲的操作方式非常直覺。<br />
          本站提供完整的中文教學與每日地圖挑戰，幫助中文使用者輕鬆體驗遊戲。<br />
          你也可以參考本站整理的《入門攻略》與《推薦設定》進行調整。
        </p>
      </div>

      {/* Q6 */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：GeoGuessr 的 Pro 訂閱是什麼？我需要買嗎？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          GeoGuessr Pro 是官方推出的付費方案，解鎖自由選擇地圖、自訂對戰、多人模式等進階功能。<br />
          如果你只是想體驗遊戲、每天玩幾局，透過本站每日挑戰連結（geoguessr challenge）就足夠，不需要額外付費。<br />
          若你想無限制遊玩不同地圖、與朋友即時對戰或開 Party，可以考慮訂閱 Pro 方案（geoguessr free 僅限挑戰連結模式）。
        </p>
      </div>

      {/* Q7 */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：我想玩「台灣地圖」，要怎麼做？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          目前 GeoGuessr 雖然有台灣相關地圖，但需要 Pro 訂閱才能自由選擇。<br />
          本站每日題目中特設設計提供了兩個不同難度的台灣地圖挑戰連結，每日更新，讓你免費體驗不同地圖類型。<br />
          且精心手選了「台灣主題挑戰連結」，包含台灣的各種奇特地名與諧音梗招牌，有興趣可以從《特殊主題地圖》開始。
        </p>
      </div>

      {/* Q8 */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：我可以送你錢嗎？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          本網站是自發性的遊戲推廣專案，本專案目前沒有打算接受任何贊助。<br />
          如果你真的想花錢，那我會支持你直接訂閱 GeoGuessr 遊戲本體，讓遊戲能繼續營利與運作。<br />
          若你有意願購買，本站的 DC 群有邀請碼分享區，你可以透過邀請碼用原價升級到更高階的訂閱版本。
        </p>
      </div>

      {/* ✅ FAQ Schema 結構化資料 */}
      <Script id="faq-schema" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "這個網站可以免費使用嗎？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "可以，本網站提供的每日挑戰與特殊主題地圖連結都可以免費遊玩，不需要註冊 GeoGuessr 帳號，也不需要付費訂閱。"
              }
            },
            {
              "@type": "Question",
              "name": "這是合法的嗎？為什麼這裡不用錢就能玩？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "是的，這是合法的，挑戰連結是 GeoGuessr 官方提供的玩法，免費玩家可以透過這些連結遊玩固定題目的挑戰。"
              }
            },
            {
              "@type": "Question",
              "name": "我只是路過的普通人，不是主播也可以玩嗎？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "可以，本網站的設計初衷就是讓所有人都能輕鬆體驗 GeoGuessr，不論是否為 Vtuber 或實況主。"
              }
            },
            {
              "@type": "Question",
              "name": "免費玩家可以使用本站提供的連結進行對戰或多人遊戲嗎？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "不行，挑戰連結是單人模式，對戰與多人同場遊玩為 Pro 付費功能。"
              }
            },
            {
              "@type": "Question",
              "name": "GeoGuessr 有中文介面嗎？本站怎麼幫助中文玩家？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "GeoGuessr 官方不支援中文介面，但本站提供完整中文教學與每日挑戰，幫助中文玩家入門。"
              }
            },
            {
              "@type": "Question",
              "name": "GeoGuessr 的 Pro 訂閱是什麼？我需要買嗎？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "GeoGuessr Pro 是官方付費方案，解鎖更多地圖與對戰功能。若你只想透過 geoguessr challenge 體驗每日題目，則不需訂閱。"
              }
            },
            {
              "@type": "Question",
              "name": "我想玩台灣地圖，要怎麼做？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "GeoGuessr 的台灣地圖需 Pro 才能自由選擇。本站每日更新台灣挑戰連結，免費體驗不同主題地圖。"
              }
            },
            {
              "@type": "Question",
              "name": "我可以送你錢嗎？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "本站不接受贊助，建議直接訂閱 GeoGuessr 遊戲本體支持官方營運。"
              }
            }
          ]
        })}
      </Script>
    </div>
  );
}
