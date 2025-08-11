import React from "react";

export default function TabIntro() {
  return (
    <div className="text-muted-foreground text-sm leading-relaxed space-y-6">
      <section>
        <h2 className="text-lg font-bold text-white mb-2">🌍 GeoGuessr 是什麼？為什麼值得一玩？</h2>
        <p>
          GeoGuessr 本質上是一款 <strong>推理遊戲</strong>，而不是單純的猜謎遊戲。<br />
          它的魅力在於：<strong>即使你一開始對世界一無所知，也能透過觀察與思考，從有限的線索中找出正確答案</strong>。
        </p>
        <p>
          你在遊戲中會被隨機放置在地球某個地方的 Google 街景畫面，透過觀察道路、建築、語言、風景、車輛與其他文化元素，來推理出你身在何處。
          這是一種將地理知識、文化常識與邏輯思考結合的遊戲方式。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-white mb-2">🧠 如何開始學 GeoGuessr ？</h2>
        <p>
          玩 GeoGuessr 不需要你一開始就記住所有國家的車牌、路樁或街景車天線。<br />
          相反地，它本身就是一個很棒的學習載體，可以讓你一邊玩一邊認識這個世界。
        </p>
        <p>
          你對現實世界的任何知識——<strong>歷史、語言、宗教、交通、貨幣、建築風格、甚至是旅遊經驗</strong>，都可能成為你推理出正確答案的關鍵。
        </p>
        <p>
          你可以一無所知的進入遊戲開始玩，然後用自己的經驗去推理。<br />
          當你遇到不熟悉的國家時，不妨直接打開維基百科看看這個國家的背景，了解它的歷史脈絡、官方語言、文化特色、地理位置與鄰國。
          這些知識都能幫助你在未來更快地辨認出相同的國家，每個人都是這樣學會的。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-white mb-2">🔰 新手從哪裡開始？</h2>
        <p>
          如果你是完全的新手，建議不要一開始就急著背電線桿樣式、街景車的外觀與天線，或是各國的路牌樣式。<br />
          <strong>先建立一個正確的推理觀念以及對這個國家的理解，比起背起細節更重要。</strong><br />
          在有脈絡跟背景知識的前提下，你才能真正的掌握這個遊戲。<br />
        </p>
        <p>
          你可以從我現在的這一頁《入門教學》開始，裡面會教你一些<strong>通用的觀察技巧與推理方式</strong>，幫助你從一開始就用正確的方向學習這款遊戲。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-white mb-2">📚 進階學習資源</h2>
        <p>
          如果你已經開始上手，並想要更深入了解各國的特色線索，我也整理了一些<strong>進階攻略與國家專屬教學資源</strong>，放在「其他教學資源」的分頁中。
        </p>
        <p>
          GeoGuessr 已經發展出一個全球性的玩家社群，來自世界各地的玩家花了多年時間累積了豐富的教學內容與分析。<br />
          他們做得比我更專業，但不論你從哪裡開始，都能慢慢進步。
        </p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-white mb-2">🧭 先學會這些觀念再出發</h2>
        <p>在正式進入細節之前，如果你還沒接觸過下列這些概念，建議你可以先從這些入門知識開始學起：</p>
        <ul className="list-disc list-inside pl-4 space-y-1">
          <li>哪些國家有街景覆蓋？</li>
          <li>知道<strong>網域</strong>也可以判斷地區</li>
          <li>各國的<strong>道路通行方向</strong>與駕駛習慣是什麼？</li>
          <li>知道特定國家的車牌本身就是最大的線索</li>
          <li>太陽如何在這個遊戲中幫助你縮小範圍？</li>
        </ul>
        <p>這些通用觀念會在你遊戲初期幫上大忙。</p>
      </section>

      <section>
        <h2 className="text-lg font-bold text-white mb-2">結語</h2>
        <p>
          GeoGuessr 的遊戲核心是訓練你如何「在陌生的環境裡從提取出有用的線索，並推理出答案」。<br />
          這正是它最迷人、也最有成就感的地方。
        </p>
      </section>
    </div>
  );
}
