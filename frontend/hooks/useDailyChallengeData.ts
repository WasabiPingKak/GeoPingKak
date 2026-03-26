// hooks/useDailyChallengeData.ts

import { useInfiniteQuery } from "@tanstack/react-query";
import type { DailyChallengeEntry } from "@/types/map-entry";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

/**
 * 計算指定偏移量的月份字串
 * offset=0 表示當月，offset=2 表示兩個月前
 */
function getMonthBefore(offset: number): string {
  const now = new Date();
  const target = new Date(now.getFullYear(), now.getMonth() - offset, 1);
  return `${target.getFullYear()}-${String(target.getMonth() + 1).padStart(2, "0")}`;
}

export function useDailyChallengeData() {
  return useInfiniteQuery<DailyChallengeEntry[], Error>({
    queryKey: ["daily-challenge"],
    queryFn: async ({ pageParam }) => {
      const url = pageParam
        ? `${API_BASE}/api/daily-challenge?month=${pageParam}`
        : `${API_BASE}/api/daily-challenge`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("資料載入失敗");
      return res.json();
    },
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage, allPages) => {
      // 如果上一頁是空的，表示沒有更早的資料
      if (lastPage.length === 0) return undefined;
      // 第一頁涵蓋當月+上月（2個月），之後每頁 1 個月
      const monthsLoaded = allPages.length + 1;
      return getMonthBefore(monthsLoaded);
    },
  });
}
