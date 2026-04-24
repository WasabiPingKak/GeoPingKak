"use client";

import TabSunPosition from "@/components/tutorial/TabSunPosition";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";
import RelatedLinks from "@/components/shared/RelatedLinks";

export default function SunPositionClient() {
  return (
    <>
      <h1 className="text-xl font-bold mb-6">太陽位置</h1>
      <TabSunPosition />
      <TutorialPrevNext />
      <RelatedLinks links={[
        { href: "/tutorial/street-coverage", title: "街景覆蓋國家", description: "哪些國家有 Google 街景？各洲覆蓋情況一覽" },
        { href: "/glossary", title: "名詞解釋", description: "GeoGuessr 常見術語與遊戲名詞中文對照" },
        { href: "/source", title: "進階學習資源", description: "Plonk It、GeoTips 等攻略網站推薦" },
      ]} />
    </>
  );
}
