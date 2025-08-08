// components/tutorial/TabLicensePlates.tsx

import React from "react";
import "react-medium-image-zoom/dist/styles.css";
import ReferenceSources from "./plate/ReferenceSources";
import { REFERENCE_SOURCES } from "./plate/referenceData";
import PlateBlock from "./plate/PlateBlock";
import {
  EURO_YELLOW_PLATES,
  EURO_DOUBLE_STRIPE_PLATES,
  EURO_SPECIAL_PLATES,
} from "./plate/plateData";
import EuroPlateSection from "./plate/EuroPlateSection";
import { EURO_STANDARD_PLATE, EURO_NON_EU_PLATE } from "./plate/plateEuroPlates";
import { ASIA_SPECIAL_PLATES } from "./plate/plateAsiaPlates";
import { AMERICA_SPECIAL_PLATES } from "./plate/plateAmericaPlates";
import { AFRICA_SPECIAL_PLATES } from "./plate/plateAfricaPlates";

export default function TabLicensePlates() {
  return (
    <div className="text-muted-foreground text-sm leading-relaxed">
      <h2 className="text-xl font-bold text-white mb-4">車牌</h2>
      <p className="mb-10">
        車牌是 GeoGuessr 中非常重要的地理線索之一。許多國家的車牌在顏色、樣式上都具有獨特風格，熟悉這些差異能快速縮小猜測範圍。<br />
        本頁不會列出所有國家的車牌樣式，僅特別強調有特色的車牌。<br />
        每個國家的車牌嚴格來說都不一樣，想要確認個別國家的車牌樣式推薦到 Plonk It 的個別國家教學查詢。
      </p>

      <div className="mb-10 text-sm text-muted-foreground">
        <ReferenceSources sources={REFERENCE_SOURCES} />
      </div>

      {/* === 歐洲 === */}
      <h3 className="text-lg font-semibold text-white mb-3">歐洲</h3>
      <EuroPlateSection data={EURO_STANDARD_PLATE} />
      <EuroPlateSection data={EURO_NON_EU_PLATE} />

      <PlateBlock title="黃底車牌" data={EURO_YELLOW_PLATES} />
      <div className="mt-10">
        <PlateBlock title="雙條紋車牌" data={EURO_DOUBLE_STRIPE_PLATES} />
      </div>
      <div className="mt-10">
        <PlateBlock title="其他特殊車牌" data={EURO_SPECIAL_PLATES} />
      </div>

      {/* === 亞洲 === */}
      <div className="mt-10">
        <PlateBlock title="亞洲特殊車牌" data={ASIA_SPECIAL_PLATES} />
      </div>

      {/* === 美洲 === */}
      <div className="mt-10">
        <PlateBlock title="美洲" data={AMERICA_SPECIAL_PLATES} />
      </div>

      {/* === 非洲 === */}
      <div className="mt-10">
        <PlateBlock title="非洲" data={AFRICA_SPECIAL_PLATES} />
      </div>

    </div>
  );
}
