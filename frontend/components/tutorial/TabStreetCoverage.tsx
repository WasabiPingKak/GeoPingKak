// components/tutorial/TabStreetCoverage.tsx

import React from "react";

export default function TabStreetCoverage() {
  return (
    <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">街景覆蓋國家</h2>
      <p>
        Geoguessr 的遊戲資料來自 Google Street View，因此街景的涵蓋國家對判斷地點非常重要。
        了解哪些地區有街景、哪些地區完全沒有收錄，可以在一開始就快速排除不可能的國家。
      </p>
      <p>
        一些國家街景較完整，像是美國、日本、法國等；而有些國家只有局部城市或道路，甚至完全沒有街景（如中國、北韓）。
      </p>
      <p>
        熟悉街景地圖分布可以大幅提升猜測效率，建議參考社群整理的
        <a
          href="https://www.google.com/streetview/understand/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary underline ml-1"
        >
          街景官方涵蓋地圖
        </a>
        或 GeoGuessr 社群製作的判斷指南。
      </p>
    </div>
  );
}
