"use client";

import TabIntro from "@/components/tutorial/TabIntro";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";
import RelatedLinks from "@/components/shared/RelatedLinks";

export default function IntroClient() {
  return (
    <>
      <h1 className="text-xl font-bold mb-6">前言</h1>
      <TabIntro />
      <TutorialPrevNext />
      <RelatedLinks links={[
        { href: "/glossary", title: "名詞解釋", description: "GeoGuessr 常見術語與遊戲名詞中文對照" },
        { href: "/daily-challenge", title: "每日免費挑戰", description: "每天更新的免費挑戰連結，不用登入直接玩" },
        { href: "/recommend_settings", title: "推薦設定", description: "遊戲設定優化與實用快捷鍵" },
      ]} />
    </>
  );
}
