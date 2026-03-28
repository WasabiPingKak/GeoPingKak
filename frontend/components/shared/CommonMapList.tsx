import React from "react";
import type { DailyChallengeEntry } from "@/types/map-entry";
import type { MapMetadata } from "@/components/daily-challenge/mapTitles";
import { MAP_REPLACEMENTS } from "@/components/daily-challenge/mapTitles";
import CommonMapCard from "./CommonMapCard";

interface CommonMapListProps {
  entries: DailyChallengeEntry[];
  metadataMap: Record<string, MapMetadata>;
  showSourceLink?: boolean;
  expandAll?: boolean;
  /** 所有可用月份（月份導航模式） */
  availableMonths?: string[];
  /** 目前展開的月份 */
  expandedMonths?: Set<string>;
  /** 正在載入的月份 */
  loadingMonths?: Set<string>;
  /** 切換月份展開/收合 */
  onToggleMonth?: (month: string) => void;
}

export default function CommonMapList({
  entries,
  metadataMap,
  showSourceLink = true,
  expandAll = false,
  availableMonths,
  expandedMonths,
  loadingMonths,
  onToggleMonth,
}: CommonMapListProps) {
  // 依 displayMapId 分組，被替換的舊地圖歸入新地圖同一欄
  const groupedByMap = entries.reduce<Record<string, DailyChallengeEntry[]>>(
    (acc, entry) => {
      const displayMapId = MAP_REPLACEMENTS[entry.mapId] || entry.mapId;
      if (!acc[displayMapId]) acc[displayMapId] = [];
      acc[displayMapId].push(entry);
      return acc;
    },
    {}
  );

  // 依 metadataMap 定義順序排序，確保切換篩選時欄位順序不變
  const metadataKeys = Object.keys(metadataMap);

  // 月份導航模式下，即使某 mapId 沒有任何已載入 entry，也要顯示卡片
  const allMapIds = availableMonths
    ? [...new Set([...Object.keys(groupedByMap), ...metadataKeys])]
    : Object.keys(groupedByMap);

  const sortedMapIds = allMapIds
    .filter((id) => metadataMap[id]) // 只顯示有 metadata 的地圖
    .sort(
      (a, b) =>
        (metadataKeys.indexOf(a) === -1 ? Infinity : metadataKeys.indexOf(a)) -
        (metadataKeys.indexOf(b) === -1 ? Infinity : metadataKeys.indexOf(b))
    );

  const isTwoColumns = sortedMapIds.length >= 2;

  return (
    <div className="space-y-4">
      {/* Map Cards */}
      <div className={`grid ${isTwoColumns ? "md:grid-cols-2 gap-6" : "grid-cols-1"}`}>
        {sortedMapIds.map((displayMapId) => (
          <CommonMapCard
            key={displayMapId}
            displayMapId={displayMapId}
            entries={groupedByMap[displayMapId] ?? []}
            metadataMap={metadataMap}
            showSourceLink={showSourceLink}
            expandAll={expandAll}
            availableMonths={availableMonths}
            expandedMonths={expandedMonths}
            loadingMonths={loadingMonths}
            onToggleMonth={onToggleMonth}
          />
        ))}
      </div>
    </div>
  );
}
