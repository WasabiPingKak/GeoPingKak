"use client";

import TabSunPosition from "@/components/tutorial/TabSunPosition";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function SunPositionClient() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">太陽位置</h1>
      <TabSunPosition />
      <TutorialPrevNext />
    </>
  );
}
