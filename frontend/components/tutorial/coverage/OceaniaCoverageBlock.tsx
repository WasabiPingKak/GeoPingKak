// components/tutorial/coverage/OceaniaCoverageBlock.tsx

import React from "react";
import CoverageRegionCard from "./CoverageRegionCard";

export default function OceaniaCoverageBlock() {
  return (
    <CoverageRegionCard
      title="大洋洲"
      imgSrc="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/tutorial/coverage/CoverageOceania.jpg?v=20250808"
      sections={[
        {
          type: "full",
          title: "有街景：",
          items: ["澳大利亞", "紐西蘭", "北馬利安那群島", "關島"],
        },
        {
          type: "limited",
          title: "有限街景：",
          items: ["萬那杜：僅在少數自然景觀處有街景，實際上幾乎不會遇到。"],
        },
      ]}
    />
  );
}
