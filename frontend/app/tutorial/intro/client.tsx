"use client";

import TabIntro from "@/components/tutorial/TabIntro";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function IntroClient() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">前言</h1>
      <TabIntro />
      <TutorialPrevNext />
    </>
  );
}
