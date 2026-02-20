"use client";

import React from "react";
import {
  COVERAGE_COLORS,
  COVERAGE_LABELS,
  type CoverageStatus,
} from "@/data/coverageData";

export default function CoverageLegend() {
  const statuses: CoverageStatus[] = ["full", "limited", "none"];

  return (
    <div className="absolute bottom-2 right-2 bg-zinc-900/85 backdrop-blur-sm border border-zinc-700/50 rounded px-2.5 py-1.5 shadow-lg z-20">
      <div className="flex flex-col gap-1">
        {statuses.map((status) => (
          <div key={status} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm inline-block shrink-0"
              style={{ backgroundColor: COVERAGE_COLORS[status] }}
            />
            <span className="text-[11px] leading-tight text-zinc-300 whitespace-nowrap">
              {COVERAGE_LABELS[status]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
