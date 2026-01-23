"use client";

import TutorialNav from "./TutorialNav";
import TutorialMobileNav from "./TutorialMobileNav";
import TutorialBreadcrumb from "./TutorialBreadcrumb";

export default function TutorialLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TutorialBreadcrumb />
      <div className="flex gap-8">
        {/* 桌面版側邊導覽 */}
        <aside className="hidden lg:block w-48 shrink-0">
          <div className="sticky top-4">
            <h2 className="text-sm font-semibold text-zinc-400 mb-3 px-3">入門教學</h2>
            <TutorialNav />
          </div>
        </aside>

        {/* 主內容區域 */}
        <div className="flex-1 min-w-0">
          {/* 行動版導覽 */}
          <div className="lg:hidden mb-6">
            <TutorialMobileNav />
          </div>
          {children}
        </div>
      </div>
    </>
  );
}
