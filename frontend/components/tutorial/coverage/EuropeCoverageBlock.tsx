// components/tutorial/coverage/EuropeCoverageBlock.tsx

import React from "react";
import CoverageRegionCard from "./CoverageRegionCard";

export default function EuropeCoverageBlock() {
  return (
    <CoverageRegionCard
      title="歐洲"
      imgSrc="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/tutorial/coverage/CoverageEurope.jpg?v=20250808"
      sections={[
        {
          type: "full",
          title: "2025/11 新增街景：",
          items: ["賽普勒斯 (僅限島嶼南部的賽普勒斯共和國)", "波士尼亞與赫塞哥維納"],
        },
        {
          type: "none",
          title: "沒有街景：",
          items: ["摩爾多瓦", "科索沃", "北賽普勒斯"],
        },
        {
          type: "limited",
          title: "有限街景：",
          items: [
            "白俄羅斯只有首都明斯克(Minsk)的河邊的一個小觀光區域有街景。",
          ],
        },
      ]}
    />
  );
}
