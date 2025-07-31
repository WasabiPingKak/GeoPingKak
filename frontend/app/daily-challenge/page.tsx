"use client";

import React, { useState } from "react";
import DailyChallengeList from "@/components/daily-challenge/DailyChallengeList";
import CountryTabs from "@/components/daily-challenge/CountryTabs";
import ChallengeDescription from "@/components/daily-challenge/ChallengeDescription";
import { useDailyChallengeData } from "@/hooks/useDailyChallengeData";

// const ALL_COUNTRIES = ["世界", "台灣", "日本", "馬來西亞", "香港"];
const VISIBLE_COUNTRIES = ["世界", "台灣", "日本"];

// ✅ 中英文對應表
const COUNTRY_MAP: Record<string, string> = {
  世界: "world",
  台灣: "tw",
  日本: "jp",
  馬來西亞: "my",
  香港: "hk",
};

export default function Page() {
  const [selectedCountry, setSelectedCountry] = useState("世界");
  const { data, isLoading, isError } = useDailyChallengeData();

  const filteredEntries = data?.filter(
    (entry) => entry.country === COUNTRY_MAP[selectedCountry]
  ) ?? [];

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">🌍 每日挑戰</h1>
      <p className="mb-6">
        所有每日挑戰皆為 GeoGuessr 的 <strong>挑戰模式（Challenge Mode）</strong>，只要有題目連結，無需登入即可遊玩，沒有時間限制。<br />
        任何人都可以輕鬆的慢慢練習。<br />
        每一個連結固定五個題目，所有人在同一天的題目都是相同的。
      </p>

      <CountryTabs
        countries={VISIBLE_COUNTRIES}
        selectedCountry={selectedCountry}
        onSelect={setSelectedCountry}
      />

      <ChallengeDescription country={selectedCountry} />

      {isLoading && <p className="mt-4">載入中...</p>}
      {isError && <p className="mt-4 text-red-500">資料載入失敗，請稍後再試。</p>}
      {!isLoading && !isError && <DailyChallengeList entries={filteredEntries} />}
    </div >
  );
}
