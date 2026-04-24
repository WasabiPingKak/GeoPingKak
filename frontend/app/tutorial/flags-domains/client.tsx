"use client";

import TabFlagDomain from "@/components/tutorial/TabFlagDomain";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";
import RelatedLinks from "@/components/shared/RelatedLinks";

export default function FlagsDomainsClient() {
  return (
    <>
      <h1 className="text-xl font-bold mb-6">國旗/網域</h1>
      <TabFlagDomain />
      <TutorialPrevNext />
      <RelatedLinks links={[
        { href: "/tutorial/license-plates", title: "車牌辨識教學", description: "各國車牌特徵詳解，搭配國旗更快鎖定國家" },
        { href: "/glossary", title: "名詞解釋", description: "GeoGuessr 常見術語與遊戲名詞中文對照" },
        { href: "/daily-challenge", title: "每日免費挑戰", description: "每天更新的免費挑戰連結，不用登入直接玩" },
      ]} />
    </>
  );
}
