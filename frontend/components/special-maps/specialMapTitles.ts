// components/special-maps/specialMapTitles.ts

export interface MapMetadata {
  title: string;
  description: string;
  source?: string;
}

export const SPECIAL_MAP_TITLES: Record<string, MapMetadata> = {
  "special-tw-pun": {
    title: "台灣諧音招牌",
    description: "要阻止台灣人使用諧音梗已經 Taiwan 了",
    source: "abc123",
  },
  "special-tw-funny": {
    title: "台灣奇怪地名",
    description: "為什麼會有這種地名！",
    source: "abc123",
  },
  "special-other": {
    title: "挖一個欄位空著",
    description: "",
    source: "def456",
  },
};