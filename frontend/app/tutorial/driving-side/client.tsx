"use client";

import TabDrivingSide from "@/components/tutorial/TabDrivingSide";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function DrivingSideClient() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">道路通行方向</h1>
      <TabDrivingSide />
      <TutorialPrevNext />
    </>
  );
}
