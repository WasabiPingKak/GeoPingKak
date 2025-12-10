// components/tutorial/coverage/SouthAmericaCoverageBlock.tsx

import React from "react";
import CoverageRegionCard from "./CoverageRegionCard";

export default function SouthAmericaCoverageBlock() {
  return (
    <CoverageRegionCard
      title="南美洲大陸"
      imgSrc="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/tutorial/coverage/CoverageSA.jpg?v=20250808"
      sections={[
        {
          type: "full",
          title: "2025/11 新增街景：",
          items: ["巴拉圭"],
        },
        {
          type: "none",
          title: "沒有街景：",
          items: ["委內瑞拉", "蓋亞納", "法屬圭亞那", "蘇利南"],
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
