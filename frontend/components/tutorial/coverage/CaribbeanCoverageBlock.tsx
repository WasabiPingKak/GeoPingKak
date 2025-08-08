// components/tutorial/coverage/CaribbeanCoverageBlock.tsx

import React from "react";
import CoverageRegionCard from "./CoverageRegionCard";

export default function CaribbeanCoverageBlock() {
  return (
    <CoverageRegionCard
      title="加勒比海島國"
      imgSrc="https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/tutorial/coverage/CoverageCaribbean.jpg?v=20250808"
      sections={[
        {
          type: "full",
          title: "有街景：",
          items: ["多明尼加", "波多黎各", "美屬維京群島", "庫拉索"],
        },
      ]}
      notes={
        <p className="text-muted-foreground text-sm leading-relaxed">
          剩下沒提的都沒有
        </p>
      }
    />
  );
}
