import React, { useMemo, useState, useEffect } from "react";
import type { DailyChallengeEntry } from "@/types/map-entry";
import type { MapMetadata } from "@/components/daily-challenge/mapTitles";
import VIDEO_EXPLANATIONS from "@/data/videoExplanations";
import { AiFillYoutube } from "react-icons/ai";
import { BsBroadcast } from "react-icons/bs";

interface CommonMapCardProps {
  entries: DailyChallengeEntry[];
  metadataMap: Record<string, MapMetadata>;
  showSourceLink?: boolean;
  onlyWithVideo?: boolean;
}

export default function CommonMapCard({
  entries,
  metadataMap,
  showSourceLink = true,
  onlyWithVideo = false,
}: CommonMapCardProps) {
  const mapId = entries[0].mapId;
  const metadata = metadataMap[mapId];

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const groupedByMonth = useMemo(() => {
    const map: Record<string, DailyChallengeEntry[]> = {};
    const filtered = onlyWithVideo
      ? entries.filter((e) => {
        const videoData = VIDEO_EXPLANATIONS[e.createdAt]?.[e.mapId];
        return videoData?.explanation || videoData?.livestream;
      })
      : entries;

    for (const entry of filtered) {
      const monthKey = entry.createdAt.slice(0, 7); // YYYY-MM
      if (!map[monthKey]) map[monthKey] = [];
      map[monthKey].push(entry);
    }

    return map;
  }, [entries, onlyWithVideo]);

  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>(() => {
    const state: Record<string, boolean> = {};
    for (const month of Object.keys(groupedByMonth)) {
      state[month] = month === currentMonth;
    }
    return state;
  });

  useEffect(() => {
    if (onlyWithVideo) {
      setOpenMonths((prev) => {
        const allOpen: Record<string, boolean> = {};
        for (const month of Object.keys(groupedByMonth)) {
          allOpen[month] = true;
        }
        return allOpen;
      });
    }
  }, [onlyWithVideo, groupedByMonth]);

  const toggleMonth = (month: string) => {
    setOpenMonths((prev) => ({
      ...prev,
      [month]: !prev[month],
    }));
  };

  return (
    <div className="rounded-xl border p-4 bg-card shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{metadata?.title ?? mapId}</h2>
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

      <div className="space-y-4">
        {Object.entries(groupedByMonth)
          .sort((a, b) => b[0].localeCompare(a[0])) // 最新月份在上
          .map(([month, entries]) => (
            <div key={month} className="border border-muted rounded-lg bg-zinc-800 p-4">
              <button
                onClick={() => toggleMonth(month)}
                className="flex items-center gap-2 mb-2 text-base font-semibold text-white"
              >
                <span>{month}</span>
                <span className="text-sm text-muted-foreground">
                  {openMonths[month] ? "[-] 收合" : "[+] 展開"}
                </span>
              </button>

              {openMonths[month] && (
                <ul className="space-y-2">
                  {entries
                    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                    .map((entry) => {
                      const videoData = VIDEO_EXPLANATIONS[entry.createdAt]?.[entry.mapId];
                      const explanationUrl = videoData?.explanation;
                      const livestreamUrl = videoData?.livestream;

                      return (
                        <li
                          key={`${entry.mapId}-${entry.createdAt}`}
                          className="flex flex-wrap items-center gap-3"
                        >
                          <a
                            href={entry.challengeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline text-blue-600 dark:text-blue-400"
                          >
                            {entry.title ?? `📅 ${entry.createdAt}`}
                          </a>

                          {livestreamUrl && (
                            <a
                              href={livestreamUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-blue-500 dark:text-blue-300 hover:underline"
                            >
                              <BsBroadcast className="w-4 h-4 mr-1" />
                              直播記錄
                            </a>
                          )}

                          {explanationUrl && (
                            <a
                              href={explanationUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-sm text-red-600 dark:text-red-400 hover:underline"
                            >
                              <AiFillYoutube className="w-4 h-4 mr-1" />
                              詳解精華
                            </a>
                          )}
                        </li>
                      );
                    })}
                </ul>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}
