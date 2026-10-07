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
        GeoGuessr 是一款結合觀察與推理的地理解謎遊戲。<br />
        很多教學一開始就教各國的細節辨識，但初學者更需要先學會用通用的地理觀念，快速縮小範圍。<br />
        本教學從「如何觀察世界」的角度出發，帶你建立自己的推理邏輯。
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
