// components/daily-challenge/ChallengeDescription.tsx

import React from "react";

interface ChallengeDescriptionProps {
  country: string;
}

export default function ChallengeDescription({ country }: ChallengeDescriptionProps) {
  const countrySpecific: Record<string, string> = {
    世界: "世界系列包含兩張不同難度的地圖，適合所有程度的玩家。每日更新。",
    台灣: "台灣系列地圖是給完全無經驗的新手試試水溫的地圖，從本土出發熟悉這個遊戲。每日更新",
    日本: "日本是東亞大家都相當熟悉的國家，不少人曾經去生活或旅遊過，不陌生但有一點難度的地圖。每週一、三、五更新",
    馬來西亞: "",
    香港: "",
  };

  return (
    <div className="mb-6 text-sm text-muted-foreground">
      <p>{countrySpecific[country] || ""}</p>
    </div>
  );
}
