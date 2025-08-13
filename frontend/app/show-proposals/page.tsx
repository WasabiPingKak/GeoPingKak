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
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white mb-2">純娛樂企劃包</h2>

            <div>
              <h3 className="font-semibold text-base text-white mb-1">適用對象：</h3>
              <p>
                尚未決定要訂閱遊戲，想先將 GeoGuessr 做為單次遊戲企劃試水溫的主播或創作者。
              </p>

            </div>

            <div>
              <h3 className="font-semibold text-base text-white mb-1">企劃提案與執行方式：</h3>
              <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
                <div>
                  你可以直接使用本站的「特殊主題地圖」與「每日題目」作為節目素材。<br />
                  每一個連結都會提供固定的五個題目，完全不需要註冊帳號即可遊玩。<br />
                  也就是你可以用幾乎免費的成最大化體驗這個遊戲，同時做為你的直播企劃。
                </div>

                <div>
                  在使用連結遊玩時，若未登入帳號，將不會留下成績紀錄；<br />
                  而登入的情況下，系統會記錄你的遊玩紀錄，且同一個連結無法重複挑戰。<br />
                  如果你真的希望再次遊玩相同內容，可以使用「無痕模式」並在未登入的狀態下重新開啟連結。<br /><br />

                  此外，未登入時輸入的 Nickname 並不會被記錄，<br />
                  那只是官方過去可能使用過的舊功能，目前不再儲存任何資料。<br />
                  所以你可以隨意輸入，完全不影響遊玩體驗。
                </div>

                <div className="text-red-500 font-bold mt-4">
                  提醒：每個挑戰連結的五個題目都是固定的，玩掉就沒了。當然未登入可以重複遊玩，但題目會是相同的。<br />
                  若你只是要測試功能，請優先使用每日挑戰連結，避免消耗特殊主題地圖的體驗。
                </div>

                <div>
                  「特殊主題地圖」與「每日題目」的題目皆包含無需事前準備即可開玩的輕鬆題庫，目前網站提供的題庫數量應該足以撐起兩個小時以上的直播。<br />
                  除了特殊主題地圖為固定題庫，「每日題目」會定時更新，所以你過一段時間回來依然有全新的題目能做為遊戲企劃使用。<br />
                  若使用本站所提供的資源作為你的直播或節目內容，
                  <strong className="text-orange-300">
                    不需要事前通知或取得管理者山葵冰角的同意
                  </strong>
                  。
                </div>

                <div>
                  你可以將本站當作「殘酷二選一」類型的企劃使用，自行安排直播方式與時間。<br />
                  <span className="text-blue-500 font-medium">
                    <strong>但如果你願意提及企劃與引用來源為本站，我會非常感激。</strong>
                  </span>
                </div>

                <div>
                  如果你想提前準備或確認遊戲方式，直接進入「每日題目」挑選任何一個連結試玩即可。
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-base text-white mb-1">限制：</h3>
              <p>
                本站提供的免費題目連結皆使用 GeoGuessr 遊戲內建的「挑戰模式」功能。<br />
                每個連結的題目都是固定的，<strong>且不支援多人遊玩、對戰或互動比賽</strong >。<br />
                換句話說，這些挑戰連結只能由一位玩家進行，同一個連結的題目是相同的，這是來自官方遊戲機制的限制，並非我設下的限制。<br />
                <br />
                如果你的節目想要與觀眾或其他主播在遊戲內進行互動，則必須付費訂閱遊戲，關於付費玩家可以進行的活動或企劃，可以參考下一節《休閒企劃包》的提案來進行直播。
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
