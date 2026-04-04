// app/daily-challenge/client.tsx

"use client";

import React, { useState, useMemo, useCallback } from "react";
import { useQueries } from "@tanstack/react-query";
import CommonMapList from "@/components/shared/CommonMapList";
import CommonTabs from "@/components/shared/CommonTabs";
import LoadingSkeleton from "@/components/shared/LoadingSkeleton";
import ErrorRetry from "@/components/shared/ErrorRetry";
import ChallengeDescription from "@/components/daily-challenge/ChallengeDescription";
import { useDailyChallengeMonths } from "@/hooks/useDailyChallengeData";
import { useVideoExplanations } from "@/hooks/useVideoExplanations";
import { MAP_DISPLAY_TITLES, MAP_REPLACEMENTS } from "@/components/daily-challenge/mapTitles";
import { AiFillYoutube } from "react-icons/ai";
import type { DailyChallengeEntry } from "@/types/map-entry";

const REPLACED_MAP_IDS = new Set(Object.keys(MAP_REPLACEMENTS));

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

const VISIBLE_COUNTRIES = ["世界", "台灣", "日本"];

const COUNTRY_MAP: Record<string, string> = {
  世界: "world",
  台灣: "tw",
  日本: "jp",
  馬來西亞: "my",
  香港: "hk",
};

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function getPreviousMonth(month: string): string {
  const [year, mon] = month.split("-").map(Number);
  const prev = mon === 1 ? new Date(year - 1, 11) : new Date(year, mon - 2);
  return `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, "0")}`;
}

export default function ClientPage() {
  const [selectedCountry, setSelectedCountry] = useState("世界");
  const [onlyWithVideo, setOnlyWithVideo] = useState(false);

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
    if (typeof window.gtag === "function") {
      window.gtag("event", "select_country", {
        page: "daily-challenge",
        country,
      });
    }
  };

  const currentMonth = useMemo(() => getCurrentMonth(), []);
  const previousMonth = useMemo(() => getPreviousMonth(currentMonth), [currentMonth]);

  // 展開的月份（預設只展開當月）
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(
    () => new Set([currentMonth])
  );

  // 需要載入資料的月份 = 已展開 + 上月（預載但不展開）
  const monthsToFetch = useMemo(() => {
    const set = new Set(expandedMonths);
    set.add(previousMonth);
    return set;
  }, [expandedMonths, previousMonth]);

  const toggleMonth = useCallback((month: string) => {
    setExpandedMonths((prev) => {
      const next = new Set(prev);
      if (next.has(month)) {
        next.delete(month);
      } else {
        next.add(month);
      }
      return next;
    });
  }, []);

  // 取得可用月份列表
  const {
    data: availableMonths,
    isLoading: isLoadingMonths,
    isError: isErrorMonths,
    refetch: refetchMonths,
  } = useDailyChallengeMonths();

  // 對所有需要載入的月份發送 query（已展開 + 預載上月）
  const monthsToFetchArr = useMemo(() => [...monthsToFetch], [monthsToFetch]);
  const monthQueries = useQueries({
    queries: monthsToFetchArr.map((month) => ({
      queryKey: ["daily-challenge", month],
      queryFn: async () => {
        const res = await fetch(
          `${API_BASE}/api/daily-challenge?month=${month}`
        );
        if (!res.ok) throw new Error("資料載入失敗");
        return res.json() as Promise<DailyChallengeEntry[]>;
      },
    })),
  });

  // 正在載入的月份
  const loadingMonths = useMemo(() => {
    const set = new Set<string>();
    monthQueries.forEach((q, i) => {
      if (q.isLoading) set.add(monthsToFetchArr[i]);
    });
    return set;
  }, [monthQueries, monthsToFetchArr]);

  // 彙整所有已載入的 entries
  const allEntries = useMemo(
    () => monthQueries.flatMap((q) => q.data ?? []),
    [monthQueries]
  );

  const { data: videoExplanations } = useVideoExplanations();

  // 從 video explanations 建立 entries（有影片模式用）
  const videoEntries = useMemo(() => {
    if (!videoExplanations) return [];
    const entries: DailyChallengeEntry[] = [];
    for (const [date, maps] of Object.entries(videoExplanations)) {
      for (const [mapId, videoData] of Object.entries(maps)) {
        if (!videoData.challengeUrl) continue;
        if (!videoData.explanation && !videoData.livestream) continue;
        entries.push({
          country: mapId.split("-")[0],
          mapId,
          challengeUrl: videoData.challengeUrl,
          createdAt: date,
        });
      }
    }
    return entries;
  }, [videoExplanations]);

  const entries = onlyWithVideo ? videoEntries : allEntries;

  const filteredEntries = entries.filter(
    (entry) => entry.country === COUNTRY_MAP[selectedCountry]
  );

  // 只保留當前國家的地圖 metadata，排除已被替換的地圖（如 ACW → Figsy）
  const countryCode = COUNTRY_MAP[selectedCountry];
  const filteredMetadata = useMemo(() => {
    const result: Record<string, typeof MAP_DISPLAY_TITLES[string]> = {};
    for (const [mapId, meta] of Object.entries(MAP_DISPLAY_TITLES)) {
      if (mapId.startsWith(`${countryCode}-`) && !REPLACED_MAP_IDS.has(mapId)) {
        result[mapId] = meta;
      }
    }
    return result;
  }, [countryCode]);

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">GeoGuessr 每日免費挑戰</h1>
      <p className="mb-6">
        每天更新的 GeoGuessr 免費挑戰連結，無需登入帳號、不限時間，點開就能玩。<br />
        本站每日更新世界、台灣、日本等主題的挑戰連結，適合練習與比分。<br />
        <br />
        每個連結包含五個固定題目，所有人在同一天看到的題目內容相同。<br />
        這些連結使用的是 GeoGuessr 的<strong>挑戰模式（Challenge Mode）</strong>，
        過去的連結不會失效，實測五年前產生的連結依然可以正常遊玩。
      </p>

      <CommonTabs
        options={VISIBLE_COUNTRIES}
        selected={selectedCountry}
        onSelect={handleCountrySelect}
      />

      <ChallengeDescription country={selectedCountry} />

      {/* 影片篩選開關 */}
      <div className="flex items-center gap-2 mb-4">
        <label className="flex items-center gap-1 text-base text-red-600">
          <AiFillYoutube className="text-red-600" />
          只顯示有影片詳解的題目
        </label>
        <button
          role="switch"
          aria-checked={onlyWithVideo}
          onClick={() => setOnlyWithVideo((prev) => !prev)}
          className={`ml-2 relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
            onlyWithVideo
              ? "bg-blue-600 dark:bg-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
              : "bg-gray-300 dark:bg-zinc-600 focus:ring-blue-500 dark:focus:ring-blue-400"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full transition-transform ${
              onlyWithVideo ? "translate-x-6" : "translate-x-1"
            } bg-white dark:bg-gray-200`}
          />
        </button>
      </div>

      {isLoadingMonths && <LoadingSkeleton rows={3} />}
      {isErrorMonths && <ErrorRetry onRetry={() => refetchMonths()} />}
      {!isLoadingMonths && !isErrorMonths && (
        <CommonMapList
          entries={filteredEntries}
          metadataMap={filteredMetadata}
          expandAll={onlyWithVideo}
          availableMonths={onlyWithVideo ? undefined : availableMonths}
          expandedMonths={expandedMonths}
          loadingMonths={loadingMonths}
          onToggleMonth={toggleMonth}
        />
      )}
    </div>
  );
}
