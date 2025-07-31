// hooks/useDailyChallengeData.ts

import { useQuery } from "@tanstack/react-query";
import type { DailyChallengeEntry } from "@/types/daily-challenge";

// ✅ 根據開發或部署環境切換 API base
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export function useDailyChallengeData() {
  return useQuery<DailyChallengeEntry[]>({
    queryKey: ["daily-challenge"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/daily-challenge`);
      if (!res.ok) throw new Error("資料載入失敗");
      return res.json();
    },
    gcTime: 1000 * 60 * 0,
  });
}
