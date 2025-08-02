// components/tutorial/coverage/SouthAmericaCoverageBlock.tsx

import React from "react";
import CoverageRegionCard from "./CoverageRegionCard";

export default function SouthAmericaCoverageBlock() {
  return (
    <CoverageRegionCard
      title="南美洲大陸"
      imgSrc="/tutorial/coverage/CoverageSA.jpg"
      sections={[
        {
          type: "none",
          title: "沒有街景：",
          items: ["委內瑞拉", "蓋亞納", "法屬圭亞那", "蘇利南", "巴拉圭"],
        },
      ]}
      notes={
        <p className="text-muted-foreground text-sm leading-relaxed">
          剩下沒提的都有
        </p>
      }
    />
  );
}
