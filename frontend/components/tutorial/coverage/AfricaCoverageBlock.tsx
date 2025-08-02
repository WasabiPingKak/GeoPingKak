// components/tutorial/coverage/AfricaCoverageBlock.tsx

import React from "react";
import CoverageRegionCard from "./CoverageRegionCard";

export default function AfricaCoverageBlock() {
  return (
    <CoverageRegionCard
      title="非洲"
      imgSrc="/tutorial/coverage/CoverageAfrica.jpg"
      sections={[
        {
          type: "full",
          title: "北非：",
          items: ["突尼西亞"],
        },
        {
          type: "full",
          title: "東非：",
          items: ["肯亞", "烏干達", "盧安達", "馬達加斯加", "留尼旺"],
        },
        {
          type: "full",
          title: "西非：",
          items: ["塞內加爾", "迦納", "奈及利亞"],
        },
        {
          type: "full",
          title: "南部非洲：",
          items: ["南非", "史瓦帝尼", "賴索托", "波札納", "納米比亞"],
        },
        {
          type: "limited",
          title: "有限街景：",
          items: [
            "埃及：只有亞歷山大港、開羅的金字塔附近有街景",
            "馬利：我也不知道街景在哪，從沒遇過",
            "坦桑尼亞：我也不知道街景在哪，從沒遇過",
          ],
        },
      ]}
      notes={
        <p className="text-muted-foreground text-sm leading-relaxed">
          非洲只有東西南北四個區域的國家有完整街景覆蓋，剩下的都沒有。
        </p>
      }
    />
  );
}
