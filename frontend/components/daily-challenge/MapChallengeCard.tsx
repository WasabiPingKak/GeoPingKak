import React from "react";
import type { DailyChallengeEntry } from "@/types/daily-challenge";
import { MAP_DISPLAY_TITLES } from "./mapTitles";

interface MapChallengeCardProps {
  entries: DailyChallengeEntry[];
}

export default function MapChallengeCard({ entries }: MapChallengeCardProps) {
  const mapId = entries[0].mapId;
  const metadata = MAP_DISPLAY_TITLES[mapId];

  return (
    <div className="rounded-xl border p-4 bg-card shadow-sm">
      <h2 className="text-xl font-semibold mb-2">
        {metadata?.title ?? mapId}
      </h2>
      <p className="text-sm text-muted-foreground mb-3">
        {metadata?.description ?? "（尚無說明）"}
      </p>
      {metadata?.source && (
        <p className="text-xs text-muted-foreground mb-3">
          <a
            href={`https://www.geoguessr.com/maps/${metadata.source}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-600 dark:text-blue-400"
          >
            地圖來源
          </a>
        </p>
      )}
      <ul className="space-y-2">
        {entries
          .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
          .map((entry) => (
            <li key={entry.createdAt}>
              <a
                href={entry.challengeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-600 dark:text-blue-400"
              >
                📅 {entry.createdAt}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
