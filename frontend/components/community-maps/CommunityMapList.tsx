// src/components/community-maps/CommunityMapList.tsx
import React from "react";
import MapLinkCard from "@/components/shared/MapLinkCard";

export default function CommunityMapList() {
  return (
    <section>
      <div className="flex flex-wrap gap-4">
        <MapLinkCard
          label="The World"
          url="https://www.geoguessr.com/maps/66014417ff2366aa9a7504df"
          description="新手專用的世界地圖，難度親民，平衡性遠遠優於官方世界地圖。"
        />
        <MapLinkCard
          label="繁榮的台灣"
          url="https://www.geoguessr.com/maps/628ba06e86224535a5956cae"
          description="收錄台灣比較大一點的鄉鎮市區，適合剛接觸遊戲的新手熟悉遊戲模式。"
        />
        <MapLinkCard
          label="室內的台灣"
          url="https://www.geoguessr.com/maps/688b7cbe957ea7281be46179"
          description="由台灣玩家 Giraffe 收錄的台灣室內街景，大約有一百多個地點，是很好玩且適合直播的社群地圖。"
        />
        <MapLinkCard
          label="平衡的台灣"
          url="https://www.geoguessr.com/maps/634ed0789d28f1547612b2cd"
          description="比官方的台灣地圖還要更平衡分佈位置的題庫，但難度也高，台灣人玩起來也會很有挑戰性的地圖。"
        />
        <MapLinkCard
          label="日本の都会"
          url="https://www.geoguessr.com/maps/679df3ca311b366ecb41e41b"
          description="如果你想玩日本地圖，這張圖專門出一些有頭有臉的日本大城市，避開太過偏僻的鄉鎮與市郊。"
        />
        <MapLinkCard
          label="Hong Kong (Full) 香港全圖"
          url="https://www.geoguessr.com/maps/62ada63d0e12bba96e27fe40"
          description="這張圖比官方的香港地圖平衡性更好、覆蓋更全面，如果想玩香港地圖更推薦這張社群地圖。"
        />
      </div>
    </section>
  );
}
