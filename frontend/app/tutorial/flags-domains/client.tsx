"use client";

import TabFlagDomain from "@/components/tutorial/TabFlagDomain";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function FlagsDomainsClient() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">國旗/網域</h1>
      <TabFlagDomain />
      <TutorialPrevNext />
    </>
  );
}
