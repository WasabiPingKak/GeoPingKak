// components/tutorial/TabDrivingSide.tsx

import React from "react";

export default function TabDrivingSide() {
  return (
    <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">道路通行方向</h2>

      <p>
        世界各國的道路通行方向不盡相同，有些國家是靠右行駛（如台灣、美國、法國），有些則是靠左行駛（如日本、英國、澳洲）。
        這個線索常見於街景的「車流方向」、「路標位置」、「駕駛座位」等。
      </p>

      <p>
        可觀察以下幾個細節來判斷：
        <ul className="list-disc list-inside ml-4">
          <li>雙向車道中，車輛主要集中在哪一側</li>
          <li>路邊停車的方向</li>
          <li>交通號誌與箭頭指示的排列方式</li>
          <li>從街景中的車內視角觀察駕駛座位在哪側</li>
        </ul>
      </p>

      <p>
        有些國家在過去曾被殖民，因此承襲了殖民母國的通行方向，例如：肯亞、新加坡等地採左側通行，與英國一致。
      </p>

      <p>
        確認通行方向後，通常能立刻排除世界上約一半的國家，是極具價值的第一步線索。
      </p>
    </div>
  );
}
