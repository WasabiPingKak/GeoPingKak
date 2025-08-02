// components/tutorial/coverage/NorthAmericaCoverageBlock.tsx

import React from "react";
import CoverageRegionCard from "./CoverageRegionCard";

export default function NorthAmericaCoverageBlock() {
  return (
    <CoverageRegionCard
      title="北美洲大陸"
      imgSrc="/tutorial/coverage/CoverageNA.jpg"
      sections={[
        {
          type: "full",
          title: "有街景：",
          items: ["加拿大", "美國", "墨西哥", "瓜地馬拉", "巴拿馬"],
        },
        {
          type: "limited",
          title: "有限街景：",
          items: ["哥斯大黎加：首都聖荷西的一個公園有街景，其他地方都沒有"],
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
