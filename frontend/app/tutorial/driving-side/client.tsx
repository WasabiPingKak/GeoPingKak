"use client";

import TabDrivingSide from "@/components/tutorial/TabDrivingSide";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";
import RelatedLinks from "@/components/shared/RelatedLinks";

export default function DrivingSideClient() {
  return (
    <>
      <h1 className="text-xl font-bold mb-6">道路通行方向</h1>
      <TabDrivingSide />
      <TutorialPrevNext />
      <RelatedLinks links={[
        { href: "/tutorial/street-coverage", title: "街景覆蓋國家", description: "哪些國家有 Google 街景？各洲覆蓋情況一覽" },
        { href: "/glossary", title: "名詞解釋", description: "GeoGuessr 常見術語與遊戲名詞中文對照" },
        { href: "/daily-challenge", title: "每日免費挑戰", description: "每天更新的免費挑戰連結，不用登入直接玩" },
      ]} />
    </>
  );
}
