// app/quick-reference/page.tsx

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GeoGuessr 速查筆記 | 巴西、印尼地名電話區碼查詢 - GeoPingKak",
  description: "GeoGuessr 實用速查工具，提供巴西電話區碼對照表、印尼文地名查詢等辨識資源，快速縮小範圍、提升答題準確度。",
  alternates: {
    canonical: "https://geopingkak.web.app/quick-reference",
  },
};

export default function QuickReferencePage() {
  return (
    <div className="text-zinc-300 space-y-4">
      <p>
        歡迎來到速查筆記！這裡整理了 GeoGuessr 遊戲中常用的速查資訊，幫助你快速辨識地點。
      </p>
      <p>
        請使用上方的分頁切換到你需要的查詢工具：
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li><strong>巴西電話區碼</strong>：透過路邊電話號碼快速判斷巴西城市位置</li>
        <li><strong>印尼文地名</strong>：常見印尼文地名、行政區劃對照表</li>
      </ul>
    </div>
  );
}
