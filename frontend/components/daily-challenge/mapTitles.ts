// components/daily-challenge/mapTitles.ts

export interface MapMetadata {
  title: string;
  description: string;
  source?: string; // 可選，避免 future 錯誤
}

export const MAP_DISPLAY_TITLES: Record<string, MapMetadata> = {
  "world-a": {
    title: "世界地圖 - 都市 (低難度)",
    description: "著重於世界人口集中的大城市，適合新手開始認識國家時入門的地圖。官方對戰模式中在銅牌與銀牌所使用的地圖。",
    source: "66014417ff2366aa9a7504df",
  },
  "world-b": {
    title: "世界地圖 - ACW (高難度)",
    description: "全名為 \"A Community World\" 的官方正式競賽地圖，真正的世界地圖。官方競賽模式中金牌以上的牌位所使用的地圖。",
    source: "62a44b22040f04bd36e8a914",
  },

  // 台灣
  "tw-basic": {
    title: "繁榮的台灣 (極簡單)",
    description: "如果你住在台灣，不太可能沒聽過的城市。不是台灣人的話也不會太難。",
    source: "628ba06e86224535a5956cae",
  },
  "tw-landmark": {
    title: "台灣 (中等難度)",
    description: "平衡分佈的台灣地圖，對台灣人來說也會稍微有難度。",
    source: "634ed0789d28f1547612b2cd",
  },

  // 日本
  "jp-urban": {
    title: "日本の都会 (低難度)",
    description: "日本的市區，台灣人高機率聽過或甚至去過的人口集中大城市。",
    source: "679df3ca311b366ecb41e41b",
  },
  "jp-balanced": {
    title: "日本 (中高難度)",
    description: "平衡分佈的日本地圖，玩下去就知道日本比你想像中大很多。",
    source: "631a309ba54a618fca31960a",
  },

  // 馬來西亞
  "my-main": {
    title: "馬來西亞 (中高難度)",
    description: "平衡分佈的馬來西亞地圖，包含東馬與西馬。",
    source: "634050c7fc09dbb1e6c107c6"
  },

  // 香港
  "hk-main": {
    title: "香港 (中等難度)",
    description: "塞的滿滿的香港，包含新界、九龍與香港島，幾乎每個角落都有。",
    source: "62ada63d0e12bba96e27fe40",
  },
};
