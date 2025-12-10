// components/tutorial/coverage/NorthAmericaCoverageBlock.tsx

import React from "react";
import CoverageRegionCard from "./CoverageRegionCard";

export default function NorthAmericaCoverageBlock() {
  return (
    <CoverageRegionCard
      title="北美洲大陸"
      imgSrc="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/tutorial/coverage/CoverageNA.jpg?v=20250808"
      sections={[
        {
          type: "full",
          title: "2025/08 新增街景：",
          items: ["哥斯大黎加"],
        },
        {
          type: "full",
          title: "有街景：",
          items: ["加拿大", "美國", "墨西哥", "瓜地馬拉", "巴拿馬"],
        },
        {
          type: "none",
          title: "沒有街景：",
          items: ["貝里斯", "薩爾瓦多", "宏都拉斯", "尼加拉瓜"],
        },
      ]}
    />
  );
}
