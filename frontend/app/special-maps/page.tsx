"use client";

import React, { useState } from "react";
import CommonTabs from "@/components/shared/CommonTabs";
import CommonMapList from "@/components/shared/CommonMapList";
import SpecialCategoryDescription from "@/components/special-maps/SpecialCategoryDescription";
import { SPECIAL_MAP_TITLES } from "@/components/special-maps/specialMapTitles";
import type { DailyChallengeEntry } from "@/types/map-entry";

// 假資料：實際應由後端回傳符合 DailyChallengeEntry 格式
const SPECIAL_MAP_ENTRIES: DailyChallengeEntry[] = [
  {
    mapId: "special-tw-pun",
    challengeUrl: "https://www.geoguessr.com/challenge/abc123",
    createdAt: "2025-07-30",
    country: "台灣主題",
    title: "諧音招牌"
  },
  {
    mapId: "special-tw-funny",
    challengeUrl: "https://www.geoguessr.com/challenge/abc123",
    createdAt: "2025-07-30",
    country: "台灣主題",
    title: ""
  },
  {
    mapId: "special-other",
    challengeUrl: "https://www.geoguessr.com/challenge/def456",
    createdAt: "2025-07-30",
    country: "其他主題",
    title: ""
  },
];

const SPECIAL_MAP_CATEGORIES = ["台灣主題", "其他主題"];

export default function SpecialMapsPage() {
  const [selectedCategory, setSelectedCategory] = useState(SPECIAL_MAP_CATEGORIES[0]);

  const filteredEntries = SPECIAL_MAP_ENTRIES.filter(
    (entry) => entry.country === selectedCategory
  );

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">🧭 特殊主題地圖</h1>
      <p className="mb-6 text-muted-foreground">
        由我親自手選的特別題庫，與每日題目相同，每一個連結都是固定的五題。
      </p>

      <CommonTabs
        options={SPECIAL_MAP_CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      <SpecialCategoryDescription category={selectedCategory} />

      <CommonMapList
        entries={filteredEntries}
        metadataMap={SPECIAL_MAP_TITLES}
        showSourceLink={false}
      />
    </div>
  );
}
