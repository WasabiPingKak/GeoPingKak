import React from "react";
import type { DailyChallengeEntry } from "@/types/map-entry";
import type { MapMetadata } from "@/components/daily-challenge/mapTitles";
import SpecialMapCard from "./SpecialMapCard";

interface SpecialMapListProps {
  entries: DailyChallengeEntry[];
  metadataMap: Record<string, MapMetadata>;
}

export default function SpecialMapList({
  entries,
  metadataMap,
}: SpecialMapListProps) {
  const groupedByMap = entries.reduce<Record<string, DailyChallengeEntry[]>>(
    (acc, entry) => {
      if (!acc[entry.mapId]) acc[entry.mapId] = [];
      acc[entry.mapId].push(entry);
      return acc;
    },
    {}
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {Object.entries(groupedByMap).map(([mapId, groupEntries]) => (
        <SpecialMapCard
          key={mapId}
          mapId={mapId}
          entries={groupEntries}
          metadata={metadataMap[mapId]}
        />
      ))}
    </div>
  );
}
