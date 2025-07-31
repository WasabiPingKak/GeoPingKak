// hooks/useSpecialMapData.ts

import { useQuery } from "@tanstack/react-query";
import type { DailyChallengeEntry } from "@/types/map-entry";

// ✅ 根據環境切換 API base（與 daily-challenge 相同）
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

export function useSpecialMapData() {
  return useQuery<DailyChallengeEntry[]>({
    queryKey: ["special-maps"],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/api/special-map`);
      if (!res.ok) throw new Error("資料載入失敗");
      return res.json();
    },
    gcTime: 1000 * 60 * 5, // 5 分鐘快取
  });
}
