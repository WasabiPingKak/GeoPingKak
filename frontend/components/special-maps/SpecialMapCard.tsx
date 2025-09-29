// components/special-maps/SpecialMapCard.tsx

import React from "react";
import type { DailyChallengeEntry } from "@/types/map-entry";
import type { MapMetadata } from "@/components/special-maps/specialMapTitles";

interface SpecialMapCardProps {
  mapId: string;
  entries: DailyChallengeEntry[];
  metadata?: MapMetadata;
}

export default function SpecialMapCard({
  mapId,
  entries,
  metadata,
}: SpecialMapCardProps) {
  const sortedEntries = [...entries].reverse(); // 最新在上
  const latestUpdate = sortedEntries[0].createdAt;
  const formattedDate = new Date(latestUpdate).toLocaleDateString("zh-TW");

  return (
    <div className="rounded-xl border p-4 bg-card shadow-sm">
      <h2 className="text-xl font-semibold mb-2">
        {metadata?.title ?? mapId}
      </h2>
      <p className="text-sm text-muted-foreground mb-3">
        {metadata?.description ?? "（尚無說明）"}
      </p>

      {/* ✅ 顯示圖片（標題與描述下方） */}
      {metadata?.img_src && (
        <img
          src={metadata.img_src}
          alt={metadata.title}
          className="w-full h-48 object-contain rounded-lg mb-4"
        />
      )}

      <ul className="space-y-2">
        {sortedEntries.map((entry, idx) => (
          <li key={`${mapId}-${idx}`} className="flex flex-wrap items-center gap-3">
            <a
              href={entry.challengeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline text-blue-600 dark:text-blue-400"
            >
              {entry.title ?? `📅 ${entry.createdAt}`}
            </a>

            {idx === 0 && (
              <span className="text-xs text-muted-foreground">
                🕒 最後更新：{formattedDate}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
