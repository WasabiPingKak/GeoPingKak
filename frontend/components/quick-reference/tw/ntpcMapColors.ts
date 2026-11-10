// 新北市路燈編號地圖的配色，地圖與頁面上的卡片共用
import type { LampDigit } from "./ntpcLampMapData";

// 各第一碼的 oklch 色相。相鄰大區（2 三重新莊 / 3 蘆洲五股、0 板橋 / 1 永和新店）色相拉開
const DIGIT_HUE: Record<LampDigit, number> = {
  "0": 350,
  "1": 215,
  "2": 100,
  "3": 45,
  "4": 305,
  "5": 145,
  "6": 260,
};

/** 大區底色 */
export const digitFill = (d: LampDigit) => `oklch(0.84 0.1 ${DIGIT_HUE[d]})`;
/** 大區文字色（前兩碼、第一碼大字） */
export const digitInk = (d: LampDigit) => `oklch(0.45 0.14 ${DIGIT_HUE[d]})`;

export const MAP_INK = "oklch(0.24 0.01 240)";
export const MAP_PAPER = "oklch(0.985 0.004 230)";
export const NEIGHBOR_FILL = "oklch(0.92 0.005 240)";
export const NEIGHBOR_INK = "oklch(0.6 0.01 240)";
