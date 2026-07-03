// components/daily-challenge/CasualGuessrPromo.tsx

"use client";

import React from "react";

const CASUALGUESSR_URL = "https://casualguessr.com/maps/taiwanese-test";

export default function CasualGuessrPromo() {
  return (
    <div className="relative my-7 rounded-[14px] overflow-hidden border border-zinc-800 shadow-[0_10px_34px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)] bg-[linear-gradient(180deg,#0c0e12,#08090c)]">
      {/* 綠色漸層光暈 */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(120%_140%_at_88%_-20%,rgba(16,185,129,0.16),transparent_55%)]" />

      {/* 網格紋理 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "46px 46px",
        }}
      />

      {/* 左側綠色 accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500" />

      {/* 右上座標裝飾 */}
      <span className="absolute right-4 top-3 font-mono text-[10.5px] tracking-[0.1em] text-zinc-500/30">
        25.0330&deg;N&nbsp;121.5654&deg;E
      </span>

      {/* 主內容 */}
      <div className="relative flex items-center gap-[30px] p-[26px_30px_26px_34px] max-sm:flex-col max-sm:items-stretch max-sm:gap-5 max-sm:p-[22px_20px_22px_24px]">
        {/* 左側文案 */}
        <div className="flex-1 min-w-0">
          {/* eyebrow */}
          <div className="flex items-center gap-2.5 mb-3 font-mono text-[11.5px] tracking-[0.22em] uppercase text-zinc-500">
            <span className="w-[7px] h-[7px] rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.18)] animate-pulse" />
            站長的另一個免費服務 &middot; another project
          </div>

          {/* 標題 */}
          <h2 className="text-[25px] font-bold tracking-tight leading-tight text-zinc-50 mb-2.5">
            玩膩了每日題？來試試{" "}
            <span className="text-emerald-500">CasualGuessr</span>
          </h2>

          {/* 描述 */}
          <p className="text-zinc-400 text-[14.5px] leading-7 max-w-[560px] mb-4 max-sm:max-w-none">
            我自己做的輕量版街景猜地點遊戲，針對入門玩家設計的地圖，不限次數自由玩，還能
            <b className="text-zinc-300 font-medium">上傳你自己的地圖</b>
            給別人挑戰。跟 GeoGuessr 不同的獨立作品，完全免費。
          </p>

          {/* feature tags */}
          <div className="flex flex-wrap gap-2">
            <FeatureTag icon={<GlobeIcon />} label="入門友善的自製地圖" />
            <FeatureTag icon={<UploadIcon />} label="上傳你自己的地圖" />
            <FeatureTag icon={<InfiniteIcon />} label="不限次數，免登入" />
          </div>
        </div>

        {/* 右側 CTA */}
        <div className="flex-shrink-0 flex flex-col items-end gap-3 max-sm:items-stretch">
          <a
            href={CASUALGUESSR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-[15.5px] font-bold text-[#06251b] bg-emerald-500 rounded-[9px] px-6 py-3.5 no-underline whitespace-nowrap shadow-[0_8px_26px_rgba(16,185,129,0.28)] transition-all hover:bg-emerald-400 hover:-translate-y-0.5"
          >
            免費玩玩看
            <span className="font-mono font-medium">&rsaquo;</span>
          </a>
          <span className="font-mono text-[11px] tracking-[0.16em] text-zinc-600 uppercase max-sm:text-center">
            free &middot; no login
          </span>
        </div>
      </div>
    </div>
  );
}

function FeatureTag({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-[7px] text-[13px] text-zinc-300 bg-white/[0.04] border border-zinc-700/80 rounded-lg px-3 py-1.5">
      {icon}
      {label}
    </span>
  );
}

function GlobeIcon() {
  return (
    <svg className="w-[15px] h-[15px] text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18" />
    </svg>
  );
}

function UploadIcon() {
  return (
    <svg className="w-[15px] h-[15px] text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 16V4M7 9l5-5 5 5" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

function InfiniteIcon() {
  return (
    <svg className="w-[15px] h-[15px] text-emerald-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}
