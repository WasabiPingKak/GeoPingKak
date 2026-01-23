"use client";

import TabFlagDomain from "@/components/tutorial/TabFlagDomain";
import TutorialPrevNext from "@/components/tutorial/TutorialPrevNext";

export default function FlagsDomainsClient() {
  return (
    <>
      <h2 className="text-xl font-bold mb-6">國旗/網域</h2>
      <TabFlagDomain />
      <TutorialPrevNext />
    </>
  );
}
