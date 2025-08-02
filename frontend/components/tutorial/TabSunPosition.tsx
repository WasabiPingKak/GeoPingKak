// components/tutorial/TabSunPosition.tsx

import React from "react";

export default function TabSunPosition() {
  return (
    <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">太陽</h2>

      <p>
        太陽的位置可以幫助判斷當前地點位於赤道的哪一側，是 GeoGuessr 中少數能分辨「南北半球」的線索。
      </p>

      <p>
        判斷方法是觀察影子的方向，推估太陽所在的方位（通常為東、南、西三者之一）：
        <ul className="list-disc list-inside ml-4">
          <li>若太陽在北方 → 地點多半在南半球（如澳洲、阿根廷、南非）</li>
          <li>若太陽在南方 → 地點多半在北半球（如美國、印度、歐洲）</li>
        </ul>
      </p>

      <p>
        請搭配指南針與影子方向判讀，通常影子會在建築物、路標或人物腳邊清楚可見。
      </p>

      <p>
        此技巧在缺乏語言或標誌的鄉村地圖中尤其有用，例如非洲草原、南美山區等地。
      </p>

      <p>
        注意：赤道附近（如印尼、厄瓜多）太陽幾乎在頭頂，難以透過影子辨別方向。
      </p>
    </div>
  );
}
