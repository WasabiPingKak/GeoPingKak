// 日本地方區分地圖的配色，地圖與頁面上的卡片共用

/** 地方底色 */
export const regionFill = (hue: number) => `oklch(0.8 0.1 ${hue})`;
/** 地方名稱文字色 */
export const regionInk = (hue: number) => `oklch(0.48 0.13 ${hue})`;

export const MAP_INK = "oklch(0.24 0.01 240)";

// 區碼依第二碼（01X…09X）上色，相鄰的區碼組顏色不同，也避開各地方的底色
const CODE_COLORS: Record<string, string> = {
  "1": "oklch(0.5 0.2 25)",
  "2": "oklch(0.48 0.22 335)",
  "3": "oklch(0.55 0.17 50)",
  "4": "oklch(0.42 0.2 265)",
  "5": "oklch(0.45 0.15 145)",
  "6": "oklch(0.55 0.17 50)",
  "7": "oklch(0.44 0.2 295)",
  "8": "oklch(0.45 0.15 145)",
  "9": "oklch(0.5 0.2 25)",
};

export const codeColor = (code: string) => CODE_COLORS[code.replace(/\D/g, "")[1]] ?? MAP_INK;
