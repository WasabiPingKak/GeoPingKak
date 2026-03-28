// hooks/useDailyChallengeData.ts

import { useQuery } from "@tanstack/react-query";
import type { DailyChallengeEntry } from "@/types/map-entry";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

/** 取得所有已存在的月份列表 */
export function useDailyChallengeMonths() {
  return useQuery<string[], Error>({
    queryKey: ["daily-challenge-months"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/daily-challenge/months`);
      if (!res.ok) throw new Error("月份列表載入失敗");
      return res.json();
    },
  });
}

/** 取得指定月份的每日挑戰資料（enabled 控制是否發送請求） */
export function useDailyChallengeMonth(month: string, enabled: boolean) {
  return useQuery<DailyChallengeEntry[], Error>({
    queryKey: ["daily-challenge", month],
    queryFn: async () => {
      const res = await fetch(
        `${API_BASE}/api/daily-challenge?month=${month}`
      );
      if (!res.ok) throw new Error("資料載入失敗");
      return res.json();
    },
    enabled,
  });
}
