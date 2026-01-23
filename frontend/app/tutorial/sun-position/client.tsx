"use client";

import TabSunPosition from "@/components/tutorial/TabSunPosition";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function SunPositionClient() {
  return (
    <>
      <h2 className="text-xl font-bold mb-6">太陽位置</h2>
      <TabSunPosition />
      <TutorialPrevNext />
    </>
  );
}
