"use client";

import TutorialNav from "./TutorialNav";
import TutorialMobileNav from "./TutorialMobileNav";
import TutorialBreadcrumb from "./TutorialBreadcrumb";

export default function TutorialLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TutorialBreadcrumb />

      {/* 桌面版頂端分頁 */}
      <div className="hidden sm:block mb-6">
        <TutorialNav />
      </div>

      {/* 行動版下拉選單 */}
      <div className="sm:hidden mb-6">
        <TutorialMobileNav />
      </div>

      {children}
    </>
  );
}
