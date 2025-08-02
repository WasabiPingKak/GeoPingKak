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
            "中國：有街景，但是都在市內的博物館，數量非常少。",
            "尼泊爾：在上珠穆朗瑪峰前的登山營地有街景，其他地方都沒有。",
            "巴基斯坦：只有在首都伊斯蘭馬巴德有街景。",
            "伊拉克：在首都巴格達的伊拉克國家博物館的中庭。",
          ],
        },
        {
          type: "limited",
          title: "有限街景，但可以當作不存在：",
          items: [
            "萬那杜：一些自然景觀，數量也很少，可以當作不存在",
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
