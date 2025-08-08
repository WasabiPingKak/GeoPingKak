// app/tutorial/page.tsx

"use client";

import React, { useState } from "react";
import CommonTabs from "@/components/shared/CommonTabs";
import TabStreetCoverage from "@/components/tutorial/TabStreetCoverage";
import TabFlagDomain from "@/components/tutorial/TabFlagDomain";
import TabLicensePlates from "@/components/tutorial/TabLicensePlates";
import TabDrivingSide from "@/components/tutorial/TabDrivingSide";
import TabLanguages from "@/components/tutorial/TabLanguages";
import TabSunPosition from "@/components/tutorial/TabSunPosition";

const TABS = [
  "街景覆蓋國家",
  "國旗/網域",
  "道路通行方向",
  "太陽",
  "車牌",
  // "語言",
];

export default function TutorialPage() {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">入門教學</h1>
      <p className="mb-6">
        GeoGuessr 是一款結合觀察與推理的地理解謎遊戲，但多數教學僅著重在國家的細節辨識。<br />
        但初學者需要先學會從一些通用的地理觀念切入，快速縮小範圍。<br />
        本教學將從「如何觀察世界」的角度出發，由六個基本原則出發，建立你的推理邏輯，而不是只靠死背。
      </p>

      <CommonTabs
        options={TABS}
        selected={selectedTab}
        onSelect={setSelectedTab}
      />

      <div className="mt-8">
        {selectedTab === "街景覆蓋國家" && <TabStreetCoverage />}
        {selectedTab === "國旗/網域" && <TabFlagDomain />}
        {selectedTab === "車牌" && <TabLicensePlates />}
        {selectedTab === "道路通行方向" && <TabDrivingSide />}
        {selectedTab === "語言" && <TabLanguages />}
        {selectedTab === "太陽" && <TabSunPosition />}
      </div>
    </div>
  );
}
