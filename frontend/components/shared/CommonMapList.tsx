import React, { useState } from "react";
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
  const [onlyWithVideo, setOnlyWithVideo] = useState(false);

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
    <div className="space-y-4">
      {/* Toggle filter switch */}
      <div className="flex items-center gap-2">
        <label htmlFor="toggle-video" className="text-sm">
          只顯示有影片詳解的題目
        </label>
        <button
          role="switch"
          aria-checked={onlyWithVideo}
          onClick={() => setOnlyWithVideo((prev) => !prev)}
          className={`ml-2 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${onlyWithVideo
            ? "bg-blue-600 dark:bg-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
            : "bg-gray-300 dark:bg-zinc-600 focus:ring-blue-500 dark:focus:ring-blue-400"
            }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full transition-transform ${onlyWithVideo ? "translate-x-6" : "translate-x-1"
              } bg-white dark:bg-gray-200`}
          />
        </button>
      </div>

      {/* Map Cards */}
      <div className={`grid ${isTwoColumns ? "md:grid-cols-2 gap-6" : "grid-cols-1"}`}>
        {Object.entries(groupedByMap).map(([mapId, entries]) => (
          <CommonMapCard
            key={mapId}
            entries={entries}
            metadataMap={metadataMap}
            showSourceLink={showSourceLink}
            onlyWithVideo={onlyWithVideo}
          />
        ))}
      </div>
    </div>
  );
}
