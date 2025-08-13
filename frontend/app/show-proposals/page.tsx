"use client";

import React, { useState } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import CommonTabs from "@/components/shared/CommonTabs";
import WarningCard from "@/components/shared/WarningCard";
import MapLinkCard from "@/components/shared/MapLinkCard";

const TABS = [
  "純娛樂企劃包",
  "休閒企劃包",
  // "育成合作",
  "向我提案"
];

export default function ShowProposalsPage() {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">遊戲直播企劃書與節目提案建議</h1>
      <div className="text-base mb-4">
        我準備了幾個不同受眾與方向的遊戲直播企劃提案，各位直播主或創作者可以直接參考我的網站或企劃書來做為你的直播計劃。
      </div>

      <CommonTabs
        options={TABS}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />

      <div className="mt-8 text-sm text-muted-foreground space-y-4 leading-relaxed">
        {selectedTab === "純娛樂企劃包" && (

          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">

            <h2 className="text-lg font-semibold text-white">純娛樂企劃包</h2>
            <h3 className="font-semibold text-base text-white mb-1">適用對象：</h3>
            <p>
              尚未決定要訂閱遊戲，想先將 GeoGuessr 做為單次遊戲企劃試水溫的主播或創作者。
            </p>
            <h3 className="font-semibold text-base text-white mb-1">定位：</h3>

            <p>
              這是一份專為台灣的觀眾與創作者設計的 GeoGuessr 入門企劃，<br />
              你無需了解這款遊戲的經典規則，也不需要訂閱帳號或準備任何素材，<br />
              只要打開我整理好的兩張特殊主題地圖：「台灣奇怪地名」與「台灣諧音招牌」，<br />
              就能立即進入節目狀態！
            </p>
            <p>
              這些題目完全以台灣為出發點，讓觀眾一看就有共鳴，<br />
              非常適合做為試水溫的遊戲單元、聊天互動的橋段，<br />
              或是以 GeoGuessr 為主軸的輕量企劃初體驗。
            </p>
            <p>
              特殊主題地圖皆來自本站的免費資源，不需註冊帳號即可直接開玩。<br />
              每個連結都包含固定的五個題目，能確保每次節目體驗穩定且可控。
            </p>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h2 className="text-lg font-semibold text-white">推薦使用方式</h2>
              <p>
                由於 GeoGuessr 的「挑戰模式」限制，每組連結只能由一位玩家操作，無法同時多人參與或進行連線對戰。<br />
                因此這份企劃特別適合以「主播個人操作 + 與觀眾互動」的形式進行，節奏上更接近雜談型的直播。
              </p>
              <p>
                每組主題連結包含五題，難度偏簡單，認真找的話約 1～3 分鐘就能解出一題。<br />
                換句話說，最快大約 15 分鐘內可以完成一整組挑戰，<br />
                若搭配觀眾互動或中間閒聊，查詢典故之類的延伸，大約可以延伸至 30 分鐘一組，<br />
                而題目本身沒有作答時間限制，因此彈性非常高。
              </p>
              <p>
                你可以依照直播氣氛自由調整節奏：<br />
                非常適合初次嘗試 GeoGuessr 類型內容的創作者使用，同時熟悉遊戲模式。<br />
                你可以將本站當作「殘酷二選一」類型的企劃使用，自行安排直播方式與時間。
              </p>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h2 className="text-lg font-semibold text-white">使用方式</h2>
              <ol className="list-decimal list-inside space-y-1">
                <li>點選左側選單「特殊主題地圖」</li>
                <li>選擇想要遊玩的主題（例如「台灣奇怪地名」、「台灣諧音招牌」）</li>
                <li>點擊連結即可開始遊戲（每組固定 5 題）</li>
                <li>不需登入即可遊玩，未登入的玩家需要輸入 Nickname，已登入玩家則可以直接開始</li>
              </ol>
              <p>
                📌 備註：題目一旦玩過就無法重玩，若要重試請使用無痕模式並<strong>不要登入</strong>。
              </p>
              <p>
                🔹 GeoGuessr 在未登入時仍會要求輸入一個 Nickname，但這項功能目前已經沒有作用，<br />
                系統不會儲存或顯示這個名稱，你可以隨便輸入任何字詞，完全不影響遊玩體驗。
              </p>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h2 className="text-lg font-semibold text-white">宣傳（非強制）</h2>
              <p>
                由於挑戰連結的題目是固定的，觀眾在直播中看完後可能不會重複遊玩；<br />
                不過網站中還有其他適合不同玩家的每日挑戰、主題地圖與教學內容，<br />
                仍有許多值得探索的免費資源，有機會吸引有興趣的觀眾深入體驗這個遊戲。
              </p>
              <p>
                若你使用這份企劃或 GeoPingKak 網站的挑戰連結作為直播素材，非常歡迎你在節目中提及或在資訊欄放上網站網址，<br />
                這會對我推廣 GeoGuessr 這個遊戲有很大幫助，但並非強制要求。<br />
                如果你願意提及企劃與引用來源為本站，無論是口頭提及或文字連結，我都會非常感謝。
              </p>
            </div>

            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <h2 className="text-lg font-semibold text-white">限制與注意事項</h2>
              <p>為了避免直播時遇到預期外的狀況，請務必了解以下限制與機制：</p>

              <div>
                <h3 className="font-semibold text-base text-white mb-1">🔸 題目與玩法限制</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>所有免費挑戰連結皆使用 GeoGuessr 的「挑戰模式」功能</li>
                  <li>每個連結包含 5 題題目，且內容是固定不變的</li>
                  <li>不支援多人連線、對戰、競分或同步比賽</li>
                  <li>這些限制來自 GeoGuessr 官方設計，並非本站額外設下的規則</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base text-white mb-1">🔸 遊玩紀錄相關</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>未登入情況下遊玩，系統<strong>不會記錄分數與暱稱</strong></li>
                  <li>登入帳號後遊玩，系統會<strong>記錄成績且每個連結只能玩一次</strong></li>
                  <li>如果想重玩同一組題目，請使用瀏覽器的「無痕模式」並<strong>不要登入</strong></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-base text-white mb-1">🔸 題目耗盡與重玩注意</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>每組挑戰連結題目只能體驗一次，玩完就無法再挑戰</li>
                  <li>未登入情況下雖可重複打開連結，但題目仍然是相同的</li>
                  <li>建議僅用特殊主題地圖作為正式節目內容，測試功能時請使用「每日題目」的挑戰連結，以免意外消耗有限資源</li>
                </ul>
              </div>

              <p>
                這些都是出於 GeoGuessr 遊戲本身的限制，<br />
                我已盡可能設計出適合「單人遊玩 + 觀眾互動」的直播模式，<br />
                若你的節目需求包含多人互動、同步作答等進階玩法，請參考《休閒企劃包》的進階提案內容。
              </p>

              <p>
                最後，使用本站所提供的資源作為你的直播或節目內容，<br />
                <strong className="text-orange-300">
                  不需要事前通知或取得管理者山葵冰角的同意
                </strong>
                。
              </p>
            </div>

            <WarningCard />
          </div>
        )}

        {selectedTab === "休閒企劃包" && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white mb-2">休閒企劃包</h2>

            <div>
              <h3 className="font-semibold text-base text-white mb-1">適用對象：</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
                <li>對 GeoGuessr 正規遊戲模式有興趣，但尚未深入遊玩的實況主</li>
                <li>已付費訂閱遊戲，希望與觀眾或其他實況主互動的新手主播</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-base text-white mb-1">企劃提案與執行方式：</h3>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <div>
                  如果你是剛接觸這款遊戲的新手主播，打算遊玩正規的遊戲模式，強力推薦使用我在本頁介紹的玩家自製社群地圖進行直播。<br />
                  你也可以稍微掃一下本站的《推薦設定》與《入門教學》兩篇文章，有一個概念跟方向可以準備。<br />
                  這會幫助你更快的理解如何有效的進行遊戲，不會在直播上一題卡超久導致節奏爆炸，玩得很悶又沒有遊戲體驗。
                </div>

                <div>
                  若你尚未付費訂閱遊戲，可以直接使用本站每日題目中的提供的「世界地圖 - The World」，這是最適合新手的入門圖。<br />
                  這些連結皆為固定題組，不需註冊即可遊玩，非常適合用來認識 GeoGuessr 的遊戲節奏與觀察方式。
                </div>

                <div>
                  若你已經是付費訂閱玩家，則會擁有完整的遊戲功能，可以使用「Party」模式進行多人遊戲。<br />
                  後面的介面說明會告訴你如何在多人模式中使用社群地圖。
                </div>

                <h3 className="font-semibold text-base text-white mb-1">不要遊玩官方地圖：</h3>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <div>
                    <div>
                      請盡量
                      <strong className="text-red-500">
                        避免遊玩官方提供的世界地圖
                      </strong>
                      ，以下是原因：
                    </div>
                  </div>
                </div>
                <ul className="list-decimal list-inside space-y-1 pl-4">
                  <li>官方世界地圖難度較高，可能出現難以辨識的荒郊地帶，對初學者直播體驗不佳</li>
                  <li>出題機率不均，容易整場都在美國、加拿大或俄羅斯，內容過於重複</li>
                  <li>「The World」這張社群地圖專為新手設計，僅出現人口密集都市區，且各國比例平衡，更適合直播節奏與觀眾互動</li>
                </ul>

                <div>
                  若你是付費的新手玩家，正在規劃一場輕鬆又能互動的 GeoGuessr 實況，推薦優先嘗試以下這些玩家自製的社群地圖。<br />
                  這些社群地圖都是玩家社群們淬鍊出來的遊戲地圖，有更好的平衡性與適合的難易度，遊戲體驗遠遠優於官方地圖。<br />
                  因此如果你是對 GeoGuessr 還不熟悉並且想進一步嘗試經典遊戲模式的主播，我更推薦在直播中使用這些地圖：
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mt-4">
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

              <h3 className="font-semibold text-base text-white mt-4 mb-1">介面說明：</h3>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                官方地圖就是你點左上角「Single Player &gt; Classic Map」可以看到的地圖，這些地圖不適合新手，更不適合直播。<br />
                玩家社群所做出來的地圖才是這遊戲真正的核心，強力推薦優先使用社群地圖。
                <Zoom>
                  <img
                    src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/show-proposals/classic_map.jpg?v=20250808"
                    alt="官方地圖介面"
                    className="w-full max-w-md rounded border border-border shadow"
                  />
                </Zoom>
              </div>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
                推薦你將我前一節提到的社群地圖加入收藏（點擊地圖頁左上角的「愛心」），即可在對戰模式中選擇「Liked maps」快速選擇。
                <Zoom>
                  <img
                    src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/show-proposals/like_a_community_map.jpg?v=20250808"
                    alt="點選社群地圖的愛心"
                    className="w-full max-w-md rounded border border-border shadow"
                  />
                </Zoom>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
                如果你想進行多人遊戲模式，進入 Party 頁面（從網頁上的 Party → PARTY），點擊 MAP 更換地圖，切換到 Liked maps 分頁，選擇你已經點過愛心的地圖：
                <Zoom>
                  <img
                    src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/show-proposals/change_map.jpg?v=20250808"
                    alt="Party 頁面點擊更換地圖"
                    className="w-full max-w-md rounded border border-border shadow"
                  />
                </Zoom>
                <Zoom>
                  <img
                    src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/show-proposals/choose_map.jpg?v=20250808"
                    alt="從 Liked maps 分頁選擇地圖"
                    className="w-full max-w-md rounded border border-border shadow"
                  />
                </Zoom>
              </div>

              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed mt-4">
                就可以在多人模式下使用社群地圖，你也可以直接在切換地圖的頁面中搜尋其他的社群地圖。
                <Zoom>
                  <img
                    src="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/show-proposals/switch_custom_map.jpg?v=20250813"
                    alt="Party 頁面更換社群地圖"
                    className="w-full max-w-md rounded border border-border shadow"
                  />
                </Zoom>
              </div>
              <div className="mt-4">
                <WarningCard />
              </div>
            </div>
          </div>
        )}

        {selectedTab === "育成合作" && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">育成合作</h2>
            <h3 className="font-semibold text-base text-white mb-1">適用對象：</h3>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm mb-4">
              <li>
                對 GeoGuessr 正規遊戲模式有興趣，未來打算投入時間鑽研
                <ul className="list-disc list-inside pl-5 mt-1 text-xs text-muted-foreground mb-2">
                  <li>
                    如果你是希望簡單體驗一下這款遊戲、或只打算嘗試一次性的節目企劃，建議參考前面兩個休閒型企劃提案會更適合。
                  </li>
                </ul>
              </li>
              <li>沒有限制實力，只要你有明確意願投入時間鑽研這個遊戲</li>
              <li>僅限直播主、Vtuber 或自媒體經營者</li>
            </ul>
            <div className="mb-4 rounded-md border border-yellow-500 bg-yellow-900/20 px-4 py-3 text-sm text-yellow-100 leading-relaxed">
              如果你只是單純想邀請我做單次的遊戲聯動企劃，請見《向我提案》的段落。
            </div>
            <h3 className="font-semibold text-base text-white mb-1">企劃提案與執行方式：</h3>
            <div className="text-sm text-muted-foreground leading-relaxed">
              如果你對 GeoGuessr 的正式遊戲模式有興趣，並打算長期投入這款遊戲，也許我能協助你更順利地上手直到可以獨當一面。<br />
              歡迎來信與我聯絡，我會依照你的狀況與需求，不管你是在哪一個實力區段，我都會直接協助你設計關於遊戲的直播企劃。<br />
              <br />
              我希望這個合作能真正幫助到想認真投入這個遊戲的創作者，藉此擴散 GeoGuessr 的中文玩家社群。<br />
              因此若你目前只是想試試看是否適合，或尚未考慮清楚是否長期投入，也許可以先參考我前面的兩項休閒型提案。<br />
            </div>
          </div>
        )}

        {selectedTab === "向我提案" && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-2">向我提案</h2>
            <h3 className="font-semibold text-base text-white mb-1">說明：</h3>

            <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
              <div>
                如果你有自製地圖想要推廣，或特別想挑戰某個國家、地區或主題，<br />
                希望我能幫忙製作免費的挑戰連結，歡迎透過任何方式與我聯繫或討論。
              </div>
              <div>
                如果你正在規劃大型活動，或單純只是希望與我有任何形式的單次合作或連動節目，<br />
                請準備對應的企劃書，我很樂意一起討論可行的合作方式。
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
