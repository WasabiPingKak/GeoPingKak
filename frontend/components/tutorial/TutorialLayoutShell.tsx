"use client";

import TutorialNav from "./TutorialNav";
import TutorialMobileNav from "./TutorialMobileNav";
import TutorialBreadcrumb from "./TutorialBreadcrumb";

export default function TutorialLayoutShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TutorialBreadcrumb />

      <h1 className="text-2xl font-bold mb-6">入門教學</h1>
      <p className="mb-6">
        GeoGuessr 是一款結合觀察與推理的地理解謎遊戲，但多數教學僅著重在國家的細節辨識。<br />
        但初學者需要先學會從一些通用的地理觀念切入，快速縮小範圍。<br />
        本教學將從「如何觀察世界」的角度出發，由六個基本原則出發，建立你的推理邏輯，而不是只靠死背。
      </p>

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
