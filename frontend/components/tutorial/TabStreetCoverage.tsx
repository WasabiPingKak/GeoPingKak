import React from "react";
import AsiaCoverageBlock from "@/components/tutorial/coverage/AsiaCoverageBlock";
import EuropeCoverageBlock from "@/components/tutorial/coverage/EuropeCoverageBlock";
import NorthAmericaCoverageBlock from "@/components/tutorial/coverage/NorthAmericaCoverageBlock";
import CaribbeanCoverageBlock from "@/components/tutorial/coverage/CaribbeanCoverageBlock";
import SouthAmericaCoverageBlock from "@/components/tutorial/coverage/SouthAmericaCoverageBlock";
import OceaniaCoverageBlock from "@/components/tutorial/coverage/OceaniaCoverageBlock";
import AfricaCoverageBlock from "@/components/tutorial/coverage/AfricaCoverageBlock";

export default function TabStreetCoverage() {
  return (
    <div className="text-muted-foreground text-base leading-relaxed space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">街景覆蓋國家</h2>

      <p>
        GeoGuessr 的遊戲資料來自 Google Street View，因此知道街景的涵蓋國家對判斷地點非常重要。<br />
        了解哪些地區有街景、哪些地區完全沒有收錄，可以在一開始就快速排除不可能的國家。
      </p>
      <p>
        當然，你不需要真的背完所有有或沒有街景的國家才開始玩。這份整理的目的是提醒新手：「GeoGuessr 並不是全世界都有街景」。<br />
        你只要大致看過、心裡有個印象，遇到陌生地圖時，就能更快做出合理的判斷。
      </p>

      <p className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 font-semibold text-base text-muted-foreground">
        簡單來說：非洲大部分沒有街景、阿拉伯大部分沒有街景、中亞大部分也沒有街景。<br />
        完整的清單可以看下面的整理。
      </p>
      <p>
        如果你想知道具體的官方街景覆蓋，可以參考
        <a
          href="https://sv-map.netlify.app/#base=roadmap&cov=official&panos=&zoom=2&center=0.000000%2C0.000000"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300"
        >
          這個網頁
        </a>。
      </p>
      <div className="flex flex-col items-center space-y-2">
        <img
          src="/tutorial/coverage/Coverage.jpg"
          alt="街景覆蓋地圖"
          className="rounded-lg border border-zinc-700 shadow-md max-w-full"
        />
        <p className="text-xs text-muted-foreground">
          資料來源：{" "}
          <a
            href="https://geohints.com/meta/countries"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            geohints.com/meta/countries
          </a>
        </p>
      </div>

      <p>
        這張圖中，<span className="text-red-400 font-medium">紅色</span>的國家是有完整的官方街景覆蓋。<br />
      </p>
      <p>
        <span className="text-gray-400 font-medium">灰色</span>代表完全沒有官方街景，
        在 GeoGuessr 中，你可以當作這個國家不存在。
      </p>

      <p>
        <span className="text-blue-400 font-medium">藍色</span>與
        <span className="text-pink-400 font-medium">粉紅色</span>的國家則是「有限街景覆蓋」。
        通常只有首都的一小部分，或是世界文化遺產等景點，並非全境都有街景。
      </p>

      <p>
        在大多數遊戲中，由於這些地區的覆蓋面積非常少，相對於其他國家微不足道，因此你可以在第一時間「一定程度上當作它們不存在」。<br />
        但要記得，它們依然「有街景」！只是出現機率遠低於其他紅色的國家。
      </p>

      <p>
        以下是各個洲我認為需要特別注意的幾個國家，新手可以先大致看過有個印象即可：
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AsiaCoverageBlock />
        <EuropeCoverageBlock />
        <NorthAmericaCoverageBlock />
        <SouthAmericaCoverageBlock />
        <CaribbeanCoverageBlock />
        <OceaniaCoverageBlock />
      </div>

      <div className="mt-6">
        <AfricaCoverageBlock />
      </div>
    </div>
  );
}
