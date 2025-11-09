// app/daily-challenge/client.tsx

"use client";

import React, { useState } from "react";
import CommonMapList from "@/components/shared/CommonMapList";
import CommonTabs from "@/components/shared/CommonTabs";
import ChallengeDescription from "@/components/daily-challenge/ChallengeDescription";
import { useDailyChallengeData } from "@/hooks/useDailyChallengeData";
import { MAP_DISPLAY_TITLES } from "@/components/daily-challenge/mapTitles";

const VISIBLE_COUNTRIES = ["世界", "台灣", "日本"];

const COUNTRY_MAP: Record<string, string> = {
  世界: "world",
  台灣: "tw",
  日本: "jp",
  馬來西亞: "my",
  香港: "hk",
};

export default function ClientPage() {
  const [selectedCountry, setSelectedCountry] = useState("世界");
  const { data, isLoading, isError } = useDailyChallengeData();

  const filteredEntries =
    data?.filter((entry) => entry.country === COUNTRY_MAP[selectedCountry]) ?? [];

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">🌍 每日題目</h1>
      <p className="mb-6">
        所有每日題目皆為 GeoGuessr 的{" "}
        <strong>挑戰模式（Challenge Mode）</strong>，也就是{" "}
        <strong>Geoguessr challenge links</strong>。<br />
        這些連結無需登入帳號、不限時間，完全免費。<br />
        <br />
        每一個連結包含五個固定題目，所有人在同一天看到的題目內容相同。<br />
        本站每日更新世界、台灣、日本等主題的挑戰連結，適合練習與比分。<br />
        過去的連結不會失效（除非官方變動），實測五年前產生的連結依然可以正常遊玩。
      </p>

      <CommonTabs
        options={VISIBLE_COUNTRIES}
        selected={selectedCountry}
        onSelect={setSelectedCountry}
      />

      <ChallengeDescription country={selectedCountry} />

      {isLoading && <p className="mt-4">載入中...</p>}
      {isError && <p className="mt-4 text-red-500">資料載入失敗，請稍後再試。</p>}
      {!isLoading && !isError && (
        <CommonMapList entries={filteredEntries} metadataMap={MAP_DISPLAY_TITLES} />
      )}
    </div>
  );
}
