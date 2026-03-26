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
}

export default function CommonMapList({
  entries,
  metadataMap,
  showSourceLink = true,
  expandAll = false,
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

  const isTwoColumns = Object.keys(groupedByMap).length >= 2;

  return (
    <div className="space-y-4">
      {/* Map Cards */}
      <div className={`grid ${isTwoColumns ? "md:grid-cols-2 gap-6" : "grid-cols-1"}`}>
        {Object.entries(groupedByMap).map(([displayMapId, entries]) => (
          <CommonMapCard
            key={displayMapId}
            displayMapId={displayMapId}
            entries={entries}
            metadataMap={metadataMap}
            showSourceLink={showSourceLink}
            expandAll={expandAll}
          />
        ))}
      </div>
    </div>
  );
}
