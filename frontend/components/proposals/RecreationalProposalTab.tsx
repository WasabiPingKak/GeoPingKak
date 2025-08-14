// components/proposals/RecreationalProposalTab.tsx
import React from "react";

import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

import WarningCard from "@/components/shared/WarningCard";
import MapLinkCard from "@/components/shared/MapLinkCard";

export default function RecreationalProposalTab() {
  return (
    <div className="space-y-4">
      {/* 頁面主標題 */}
      <h2 className="text-2xl font-bold text-white tracking-tight">休閒企劃包</h2>

      {/* 🎯 適用對象 */}
      <section className="space-y-3">
        <h3 className="text-xl font-semibold text-white">適用對象：</h3>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground text-sm leading-relaxed">
          <li>對 GeoGuessr 正規遊戲模式有興趣，但尚未深入遊玩的實況主</li>
          <li>還未付費訂閱遊戲，想嘗試正規地圖與正規玩法的主播</li>
          <li>已付費訂閱遊戲，希望再進一步與觀眾或其他實況主遊戲內互動的主播</li>
        </ul>
      </section>

      {/* 📦 企劃簡介 */}
      <h3 className="text-xl font-semibold text-white mb-3">定位：</h3>
      <section className="rounded-xl border border-zinc-700/60 bg-zinc-800/40 p-4 md:p-5">
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            這是一份專為剛接觸 GeoGuessr 正規遊戲模式的實況主設計的互動型節目企劃，<br />
            無論你是剛訂閱成為付費玩家的新手，或是正在觀望遊戲玩法的創作者，<br />
            這個企劃能幫助你快速進入 GeoGuessr 的主線遊戲節奏，並與觀眾互動。
          </p>
          <p>
            本企劃將搭配本站整理的玩家自製地圖與教學資源，<br />
            引導你避開初學者常見的直播地雷（卡關太久、出題太無聊、節奏太慢）。
          </p>
          <p>
            我會推薦適合用於直播與練習的社群地圖、多人互動功能與正確開圖方式，<br />
            幫助你進行節奏穩定又具娛樂性的 GeoGuessr 主題直播。
          </p>
        </div>
      </section>

      {/* 🧠 節目建議與執行方式 */}
      <section className="space-y-5">
        <h3 className="text-xl font-semibold text-white">企劃提案與執行方式：</h3>

        {/* 未付費玩家段落 */}
        <div className="rounded-lg border border-zinc-700/60 p-4 md:p-5">
          <h4 className="text-base md:text-lg text-white font-semibold mb-2">未付費玩家</h4>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              若你是剛認識 GeoGuessr 的實況主，還沒決定是否要訂閱，或不熟悉正規遊戲的模式，<br />
              建議可以從本站每日題目中的台灣地圖或「世界地圖 - The World」開始嘗試。
            </p>
            <p>
              如果你要嘗試世界地圖，推薦優先遊玩「世界地圖 - The World」，<br />
              這是一張特別為新手設計的社群地圖，<br />
              只包含人口密集的大城市，城市中可以觀察的線索較多，難度親民，<br />
              而我網站提供的題目不需要註冊帳號也能直接遊玩，適合體驗期拿來練習與熟悉節奏。
            </p>
            <p>
              📌 目前未付費玩家無法自由選擇地圖，也無法重複挑戰題目。<br />
              所以若你尚未訂閱 GeoGuessr，可以先使用本站每日題目連結來試玩與試播。
            </p>
            <p>
              📌 延伸閱讀：你也可以參考本站的《推薦設定》與《入門教學》兩篇文章，<br />
              了解怎麼調整設定、可以使用的基本技巧、穩定玩完一場遊戲。
            </p>
          </div>
        </div>

        {/* 付費玩家段落 */}
        <div className="rounded-lg border border-zinc-700/60 p-4 md:p-5">
          <h4 className="text-base md:text-lg text-white font-semibold mb-2">付費玩家</h4>
          <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
            <p>
              若你已經訂閱成為 GeoGuessr 的付費玩家，除了上一個段落的內容你依然可以做為參考之外，<br />
              也能使用 GeoGuessr 的完整功能，包含完全自由的地圖選擇、無限開局與多人遊戲等進階模式。
            </p>

            <p>
              其中「Party」就是 GeoGuessr 的多人模式，裡面有所有的多人模式功能。<br />
              你可以參考前面所有的提案來舉辦觀眾場或與主播之間進行聯動企劃。<br />
              📌 注意：所有的多人遊戲功能皆限付費玩家使用。
            </p>

            <p>
              如果你要自選地圖，請繼續參考接下來的說明。
            </p>
          </div>
        </div>
      </section>

      {/* 社群地圖補充 */}
      <h3 className="text-xl font-semibold text-red-500 mb-3">不要使用官方地圖：</h3>
      <section className="rounded-xl border border-zinc-700/60 bg-zinc-800/40 p-4 md:p-5">
        <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
          <p>
            不論是單人還是多人模式，我都強烈建議你
            <strong className="text-red-500">避免使用 GeoGuessr 官方提供的地圖</strong>。<br />
            這是新手最容易踩坑的點，官方地圖無論是平衡或難度都極度勸退：
          </p>
          <ul className="list-decimal pl-5 space-y-1">
            <li>官方世界地圖難度較高，可能出現難以辨識的荒郊地帶，對初學者直播體驗不佳</li>
            <li>出題機率不均，容易整天玩下來都在美國、加拿大或俄羅斯，內容過於重複</li>
            <li>「The World」這張社群地圖專為新手設計，僅出現人口密集都市區，且各國比例平衡，更適合直播節奏與觀眾互動</li>
          </ul>
          <p>
            「社群地圖」是由全球玩家社群根據實際遊戲經驗製作出的地圖，<br />
            有明確難度、平衡性與主題特色，是 GeoGuessr 真正推薦的核心玩法。
          </p>
        </div>
      </section>

      {/* 地圖推薦導語（保持原文字，僅包裝排版） */}
      <h3 className="text-xl font-semibold text-white mb-3">推薦的社群地圖：</h3>
      <section className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-4 md:p-5">
        <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
          <p>
            如果你是剛成為付費玩家的新手，正在規劃一場輕鬆又具互動性的 GeoGuessr 實況節目，<br />
            建議你優先從以下這些玩家自製的社群地圖開始。
          </p>
          <p>
            這些社群地圖都是玩家社群們多年來淬鍊出的遊戲地圖，有更好的平衡性與適合的難易度，遊戲體驗遠遠優於官方地圖。
          </p>
          <p>
            對於還不熟悉 GeoGuessr 正規玩法的創作者來說，<br />
            只要選對地圖，即使是第一次直播這款遊戲，也能呈現穩定、好懂、觀眾容易參與的內容效果。
          </p>
        </div>
      </section>

      {/* 🗺 地圖推薦清單（保留原始設計） */}
      <section>
        <div className="flex flex-wrap gap-4 mt-2">
          <MapLinkCard
            label="The World"
            url="https://www.geoguessr.com/maps/66014417ff2366aa9a7504df"
            description="新手專用的世界地圖，難度親民，平衡性遠遠優於官方世界地圖。"
          />
          <MapLinkCard
            label="繁榮的台灣"
            url="https://www.geoguessr.com/maps/628ba06e86224535a5956cae"
            description="收錄台灣比較大一點的鄉鎮市區，適合剛接觸遊戲的新手熟悉遊戲模式。"
          />
          <MapLinkCard
            label="室內的台灣"
            url="https://www.geoguessr.com/maps/688b7cbe957ea7281be46179"
            description="由台灣玩家 Giraffe 收錄的台灣室內街景，大約有一百多個地點，是很好玩且適合直播的社群地圖。"
          />
          <MapLinkCard
            label="平衡的台灣"
            url="https://www.geoguessr.com/maps/634ed0789d28f1547612b2cd"
            description="比官方的台灣地圖還要更平衡分佈位置的題庫，但難度也稍高，台灣人玩起來也會略感吃力的圖。"
          />
          <MapLinkCard
            label="日本の都会"
            url="https://www.geoguessr.com/maps/679df3ca311b366ecb41e41b"
            description="如果你想玩日本地圖，這張圖專門出一些有頭有臉的日本大城市，避開太過偏僻的鄉鎮與市郊。"
          />
          <MapLinkCard
            label="Hong Kong (Full) 香港全圖"
            url="https://www.geoguessr.com/maps/62ada63d0e12bba96e27fe40"
            description="這張圖比官方的香港地圖平衡性更好、覆蓋更全面，如果想玩香港地圖更推薦這張社群地圖。"
          />
        </div>
      </section>

      {/* 🖥️ GeoGuessr 實際操作教學（保留原設計） */}
      <section className="space-y-6">
        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <h3 className="text-xl font-semibold text-white">介面說明：</h3>
          <p>
            官方地圖就是你點左上角「Single Player &gt; Classic Map」可以看到的地圖，這些地圖不適合新手，更不適合直播。<br />
            玩家社群所做出來的地圖才是這遊戲真正的核心，連正式比賽都是使用社群地圖，強力推薦優先使用社群地圖。
          </p>
          <Zoom>
            <img
              src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/show-proposals/classic_map.jpg?v=20250808"
              alt="官方地圖介面"
              className="w-full mr-auto md:max-w-lg rounded border border-border shadow"
            />
          </Zoom>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            推薦你將我前一節提到的社群地圖加入收藏（點擊地圖頁左上角的「愛心」），<br />
            即可在對戰模式中選擇「Liked maps」快速選擇。
          </p>
          <Zoom>
            <img
              src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/show-proposals/like_a_community_map.jpg?v=20250808"
              alt="點選社群地圖的愛心"
              className="w-full mr-auto md:max-w-lg rounded border border-border shadow"
            />
          </Zoom>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            如果你想進行多人遊戲模式，進入 Party 頁面（從網頁上的 Party → PARTY），<br />
            點擊 MAP 更換地圖，切換到 Liked maps 分頁，選擇你已經點過愛心的地圖：
          </p>
          <Zoom>
            <img
              src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/show-proposals/change_map.jpg?v=20250808"
              alt="Party 頁面點擊更換地圖"
              className="w-full mr-auto md:max-w-lg rounded border border-border shadow"
            />
          </Zoom>
          <Zoom>
            <img
              src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/show-proposals/choose_map.jpg?v=20250808"
              alt="從 Liked maps 分頁選擇地圖"
              className="w-full mr-auto md:max-w-lg rounded border border-border shadow"
            />
          </Zoom>
        </div>

        <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
          <p>
            就可以在多人模式下使用社群地圖，你也可以直接在切換地圖的頁面中搜尋其他的社群地圖。
          </p>
          <Zoom>
            <img
              src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/show-proposals/switch_custom_map.jpg?v=20250813"
              alt="Party 頁面更換社群地圖"
              className="w-full mr-auto md:max-w-lg rounded border border-border shadow"
            />
          </Zoom>
        </div>
      </section>

      {/* 警示卡片 */}
      <div className="pt-2">
        <WarningCard />
      </div>
    </div>
  );
}
