// components/tutorial/coverage/AsiaCoverageBlock.tsx

import React from "react";
import CoverageRegionCard from "./CoverageRegionCard";

export default function AsiaCoverageBlock() {
  return (
    <CoverageRegionCard
      title="亞洲"
      imgSrc="/tutorial/coverage/CoverageAsia.jpg"
      sections={[
        {
          type: "none",
          title: "沒有街景：",
          items: [
            "北韓",
            "緬甸",
            "汶萊",
            "東帝汶",
            "巴布亞紐幾內亞",
          ],
        },
        {
          type: "limited",
          title: "有限街景：",
          items: [
            "中國：有街景，但是都在室內的博物館，數量非常少。",
            "尼泊爾：在上珠穆朗瑪峰前的登山營地有街景。",
            "巴基斯坦：只有在拉合爾(Lahore)有很少量的街景。",
            "伊拉克：只有在首都巴格達的伊拉克國家博物館的中庭與室內有街景。",
          ],
        },
        {
          type: "limited",
          title: "有限街景，但可以當作不存在：",
          items: [
            "阿富汗：聽說在一個巷子裡，這輩子沒見過",
          ],
        },
      ]}
      notes={
        <p className="text-muted-foreground text-sm leading-relaxed">
          中亞與阿拉伯地區大部分國家都沒有街景，詳細可參考上方地圖，此處不再逐一列舉。
        </p>
      }
    />
  );
}
