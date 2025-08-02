// components/tutorial/coverage/EuropeCoverageBlock.tsx

import React from "react";
import CoverageRegionCard from "./CoverageRegionCard";

export default function EuropeCoverageBlock() {
  return (
    <CoverageRegionCard
      title="歐洲"
      imgSrc="/tutorial/coverage/CoverageEurope.jpg"
      sections={[
        {
          type: "none",
          title: "沒有街景：",
          items: ["摩爾多瓦", "科索沃", "波士尼亞與赫塞哥維納", "北賽普勒斯"],
        },
        {
          type: "limited",
          title: "有限街景：",
          items: [
            "賽普勒斯南邊的英國飛地",
            "白俄羅斯只有首都明斯克(Minsk)的河邊的一個小觀光區域有街景。",
          ],
        },
      ]}
    />
  );
}
