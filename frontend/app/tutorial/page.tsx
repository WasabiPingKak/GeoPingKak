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
  "車牌",
  "道路通行方向",
  "語言",
  "太陽",
];

export default function TutorialPage() {
  const [selectedTab, setSelectedTab] = useState(TABS[0]);

  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">入門教學</h1>
      <p className="text-muted-foreground mb-8">
        GeoGuessr 本質上是一個推理遊戲，但是網路上能找到的攻略，大部分都是針對個別國家的細節來教學。<br />
        在初期，有更多基本的地理常識可以幫助你快速鎖定區域，而攻略網站不會教，因為他們覺得這是不用教的常識。
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
