"use client";

import TabIntro from "@/components/tutorial/TabIntro";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function IntroClient() {
  return (
    <>
      <h2 className="text-xl font-bold mb-6">前言</h2>
      <TabIntro />
      <TutorialPrevNext />
    </>
  );
}
