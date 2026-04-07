import React, { useMemo, useState } from "react";
import type { DailyChallengeEntry } from "@/types/map-entry";
import type { MapMetadata } from "@/components/daily-challenge/mapTitles";
import { MAP_REPLACEMENTS } from "@/components/daily-challenge/mapTitles";
import { useVideoExplanations } from "@/hooks/useVideoExplanations";
import { AiFillYoutube } from "react-icons/ai";
import { BsBroadcast } from "react-icons/bs";

// 被替換地圖的簡短標籤（顯示在日期旁）
const REPLACED_MAP_LABELS: Record<string, string> = {
  "world-acw": "ACW",
};

interface CommonMapCardProps {
  displayMapId: string;
  entries: DailyChallengeEntry[];
  metadataMap: Record<string, MapMetadata>;
  showSourceLink?: boolean;
  expandAll?: boolean;
  /** 所有可用月份（月份導航模式，由外部控制展開） */
  availableMonths?: string[];
  /** 目前展開的月份（月份導航模式） */
  expandedMonths?: Set<string>;
  /** 正在載入的月份（月份導航模式） */
  loadingMonths?: Set<string>;
  /** 切換月份展開/收合（月份導航模式） */
  onToggleMonth?: (month: string) => void;
}

export default function CommonMapCard({
  displayMapId,
  entries,
  metadataMap,
  showSourceLink = true,
  expandAll = false,
  availableMonths,
  expandedMonths,
  loadingMonths,
  onToggleMonth,
}: CommonMapCardProps) {
  const metadata = metadataMap[displayMapId];
  const { data: videoExplanations } = useVideoExplanations();

  const now = useMemo(() => new Date(), []);
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  // 是否使用外部月份導航模式
  const useExternalMonths = !!(availableMonths && expandedMonths && onToggleMonth);

  // 將 entries 依月份分組
  const groupedByMonth = useMemo(() => {
    const map: Record<string, DailyChallengeEntry[]> = {};
    for (const entry of entries) {
      const monthKey = entry.createdAt.slice(0, 7);
      if (!map[monthKey]) map[monthKey] = [];
      map[monthKey].push(entry);
    }
    return map;
  }, [entries]);

  // --- 內部月份展開狀態（expandAll / 影片模式用） ---
  const defaultOpenMonths = useMemo(() => {
    const state: Record<string, boolean> = {};
    for (const month of Object.keys(groupedByMonth)) {
      state[month] = expandAll || month === currentMonth;
    }
    return state;
  }, [expandAll, groupedByMonth, currentMonth]);

  const [monthOverrides, setMonthOverrides] = useState<Record<string, boolean>>({});

  const internalOpenMonths = useMemo(
    () => ({ ...defaultOpenMonths, ...monthOverrides }),
    [defaultOpenMonths, monthOverrides]
  );

  const internalToggle = (month: string) => {
    setMonthOverrides((prev) => ({
      ...prev,
      [month]: !internalOpenMonths[month],
    }));
  };

  // --- 決定要顯示的月份列表與展開狀態 ---
  const monthsToShow = useExternalMonths
    ? availableMonths
    : Object.keys(groupedByMonth).sort((a, b) => b.localeCompare(a));

  const isMonthOpen = (month: string) =>
    useExternalMonths ? expandedMonths.has(month) : !!internalOpenMonths[month];

  const handleToggle = (month: string) =>
    useExternalMonths ? onToggleMonth(month) : internalToggle(month);

  // --- 「更久以前」分組（僅在非 expandAll 模式下啟用） ---
  const olderCutoff = useMemo(() => {
    const d = new Date(now.getFullYear(), now.getMonth() - 2);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  }, [now]);

  const [olderExpanded, setOlderExpanded] = useState(false);

  const recentMonths = expandAll
    ? monthsToShow
    : monthsToShow.filter((m) => m > olderCutoff);
  const olderMonths = expandAll
    ? []
    : monthsToShow.filter((m) => m <= olderCutoff);

  // 渲染單一月份區塊
  const renderMonthSection = (month: string) => {
    const monthEntries = groupedByMonth[month] ?? [];
    const isOpen = isMonthOpen(month);
    const isLoading = loadingMonths?.has(month) ?? false;

    return (
      <div key={month} className="border border-muted rounded-lg bg-zinc-800 p-4">
        <button
          onClick={() => handleToggle(month)}
          className="flex items-center gap-2 text-base font-semibold text-white"
        >
          <span>{month}</span>
          <span className="text-sm text-muted-foreground">
            {isOpen ? "[-] 收合" : "[+] 展開"}
          </span>
        </button>

        {isOpen && isLoading && (
          <p className="mt-2 text-sm text-muted-foreground animate-pulse">
            載入中...
          </p>
        )}

        {isOpen && !isLoading && monthEntries.length > 0 && (
          <ul className="mt-2 space-y-2">
            {monthEntries
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((entry) => {
                const videoData = videoExplanations?.[entry.createdAt]?.[entry.mapId];
                const explanationUrl = videoData?.explanation;
                const livestreamUrl = videoData?.livestream;

                const isReplaced = entry.mapId in MAP_REPLACEMENTS;
                const replacedLabel = REPLACED_MAP_LABELS[entry.mapId];

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
                      onClick={() => {
                        if (typeof window.gtag === "function") {
                          window.gtag("event", "click_challenge", {
                            map_id: entry.mapId,
                            date: entry.createdAt,
                          });
                        }
                      }}
                    >
                      {`📅 ${entry.createdAt}`}
                    </a>

                    {isReplaced && replacedLabel && (
                      <span className="text-xs px-1.5 py-0.5 rounded bg-zinc-700 text-zinc-300">
                        {replacedLabel}
                      </span>
                    )}

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
    );
  };

  return (
    <div className="rounded-xl border p-4 bg-card shadow-sm">
      <h2 className="text-xl font-semibold mb-2">{metadata?.title ?? displayMapId}</h2>
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
        {recentMonths.map(renderMonthSection)}

        {olderMonths.length > 0 && (
          <div className="border border-muted rounded-lg bg-zinc-900 p-4">
            <button
              onClick={() => setOlderExpanded((prev) => !prev)}
              className="flex items-center gap-2 text-base font-semibold text-white"
            >
              <span>更久以前</span>
              <span className="text-sm text-muted-foreground">
                {olderExpanded ? "[-] 收合" : `[+] 展開（${olderMonths.length} 個月）`}
              </span>
            </button>

            {olderExpanded && (
              <div className="mt-4 space-y-4">
                {olderMonths.map(renderMonthSection)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
