"use client";

import { useState } from "react";
import SidebarMenu from "@/components/SidebarMenu";
import MobileSidebarDrawer from "@/components/common/MobileSidebarDrawer";

export default function RootShell({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* ✅ 手機版 TopBar */}
      <div className="md:hidden bg-zinc-800 h-14 px-4 flex items-center justify-start gap-2 shadow z-40">
        <button
          onClick={() => setSidebarOpen(true)}
          className="text-white text-2xl"
          aria-label="開啟選單"
        >
          ☰
        </button>
        <span className="text-white font-bold text-lg">GeoPingKak</span>
      </div>

      {/* ✅ 手機抽屜側欄 */}
      <MobileSidebarDrawer open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* ✅ 桌面與主要內容 */}
      <div className="flex min-h-screen bg-zinc-900 text-white">
        {/* 桌面 Sidebar */}
        <div className="hidden md:block">
          <SidebarMenu />
        </div>

        {/* 主內容 */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </>
  );
}
