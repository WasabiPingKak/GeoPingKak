// 各頁的發佈日與最後更新日（YYYY-MM-DD）。
// metadata 的 article:published_time / article:modified_time、sitemap 的 lastModified、
// JSON-LD 的 datePublished / dateModified 都從這裡讀，改了頁面內容只需要更新這一處。
export const PAGE_DATES = {
  "/": { published: "2025-07-29", modified: "2026-08-22" },
  "/about": { published: "2026-03-25", modified: "2026-03-25" },
  "/community-maps": { published: "2025-09-17", modified: "2026-03-21" },
  "/daily-challenge": { published: "2025-07-29", modified: "2026-04-22" },
  "/glossary": { published: "2025-12-15", modified: "2026-03-28" },
  "/qna": { published: "2025-08-13", modified: "2026-08-22" },
  "/quick-reference": { published: "2026-01-21", modified: "2026-03-28" },
  "/quick-reference/br": { published: "2025-11-09", modified: "2026-03-28" },
  "/quick-reference/id": { published: "2025-11-09", modified: "2026-03-28" },
  "/recommend_settings": { published: "2025-07-31", modified: "2026-03-28" },
  "/show-proposals": { published: "2025-07-31", modified: "2025-08-14" },
  "/source": { published: "2025-07-31", modified: "2026-03-21" },
  "/special-maps": { published: "2025-07-31", modified: "2026-03-27" },
  "/tutorial/driving-side": { published: "2026-01-24", modified: "2026-03-21" },
  "/tutorial/flags-domains": { published: "2026-01-24", modified: "2026-03-21" },
  "/tutorial/intro": { published: "2026-01-24", modified: "2026-03-21" },
  "/tutorial/license-plates": { published: "2026-01-24", modified: "2026-03-21" },
  "/tutorial/street-coverage": { published: "2026-01-24", modified: "2026-03-21" },
  "/tutorial/sun-position": { published: "2026-01-24", modified: "2026-03-21" },
} as const;

export type PagePath = keyof typeof PAGE_DATES;

// Google 的結構化資料要完整的 ISO 8601 日期時間並附時區，
// 只寫 YYYY-MM-DD 會被 Rich Results Test 標成「datetime 值無效」「缺少時區」。
// 本站內容以台灣時間為準，一律補成當天 00:00 (+08:00)。
export function toIsoDateTime(date: string): string {
  return `${date}T00:00:00+08:00`;
}
