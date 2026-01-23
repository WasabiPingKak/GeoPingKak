"use client";

import TabStreetCoverage from "@/components/tutorial/TabStreetCoverage";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function StreetCoverageClient() {
  return (
    <>
      <h2 className="text-xl font-bold mb-6">街景覆蓋國家</h2>
      <TabStreetCoverage />
      <TutorialPrevNext />
    </>
  );
}
