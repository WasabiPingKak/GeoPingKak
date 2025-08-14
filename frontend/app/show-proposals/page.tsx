"use client";

import React, { useState } from "react";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import CommonTabs from "@/components/shared/CommonTabs";
import WarningCard from "@/components/shared/WarningCard";
import MapLinkCard from "@/components/shared/MapLinkCard";
import RecreationalProposalTab from "@/components/proposals/RecreationalProposalTab";
import EntertainmentProposalTab from "@/components/proposals/EntertainmentProposalTab";

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
        {selectedTab === "純娛樂企劃包" && <EntertainmentProposalTab />}

        {selectedTab === "休閒企劃包" && <RecreationalProposalTab />}

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
          <div className="space-y-4">
            {/* 主標題 */}
            <h2 className="text-2xl font-bold text-white tracking-tight">向我提案</h2>

            {/* 小節：說明 */}
            <section className="space-y-3">
              <h3 className="text-xl font-semibold text-white">遊戲相關協助：</h3>
              <div className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-4 md:p-5">
                <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
                  <div>
                    如果你有自製地圖想要推廣，或特別想挑戰某個國家、地區或主題，<br />
                    希望我能幫忙製作免費的挑戰連結，或想看我做特定的內容，<br />
                    都歡迎透過任何方式與我聯繫或討論。
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-white">聯動或其他直播企劃：</h3>
              <div className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-4 md:p-5">
                <div className="text-sm text-muted-foreground leading-relaxed space-y-4">
                  <div>
                    如果你正在規劃大型活動，或單純只是希望與我有任何形式的單次合作或連動節目，<br />
                    請準備對應的企劃書，我很樂意一起討論可行的合作方式。
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
}
