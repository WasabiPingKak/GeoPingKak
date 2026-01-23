"use client";

import TabLicensePlates from "@/components/tutorial/TabLicensePlates";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function LicensePlatesClient() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">車牌辨識</h1>
      <TabLicensePlates />
      <TutorialPrevNext />
    </>
  );
}
