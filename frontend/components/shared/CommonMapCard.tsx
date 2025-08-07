import React from "react";
import type { DailyChallengeEntry } from "@/types/map-entry";
import type { MapMetadata } from "@/components/daily-challenge/mapTitles";
import VIDEO_EXPLANATIONS from "@/data/videoExplanations";
import { AiFillYoutube } from "react-icons/ai";

interface CommonMapCardProps {
  entries: DailyChallengeEntry[];
  metadataMap: Record<string, MapMetadata>;
  showSourceLink?: boolean;
}

export default function CommonMapCard({
  entries,
  metadataMap,
  showSourceLink = true,
}: CommonMapCardProps) {
  const mapId = entries[0].mapId;
  const metadata = metadataMap[mapId];

  return (
    <div className="rounded-xl border p-4 bg-card shadow-sm">
      <h2 className="text-xl font-semibold mb-2">
        {metadata?.title ?? mapId}
      </h2>
      <p className="text-sm text-muted-foreground mb-3">
        {metadata?.description ?? "（尚無說明）"}
      </p>

      {showSourceLink && metadata?.source && (
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
          .map((entry) => {
            const videoUrl = VIDEO_EXPLANATIONS[entry.createdAt]?.[entry.mapId];

            return (
              <li key={entry.createdAt} className="flex flex-wrap items-center gap-3">
                <a
                  href={entry.challengeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-600 dark:text-blue-400"
                >
                  {entry.title ?? `📅 ${entry.createdAt}`}
                </a>

                {videoUrl && (
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-red-600 dark:text-red-400 hover:underline"
                  >
                    <AiFillYoutube className="w-4 h-4 mr-1" />
                    今日詳解
                  </a>
                )}
              </li>
            );
          })}
      </ul>
    </div>
  );
}
