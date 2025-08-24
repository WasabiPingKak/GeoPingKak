// components/proposals/EntertainmentProposalTab.tsx
import React from "react";
import WarningCard from "@/components/shared/WarningCard";

export default function EntertainmentProposalTab() {
  return (
    <div className="space-y-4">
      {/* 主標題 */}
      <h2 className="text-2xl font-bold text-white tracking-tight">純娛樂企劃包</h2>

      {/* 適用對象 */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-white">適用對象：</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">
          不知道 GeoGuessr 要怎麼直播？這份企劃就是為你準備的！
          <br />
          不用花錢、不用準備素材，直接使用我整理好的免費連結就能開播，輕鬆吸引觀眾互動。
        </p>
      </section>

      {/* 定位 */}
      <h3 className="text-xl font-semibold text-white mb-3">定位：</h3>
      <section className="rounded-xl border border-zinc-700/60 bg-zinc-800/40 p-4 md:p-5">
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">

          <p>
            這是一份專為台灣觀眾與創作者設計的 GeoGuessr 入門企劃，<br />
            不需要訂閱遊戲本體或事先準備素材。<br />
            （雖然直播封面你可能還是要自己做）
          </p>

          <p>
            你可以直接使用我整理好的兩份特殊主題地圖：「台灣奇怪地名」與「台灣諧音招牌」，<br />
            作為節目的主題內容，簡單明確、方便使用。
          </p>

          <p>
            題目以台灣元素與文化為出發點，<br />
            即使觀眾對 GeoGuessr 不熟，也能快速理解參與。<br />
            每組連結固定五題，節目節奏可控，直播流程也比較好掌握。
          </p>

        </div>
      </section>

      {/* 直播情境與進行方式 */}
      <h2 className="text-xl font-semibold text-white mb-3">直播情境與進行方式</h2>
      <section className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-4 md:p-5">
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">🔧 基本準備</h3>
            <p>
              GeoGuessr 是網頁遊戲，所以你不用事先安裝任何軟體或遊戲程式。<br />
              但是還是推薦你在正式直播之前，先看過本站「推薦設定」頁中的設定，<br />
              事先知道基本的快捷鍵 (也只有三個鍵，但很重要) 與其他遊戲設定，會讓直播與遊戲流程更順暢。
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">🎙️ 適合的直播形式</h3>
            <p>
              由於 GeoGuessr 的「挑戰模式」限制，每組連結只能由一位玩家操作，無法同時多人參與或進行連線對戰。<br />
              因此這份企劃是針對「主播個人操作 + 與觀眾互動」的形式進行，節奏上更接近主題式雜談型的直播。
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">⏱️ 時間安排與節奏</h3>
            <p>
              每組主題連結包含五題，難度偏簡單，認真找的話約 1～3 分鐘就能解出一題。<br />
              換句話說，最快大約 15 分鐘內可以完成一整組挑戰，<br />
              若有與觀眾互動或閒聊，查詢典故之類等額外舉動，大約可以延伸至 30 分鐘左右玩完一組連結，<br />
              題目本身沒有作答時間限制，因此彈性非常高。
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">🎭 主題靈活運用</h3>
            <p>
              你可以依照直播氣氛自由調整節奏：<br />
              非常適合初次嘗試 GeoGuessr 類型內容的創作者使用，同時熟悉遊戲模式。<br />
              你可以將本站當作「殘酷二選一」類型的企劃使用，自行安排直播方式與時間。
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">🧑‍🤝‍🧑 雙人玩法建議</h3>
            <p>
              無論是娛樂向的特殊地圖或休閒向的世界地圖，即使自己一個人就能玩，但更推薦找個伴一起玩。<br />
              因為每個人的生活經驗跟知識都不一樣，在這個遊戲裡非常容易達到互補的效果。<br />
              同樣只需要一個人進行操作，另一個人看著操作者的畫面一起玩就可以了。
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-base font-semibold text-white">📦 想繼續玩？</h3>
            <p>
              如果你差不多玩完或玩膩我準備的特殊主題地圖，想嘗試正規的遊戲模式，<br />
              可以繼續參考下一頁《休閒企劃包》的遊戲提案內容。<br />
              我會教你如何正確的使用遊戲內的正規地圖。
            </p>
          </div>

        </div>
      </section>


      {/* 使用方式 */}
      <h2 className="text-xl font-semibold text-white mb-3">使用方式</h2>
      <section className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-4 md:p-5">
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <ol className="list-decimal pl-5 space-y-1">
            <li>點選左側選單「特殊主題地圖」</li>
            <li>選擇想要遊玩的主題（例如「台灣奇怪地名」、「台灣諧音招牌」）</li>
            <li>點擊連結即可開始遊戲（每組固定 5 題）</li>
            <li>不需登入即可遊玩，未登入的玩家需要輸入 Nickname，已登入玩家則可以直接開始</li>
            <li>作答之後，正確答案的位置會有一個旗子，直接點擊旗子會直接開啟一個 Google Map 分頁，讓你可以在地圖上重新找到它</li>
          </ol>
          <p>
            📌 備註：題目一旦玩過就無法重玩，若要重試請使用無痕模式並<strong>不要登入遊戲</strong>。
          </p>
          <p>
            🔹 GeoGuessr 在未登入時仍會要求輸入一個 Nickname，但這項功能目前已經沒有作用，<br />
            系統不會儲存或顯示這個名稱，你可以隨便輸入任何字詞，完全不影響遊玩體驗。
          </p>
        </div>
      </section>

      <h2 className="text-xl font-semibold text-white mb-3">宣傳（非強制）</h2>
      <section className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-4 md:p-5">
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">

          <p>
            這些挑戰連結與教學資源都是我整理並免費公開的，<br />
            若你覺得有幫助，也歡迎在直播中提及網站，或在資訊欄附上連結。<br />
            雖非強制，但能讓更多人認識 GeoGuessr，我會非常感謝你的支持。
          </p>

          <p>
            由於挑戰連結的題目是固定的，<br />
            觀眾在直播中看過一次後，可能就不會再特別回頭重玩。
          </p>

          <p>
            不過本站還提供每日挑戰、其他主題地圖與教學資源，<br />
            仍有機會吸引觀眾進一步體驗 GeoGuessr 的樂趣。
          </p>

        </div>
      </section>


      {/* 限制與注意事項 */}
      <h2 className="text-xl font-semibold text-white mb-3">限制與注意事項</h2>
      <section className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-4 md:p-5">
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>為了避免直播時遇到預期外的狀況，請務必確認以下限制與機制：</p>

          <div className="space-y-2">
            <h3 className="font-semibold text-base text-white">🔸 題目與玩法限制</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>本站提供的所有免費挑戰連結皆使用 GeoGuessr 官方的「挑戰模式」功能</li>
              <li>每個連結包含 5 題題目，且內容是固定不變的</li>
              <li>不支援多人連線、對戰的功能</li>
              <li>這些限制來自 GeoGuessr 官方設計，並非本站額外設下的規則</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base text-white">🔸 遊玩紀錄相關</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>未登入情況下遊玩，系統<strong>不會記錄分數與暱稱</strong></li>
              <li>登入帳號後遊玩，系統會<strong>記錄成績且每個連結只能玩一次</strong></li>
              <li>如果想重玩同一組題目，請使用瀏覽器的「無痕模式」並<strong>不要登入</strong></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-semibold text-base text-white">🔸 題目耗盡與重玩注意</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>每組挑戰連結題目只能體驗一次，玩完就無法再挑戰</li>
              <li>未登入情況下雖可重複打開連結，但題目仍然是相同的</li>
              <li>建議僅用特殊主題地圖作為正式節目內容，測試功能時請使用過去的「每日題目」的挑戰連結，以免意外消耗有限資源</li>
            </ul>
          </div>

          <p>
            這些都是出於 GeoGuessr 遊戲本身的限制，<br />
            我已盡可能設計出適合「單人遊玩 + 觀眾互動」且不用付費的直播模式，<br />
            若你的節目需求包含多人互動、同步作答等進階玩法，請參考《休閒企劃包》的提案內容。
          </p>
        </div>
      </section>

      <p>
        最後，請自由使用本站所提供的資源作為你的直播或節目內容，<br />
        <strong className="text-orange-300">
          不需要事前通知或取得管理者山葵冰角的同意
        </strong>
        。
      </p>

      {/* 警示卡片 */}
      <div className="pt-2">
        <WarningCard />
      </div>
    </div>
  );
}
