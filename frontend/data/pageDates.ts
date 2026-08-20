// 各頁內容的最後更新日期（YYYY-MM-DD）。
// metadata 的 article:modified_time 與 sitemap 的 lastModified 都從這裡讀，
// 改了頁面內容時只需要更新這一處。
export const PAGE_MODIFIED = {
  "/": "2026-03-21",
  "/about": "2026-03-25",
  "/community-maps": "2026-03-21",
  "/daily-challenge": "2026-04-22",
  "/glossary": "2026-03-28",
  "/qna": "2026-03-21",
  "/quick-reference": "2026-03-28",
  "/quick-reference/br": "2026-03-28",
  "/quick-reference/id": "2026-03-28",
  "/recommend_settings": "2026-03-28",
  "/show-proposals": "2025-08-14",
  "/source": "2026-03-21",
  "/special-maps": "2026-03-27",
  "/tutorial/driving-side": "2026-03-21",
  "/tutorial/flags-domains": "2026-03-21",
  "/tutorial/intro": "2026-03-21",
  "/tutorial/license-plates": "2026-03-21",
  "/tutorial/street-coverage": "2026-03-21",
  "/tutorial/sun-position": "2026-03-21",
} as const;

export type PagePath = keyof typeof PAGE_MODIFIED;
