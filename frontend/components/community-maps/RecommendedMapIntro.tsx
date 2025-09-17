// src/components/community-maps/RecommendedMapIntro.tsx
import React from "react";

export default function RecommendedMapIntro() {
  return (
    <>
      {/* 地圖推薦導語（保持原文字，僅包裝排版） */}
      <h3 className="text-xl font-semibold text-white mb-3">推薦的社群地圖：</h3>
      <section className="rounded-xl border border-zinc-700/60 bg-zinc-800/30 p-4 md:p-5 mb-6">
        <div className="space-y-2 text-sm leading-relaxed text-muted-foreground">
          <p className="text-orange-300 font-medium">
            如果你已經是 GeoGuessr 的付費玩家，這裡推薦的地圖有更多玩法的可能性。<br />
            相較於我們網站所能提供的每日挑戰與少數免費連結，這些社群地圖涵蓋更多風格與難度，適合在直播或進階遊玩時使用。
          </p>
          <p>
            這些地圖都是玩家社群們多年來淬鍊出的遊戲地圖，有更好的平衡性與適合的難易度，遊戲體驗遠遠優於官方地圖。
          </p>
          <p>
            對於還不熟悉 GeoGuessr 正規玩法的創作者來說，<br />
            只要選對地圖，即使是第一次直播這款遊戲，也能呈現穩定、好懂、不冷場、觀眾容易參與的內容效果。
          </p>
        </div>
      </section>
    </>
  );
}
