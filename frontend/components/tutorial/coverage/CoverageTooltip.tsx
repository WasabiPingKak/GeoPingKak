"use client";

import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  ALL_COUNTRIES,
  COVERAGE_COLORS,
  COVERAGE_LABELS,
  NAME_MAP,
  type CoverageStatus,
} from "@/data/coverageData";

export interface CoverageInfo {
  nameTw: string;
  status: CoverageStatus;
  note?: string;
}

interface TooltipState extends CoverageInfo {
  x: number;
  y: number;
  /** 指標在容器右半邊時，提示框改顯示在左側，避免超出卡片 */
  flip: boolean;
}

/** 依 TopoJSON 的國家 id 或名稱查覆蓋資料 */
export function useCountryLookup() {
  return useMemo(() => {
    const byId = new Map<string, CoverageInfo>();
    for (const c of ALL_COUNTRIES) {
      byId.set(c.id, { nameTw: c.nameTw, status: c.status, note: c.note });
    }
    return (id: string, name?: string): CoverageInfo | undefined =>
      byId.get(id) ?? (name ? NAME_MAP[name] : undefined);
  }, []);
}

/**
 * 提示框狀態。桌機滑過顯示、離開隱藏；手機點一下顯示，點地圖其他地方隱藏。
 */
export function useCoverageTooltip() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const show = useCallback(
    (info: CoverageInfo, event: React.MouseEvent | React.TouchEvent) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const point = "touches" in event ? event.touches[0] : event;
      const x = point.clientX - rect.left;
      setTooltip({
        ...info,
        x,
        y: point.clientY - rect.top,
        flip: x > rect.width / 2,
      });
    },
    [],
  );

  const hide = useCallback(() => setTooltip(null), []);

  // 指標或手指落在國家形狀與圓點以外（海洋、空白處）時隱藏
  const hideOutsideShapes = useCallback((event: React.SyntheticEvent) => {
    const tag = (event.target as Element).tagName.toLowerCase();
    if (tag !== "path" && tag !== "circle") setTooltip(null);
  }, []);

  /** 綁在國家形狀或圓點上的事件 */
  const bind = useCallback(
    (info: CoverageInfo | undefined) =>
      info
        ? {
            onMouseEnter: (e: React.MouseEvent) => show(info, e),
            onMouseMove: (e: React.MouseEvent) => show(info, e),
            onMouseLeave: hide,
            onTouchStart: (e: React.TouchEvent) => show(info, e),
          }
        : {},
    [show, hide],
  );

  return { containerRef, tooltip, hide, hideOutsideShapes, bind };
}

export function CoverageTooltip({ tooltip }: { tooltip: TooltipState | null }) {
  if (!tooltip) return null;
  return (
    <div
      className={
        "absolute pointer-events-none z-10 bg-zinc-800 border border-zinc-600 rounded-lg "
        + "px-3 py-2 text-sm shadow-lg max-w-[14rem]"
      }
      style={{
        left: tooltip.x,
        top: tooltip.y,
        transform: tooltip.flip
          ? "translate(calc(-100% - 12px), calc(-100% - 12px))"
          : "translate(12px, calc(-100% - 12px))",
      }}
    >
      <div className="font-bold text-white whitespace-nowrap">{tooltip.nameTw}</div>
      <div style={{ color: COVERAGE_COLORS[tooltip.status] }}>
        {COVERAGE_LABELS[tooltip.status]}
      </div>
      {tooltip.note && (
        <div className="text-muted-foreground text-xs mt-1">{tooltip.note}</div>
      )}
    </div>
  );
}
