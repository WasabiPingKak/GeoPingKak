"use client";

import TabStreetCoverage from "@/components/tutorial/TabStreetCoverage";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";
import RelatedLinks from "@/components/shared/RelatedLinks";

export default function StreetCoverageClient() {
  return (
    <>
      <h1 className="text-xl font-bold mb-6">街景覆蓋國家</h1>
      <TabStreetCoverage />
      <TutorialPrevNext />
      <RelatedLinks links={[
        { href: "/tutorial/driving-side", title: "道路通行方向", description: "靠左行駛國家列表，快速縮小猜測範圍" },
        { href: "/quick-reference", title: "速查筆記", description: "巴西電話區碼、印尼文地名等實用速查工具" },
        { href: "/daily-challenge", title: "每日免費挑戰", description: "每天更新的免費挑戰連結，不用登入直接玩" },
      ]} />
    </>
  );
}
