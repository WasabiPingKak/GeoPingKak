import React from "react";
import type { Metadata } from "next";
import Script from "next/script";

export const generateMetadata = (): Metadata => ({
  title: "GeoGuessr 怎麼玩？新手常見問題一次解答 - GeoPingKak",
  description:
    "GeoGuessr 是什麼？怎麼免費玩？Pro 要不要買？台灣地圖在哪？這裡整理了新手最常問的問題，用中文幫你快速搞懂 GeoGuessr 的一切。",
  alternates: {
    canonical: "https://geopingkak.web.app/qna",
  },
  openGraph: {
    title: "GeoGuessr 怎麼玩？新手常見問題一次解答 - GeoPingKak",
    description:
      "GeoGuessr 是什麼？怎麼免費玩？Pro 要不要買？用中文幫你快速搞懂 GeoGuessr 的一切。",
    url: "https://geopingkak.web.app/qna",
    siteName: "GeoPingKak",
    locale: "zh_TW",
    type: "article",
    images: [
      {
        url: "https://geopingkak.web.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "GeoGuessr 常見問題解答 - GeoPingKak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GeoGuessr 怎麼玩？新手常見問題 - GeoPingKak",
    description:
      "GeoGuessr 是什麼？怎麼免費玩？Pro 要不要買？用中文幫你快速搞懂這款地理益智遊戲。",
    images: ["https://geopingkak.web.app/og-image.png"],
  },
  other: {
    "article:published_time": "2025-08-13",
    "article:modified_time": "2026-03-21",
  },
});

export default function QnAPage() {
  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">常見問答 Q&A</h1>

      {/* Q0-A */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：GeoGuessr 是什麼？怎麼玩？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          GeoGuessr 是一款由瑞典開發的線上地理推理遊戲。玩家會被丟到 Google 街景的某個隨機地點，必須觀察周圍的<strong>路標、車牌、招牌、植被、建築風格、太陽方位</strong>等線索，在世界地圖上猜出自己身處何方，越接近正確位置分數越高。<br />
          想直接體驗？點開本站<a href="/daily-challenge" className="text-blue-400 underline">每日免費挑戰</a>，不用註冊、不用付費，打個 Nickname 就能玩。新手建議先讀<a href="/tutorial" className="text-blue-400 underline">入門教學</a>建立基本判斷邏輯。
        </p>
      </div>

      {/* Q0-B */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：沒訂閱 Pro 也能玩 GeoGuessr 嗎？免費版有什麼限制？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          可以玩，但有限制。GeoGuessr 自 2024 年起改為訂閱制，未訂閱玩家<strong>無法自由選擇地圖、無法即時對戰、無法使用 Party 多人模式</strong>。<br />
          但官方保留了「<strong>挑戰連結（Challenge Link）</strong>」這個合法管道：付費玩家產生的連結，任何人點開就能玩相同的五題挑戰，免登入、免註冊。本站每天彙整世界、台灣、日本三組免費挑戰，等於繞過訂閱限制體驗完整遊戲。
        </p>
      </div>

      {/* Q0-C */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：GeoGuessr 在台灣可以玩嗎？網路會卡嗎？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          可以，台灣完全沒有任何地區封鎖，網路速度也沒有問題。GeoGuessr 主要載入的是 Google 街景圖資，台灣連到 Google 服務的速度向來穩定，遊玩體驗順暢。<br />
          台灣玩家還有額外福利：本站每日提供一張<strong>台灣專屬地圖</strong>挑戰，包含各種特色街景、奇特地名與諧音梗招牌，是中文圈獨家的玩法。
        </p>
      </div>

      {/* Q0-D */}
      <div className="bg-zinc-800 border border-zinc-700 rounded-lg p-5 shadow mb-6">
        <h2 className="text-lg font-semibold text-white mb-2">Q：GeoGuessr 新手必學的技巧有哪些？</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          新手最快上手的五個技巧：<br />
          1. <strong>看車牌</strong>：歐盟車牌左側有藍條、北美州牌格式各異，是最直接的線索。<br />
          2. <strong>看路標語言</strong>：文字是哪種語系，瞬間縮小到一個地區。<br />
          3. <strong>看靠左／靠右行駛</strong>：全球只有約 60 個國家靠左行駛，可大幅縮小範圍。<br />
          4. <strong>看太陽方位</strong>：太陽在北方代表南半球，反之亦然。<br />
          5. <strong>看 Google 車的 Generation</strong>：不同地區的街景車有不同特徵（白車、黑車、模糊度）。<br />
          完整教學請見<a href="/tutorial" className="text-blue-400 underline">新手攻略</a>。
        </p>
      </div>

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
          "datePublished": "2025-08-13",
          "dateModified": "2026-05-07",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "GeoGuessr 是什麼？怎麼玩？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "GeoGuessr 是一款由瑞典開發的線上地理推理遊戲。玩家會被丟到 Google 街景的某個隨機地點，必須觀察周圍的路標、車牌、招牌、植被、建築風格、太陽方位等線索，在世界地圖上猜出自己身處何方，越接近正確位置分數越高。"
              }
            },
            {
              "@type": "Question",
              "name": "沒訂閱 Pro 也能玩 GeoGuessr 嗎？免費版有什麼限制？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "可以玩，但有限制。GeoGuessr 自 2024 年起改為訂閱制，未訂閱玩家無法自由選擇地圖、無法即時對戰、無法使用 Party 多人模式。但官方保留了「挑戰連結（Challenge Link）」這個合法管道：付費玩家產生的連結，任何人點開就能玩相同的五題挑戰，免登入、免註冊。"
              }
            },
            {
              "@type": "Question",
              "name": "GeoGuessr 在台灣可以玩嗎？網路會卡嗎？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "可以，台灣完全沒有任何地區封鎖，網路速度也沒有問題。GeoGuessr 主要載入的是 Google 街景圖資，台灣連到 Google 服務的速度向來穩定，遊玩體驗順暢。本站每日另提供台灣專屬地圖挑戰。"
              }
            },
            {
              "@type": "Question",
              "name": "GeoGuessr 新手必學的技巧有哪些？",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "五個最快上手的技巧：1. 看車牌（歐盟藍條、北美州牌）；2. 看路標語言；3. 看靠左／靠右行駛（全球只有約 60 個國家靠左）；4. 看太陽方位（南北半球判斷）；5. 看 Google 街景車的 Generation 特徵。"
              }
            },
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
