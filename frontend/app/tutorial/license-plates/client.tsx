"use client";

import TabLicensePlates from "@/components/tutorial/TabLicensePlates";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function LicensePlatesClient() {
  return (
    <>
      <h2 className="text-xl font-bold mb-6">車牌辨識</h2>
      <TabLicensePlates />
      <TutorialPrevNext />
    </>
  );
}
