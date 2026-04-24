"use client";

import TabLicensePlates from "@/components/tutorial/TabLicensePlates";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";
import RelatedLinks from "@/components/shared/RelatedLinks";

export default function LicensePlatesClient() {
  return (
    <>
      <h1 className="text-xl font-bold mb-6">車牌辨識</h1>
      <TabLicensePlates />
      <TutorialPrevNext />
      <RelatedLinks links={[
        { href: "/tutorial/flags-domains", title: "國旗與網域辨識", description: "透過路邊國旗與網域後綴辨識國家" },
        { href: "/glossary", title: "名詞解釋", description: "GeoGuessr 常見術語與遊戲名詞中文對照" },
        { href: "/daily-challenge", title: "每日免費挑戰", description: "每天更新的免費挑戰連結，不用登入直接玩" },
      ]} />
    </>
  );
}
