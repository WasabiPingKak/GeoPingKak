import React from "react";
import type { DailyChallengeEntry } from "@/types/map-entry";
import type { MapMetadata } from "@/components/daily-challenge/mapTitles";
import CommonMapCard from "./CommonMapCard";

interface CommonMapListProps {
  entries: DailyChallengeEntry[];
  metadataMap: Record<string, MapMetadata>;
  showSourceLink?: boolean;
}

export default function CommonMapList({
  entries,
  metadataMap,
  showSourceLink = true,
}: CommonMapListProps) {
  const groupedByMap = entries.reduce<Record<string, DailyChallengeEntry[]>>(
    (acc, entry) => {
      if (!acc[entry.mapId]) acc[entry.mapId] = [];
      acc[entry.mapId].push(entry);
      return acc;
    },
    {}
  );

  const isTwoColumns = Object.keys(groupedByMap).length >= 2;

  return (
    <div className={`grid ${isTwoColumns ? "md:grid-cols-2 gap-6" : "grid-cols-1"}`}>
      {Object.entries(groupedByMap).map(([mapId, entries]) => (
        <CommonMapCard
          key={mapId}
          entries={entries}
          metadataMap={metadataMap}
          showSourceLink={showSourceLink}
        />
      ))}
    </div>
  );
}
