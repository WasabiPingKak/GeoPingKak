"use client";

import React, { useEffect, useState } from "react";
import CommonTabs from "@/components/shared/CommonTabs";
import CommonMapList from "@/components/shared/CommonMapList";
import SpecialCategoryDescription from "@/components/special-maps/SpecialCategoryDescription";
import { SPECIAL_MAP_TITLES } from "@/components/special-maps/specialMapTitles";
import { useSpecialMapData } from "@/hooks/useSpecialMapData";

export default function SpecialMapsPage() {
  const { data: entries = [], isLoading, isError } = useSpecialMapData();
  const categories = Array.from(new Set(entries.map((e) => e.country)));
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ 資料載入後第一次設定 selectedCategory
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);

  const filteredEntries = entries.filter((e) => e.country === selectedCategory);

  return (
    <div className="max-w-4xl">
      <h1 className="text-3xl font-bold mb-4">🧭 特殊主題地圖</h1>
      <p className="mb-6 text-muted-foreground">
        由我親自手選的特別題庫，規則與每日題目相同，每一個連結都是固定的五題。<br />
        🚧題目還在編輯，數量眾多，完成後會一次放上來。
      </p>

      {isLoading ? (
        <p className="text-muted-foreground">載入中…</p>
      ) : isError ? (
        <p className="text-destructive">無法載入資料，請稍後再試。</p>
      ) : (
        <>
          <CommonTabs
            options={categories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <SpecialCategoryDescription category={selectedCategory} />

          <CommonMapList
            entries={filteredEntries}
            metadataMap={SPECIAL_MAP_TITLES}
            showSourceLink={false}
          />
        </>
      )}
    </div>
  );
}
