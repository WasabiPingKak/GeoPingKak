// app/glossary/client.tsx
"use client";

import React, { useMemo, useState } from "react";
import { glossaryEntries } from "@/data/glossary";
import type { GlossaryEntry } from "@/data/glossary";

import GlossaryCard from "./GlossaryCard";
import MarkdownRenderer from "./MarkdownRenderer";

function normalizeForSearch(input: string): string {
  return input.trim().toLowerCase();
}

function buildSearchText(entry: GlossaryEntry): string {
  // 目前搜尋範圍：title + content
  // 未來若新增 aliases/tags，可在這裡擴充
  return `${entry.title}\n${entry.content}`;
}

export default function GlossaryClientPage() {
  const [query, setQuery] = useState("");

  const collator = useMemo(() => {
    // 目標是「看起來像字典排序」即可，不追求注音/筆畫嚴格一致
    return new Intl.Collator("zh-Hant-TW", {
      numeric: true,
      sensitivity: "base",
    });
  }, []);

  const sortedEntries = useMemo(() => {
    return [...glossaryEntries].sort((a, b) => collator.compare(a.title, b.title));
  }, [collator]);

  const filteredEntries = useMemo(() => {
    const q = normalizeForSearch(query);
    if (!q) return sortedEntries;

    return sortedEntries.filter((entry) => {
      const haystack = normalizeForSearch(buildSearchText(entry));
      return haystack.includes(q);
    });
  }, [query, sortedEntries]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">名詞解釋</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          這裡整理常見的 GeoGuessr 相關術語。你可以用搜尋快速定位想看的名詞。
        </p>
      </div>

      {/* Search */}
      <div className="space-y-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜尋名詞或解釋內容（即時）"
          className="w-full rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-zinc-500"
        />
        <div className="text-xs text-muted-foreground">
          {query.trim()
            ? `找到 ${filteredEntries.length} 筆（共 ${sortedEntries.length} 筆）`
            : `共 ${sortedEntries.length} 筆`}
        </div>
      </div>

      {/* List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <div className="border border-zinc-700 bg-zinc-900 rounded-lg p-5">
            <div className="text-white font-semibold mb-1">找不到結果</div>
            <div className="text-sm text-muted-foreground">
              請試試看換個關鍵字，或縮短搜尋字串。
            </div>
          </div>
        ) : (
          filteredEntries.map((entry) => (
            <GlossaryCard key={entry.title} entry={entry}>
              <MarkdownRenderer content={entry.content} />
            </GlossaryCard>
          ))
        )}
      </div>
    </div>
  );
}
