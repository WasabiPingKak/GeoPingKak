import { useQuery } from '@tanstack/react-query';

/**
 * 影片連結介面
 */
interface VideoLink {
  livestream?: string;
  explanation?: string;
}

/**
 * 影片說明資料介面
 *
 * 結構:
 * {
 *   "2026-01-15": {
 *     "tw-urban": {
 *       "livestream": "https://...",
 *       "explanation": "https://..."
 *     }
 *   }
 * }
 */
export interface VideoExplanations {
  [date: string]: {
    [mapId: string]: VideoLink;
  };
}

/**
 * 使用影片說明資料的 Hook
 *
 * 從 API 取得所有日期的影片連結資料
 *
 * @returns React Query 結果，包含 data, isLoading, error 等
 *
 * @example
 * ```tsx
 * const { data: videoExplanations, isLoading, error } = useVideoExplanations();
 *
 * if (isLoading) return <div>載入中...</div>;
 * if (error) return <div>載入失敗</div>;
 *
 * const videoData = videoExplanations?.['2026-01-15']?.['tw-urban'];
 * ```
 */
export function useVideoExplanations() {
  return useQuery<VideoExplanations>({
    queryKey: ['video-explanations'],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE}/api/video-explanations`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch video explanations');
      }

      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 分鐘快取
    refetchOnWindowFocus: false,
  });
}
