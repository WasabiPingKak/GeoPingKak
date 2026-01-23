"use client";

import TabStreetCoverage from "@/components/tutorial/TabStreetCoverage";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function StreetCoverageClient() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">街景覆蓋國家</h1>
      <TabStreetCoverage />
      <TutorialPrevNext />
    </>
  );
}
