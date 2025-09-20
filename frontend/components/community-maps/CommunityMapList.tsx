// src/components/community-maps/CommunityMapList.tsx
import React from "react";
import MapLinkCard from "@/components/shared/MapLinkCard";

export default function CommunityMapList() {
  return (
    <section className="space-y-10">
      {/* 難度說明區 */}
      <p className="text-lg font-semibold text-white mb-4">
        🟢 簡單　🟡 中等　🔴 困難
      </p>
      {/* 世界地圖 */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">世界地圖</h2>
        <div className="flex flex-wrap gap-4">
          <MapLinkCard
            label="Dumb test"
            url="https://www.geoguessr.com/maps/57357d9f77abe957e8cfd15f"
            description="如同地圖名稱，超級簡單的地圖。"
            difficulty="🟢"
          />
          <MapLinkCard
            label="The World"
            url="https://www.geoguessr.com/maps/66014417ff2366aa9a7504df"
            description="新手專用的世界地圖，難度親民，幾乎只出人口眾多的大城市，平衡性遠遠優於官方世界地圖。"
            difficulty="🟢"
          />
          <MapLinkCard
            label="A Community World"
            url="https://www.geoguessr.com/maps/62a44b22040f04bd36e8a914"
            description="Rank 模式金牌與大師用的競賽地圖，非常平衡分佈的世界地圖。"
            difficulty="🔴"
          />
        </div>
      </div>

      {/* 台灣地圖 */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">台灣地圖</h2>
        <div className="flex flex-wrap gap-4">
          <MapLinkCard
            label="繁榮的台灣"
            url="https://www.geoguessr.com/maps/628ba06e86224535a5956cae"
            description="收錄台灣比較大一點的鄉鎮市區，適合剛接觸遊戲的新手熟悉遊戲模式。"
            difficulty="🟢"
          />
          <MapLinkCard
            label="平衡的台灣"
            url="https://www.geoguessr.com/maps/634ed0789d28f1547612b2cd"
            description="比官方的台灣地圖還要更平衡分佈位置的題庫，但難度也高，台灣人玩起來也會很有挑戰性的地圖。"
            difficulty="🟡"
          />
          <MapLinkCard
            label="室內的台灣"
            url="https://www.geoguessr.com/maps/688b7cbe957ea7281be46179"
            description="大約有一百多個精心挑選過的官方地點，是很好玩且適合直播的社群地圖。"
            difficulty="🟡"
          />
          <MapLinkCard
            label="2009 年的台灣"
            url="https://www.geoguessr.com/maps/689f81606f2ee2d1da9dd93c"
            description="2009 年，Google 在台灣推出了街景服務，當時 iPhone 才出到 3GS，新北市還叫做台北縣。你知道這時候的台灣街景長什麼樣子嗎？"
            difficulty="🟡"
          />
        </div>
      </div>

      {/* 東亞地圖 */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">東亞地圖</h2>
        <div className="flex flex-wrap gap-4">
          <MapLinkCard
            label="日本の都会"
            url="https://www.geoguessr.com/maps/679df3ca311b366ecb41e41b"
            description="如果你想玩日本地圖，這張圖專門出一些有頭有臉的日本大城市，避開太過偏僻的鄉鎮與市郊。"
            difficulty="🟢"
          />
          <MapLinkCard
            label="A Balanced Japan"
            url="https://www.geoguessr.com/maps/631a309ba54a618fca31960a"
            description="平衡分佈的日本地圖，難度偏高，日本的任何角落都會出現。"
            difficulty="🔴"
          />
          <MapLinkCard
            label="Hong Kong (Full) 香港全圖"
            url="https://www.geoguessr.com/maps/62ada63d0e12bba96e27fe40"
            description="這張圖比官方的香港地圖平衡性更好、覆蓋更全面，如果想玩香港地圖更推薦這張社群地圖。"
            difficulty="🟡"
          />
        </div>
      </div>
    </section>
  );
}
