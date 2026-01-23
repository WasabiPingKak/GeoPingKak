"use client";

import TabDrivingSide from "@/components/tutorial/TabDrivingSide";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function DrivingSideClient() {
  return (
    <>
      <h2 className="text-xl font-bold mb-6">道路通行方向</h2>
      <TabDrivingSide />
      <TutorialPrevNext />
    </>
  );
}
