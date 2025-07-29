"use client";

import React, { useState } from "react";
import DailyChallengeList from "@/components/daily-challenge/DailyChallengeList";
import CountryTabs from "@/components/daily-challenge/CountryTabs";
import ChallengeDescription from "@/components/daily-challenge/ChallengeDescription";
import { MOCK_DAILY_CHALLENGES } from "@/components/daily-challenge/mockData";

const ALL_COUNTRIES = ["世界", "台灣", "日本", "馬來西亞", "香港"];
const VISIBLE_COUNTRIES = ["世界", "台灣", "日本"];

export default function Page() {
  const [selectedCountry, setSelectedCountry] = useState("世界");

  const filteredEntries = MOCK_DAILY_CHALLENGES.filter(
    (entry) => entry.country === selectedCountry
  );

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">🌍 每日挑戰</h1>
      <p className="mb-6">
        所有每日挑戰皆為 GeoGuessr 的 <strong>挑戰模式（Challenge Mode）</strong>，只要有題目連結，無需登入即可遊玩，沒有時間限制。<br />
        每一個連結固定五個題目，所有人在同一天的題目都是相同的。
      </p>

      <CountryTabs
        countries={VISIBLE_COUNTRIES}
        selectedCountry={selectedCountry}
        onSelect={setSelectedCountry}
      />

      <ChallengeDescription country={selectedCountry} />

      <DailyChallengeList entries={filteredEntries} />
    </div>
  );
}
