// components/daily-challenge/ChallengeDescription.tsx

import React from "react";

interface ChallengeDescriptionProps {
  country: string;
}

export default function ChallengeDescription({ country }: ChallengeDescriptionProps) {
  const countrySpecific: Record<string, string> = {
    世界: "世界系列包含兩張不同難度的地圖，適合所有程度的玩家。",
    台灣: "台灣系列地圖是給完全無經驗的新手試水溫的地圖，讓你可以從本土出發熟悉這個遊戲。",
    日本: "日本是東亞大家都相當熟悉的國家，不少人曾經去生活或旅遊過，不陌生但有一點難度的地圖。",
    馬來西亞: "",
    香港: "",
  };

  const countrySpecific2: Record<string, string> = {
    世界: "左邊的都市地圖為官方牌位模式中在銅牌與銀牌所使用的地圖，右邊的 ACW 為官方牌位模式中金牌以上的牌位所使用的地圖。",
    台灣: " ",
    日本: " ",
    馬來西亞: " ",
    香港: " ",
  };

  const UpadateAt: Record<string, string> = {
    世界: "※ 每日凌晨 3:00 追加當日題目。",
    台灣: "※ 每日凌晨 3:01 追加當日題目。",
    日本: "※ 每週 二、四、六、日 凌晨 3:02 追加當日題目。",
    馬來西亞: "",
    香港: "",
  };
  return (
    <div className="mb-6 text-sm text-muted-foreground">
      <p>{countrySpecific[country] || ""}</p>
      <div className="min-h-[1.25rem]">
        {countrySpecific2[country] || ""}
      </div>
      <p className="mt-3">{UpadateAt[country] || ""}</p>
    </div>
  );
}
