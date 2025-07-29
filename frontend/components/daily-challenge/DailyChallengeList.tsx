import React from "react";
import { DailyChallengeEntry } from "./mockData";
import MapChallengeCard from "./MapChallengeCard";

interface DailyChallengeListProps {
  entries: DailyChallengeEntry[];
}

export default function DailyChallengeList({
  entries,
}: DailyChallengeListProps) {
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
    <div
      className={`grid ${isTwoColumns ? "md:grid-cols-2 gap-6" : "grid-cols-1"
        }`}
    >
      {Object.entries(groupedByMap).map(([mapId, entries]) => (
        <MapChallengeCard key={mapId} entries={entries} />
      ))}
    </div>
  );
}
