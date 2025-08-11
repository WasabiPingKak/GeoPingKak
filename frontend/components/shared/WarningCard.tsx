import React from "react";

export default function WarningCard() {
  return (
    <div className="bg-yellow-200/20 border border-yellow-500 text-yellow-100 rounded-lg p-4 space-y-3">
      <h3 className="font-semibold text-base text-yellow-300">其他注意事項：</h3>
      <p>
        由於 GeoGuessr 是以真實世界街景為基礎的地理猜謎遊戲，若你在節目中使用台灣或你所在地的地圖，有可能會遇到非常熟悉的街道或地標。
      </p>
      <p>
        請務必事先評估題目可能會<strong>暴露個人資訊</strong>的風險，並準備好應對方式，以保障你的隱私與安全。
      </p>
      <p>
        (意思就是你要先想好：如果題目剛好出在你家門口，你要能適當的在節目上應對)
      </p>
    </div>
  );
}
