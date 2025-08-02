// components/tutorial/TabLicensePlates.tsx

import React from "react";

export default function TabLicensePlates() {
  return (
    <div className="text-muted-foreground text-sm leading-relaxed space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">車牌</h2>

      <p>
        車牌是 GeoGuessr 中非常重要的地理線索之一。許多國家的車牌在顏色、格式與字母排列上都具有獨特風格，熟悉這些差異能快速縮小猜測範圍。
      </p>


      例如：
      <ul className="list-disc list-inside ml-4">
        <li>歐盟多國的車牌左側會有藍底歐盟旗與國碼（如 DE、FR、IT）。</li>
        <li>哥倫比亞車牌底色為黃色，非常醒目。</li>
        <li>美國各州有自己獨特設計，有時可看到州名。</li>
        <li>日本車牌常見綠字白底，車型與地區編號清楚分層。</li>
      </ul>


      <p>
        有些地區（如印度）車牌雖混亂但仍有語言或色彩特徵，而非洲、南美等地有些國家則會出現前後車牌顏色不同的情況。
      </p>

      <p>
        若能清楚看到車牌形狀、字樣、顏色，往往能快速定錨位置。
      </p>
    </div>
  );
}
