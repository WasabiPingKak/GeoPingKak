export type PlateInfo = {
  country: string;
  image: string;
  description: string[];
};

export const EURO_YELLOW_PLATES: PlateInfo[] = [
  {
    country: "英國",
    image: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/uk_plate.jpg?v=20250808",
    description: [
      "英國車牌為前白後黃的配色，",
      "是少數前後顏色不同的設計之一。",
      "※ 英國已退出歐盟，因此現今車牌可能沒有藍色歐盟邊框，但前白後黃的配色仍維持不變。"
    ],
  },
  {
    country: "法國",
    image: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/fr_y_plate.jpg?v=20250808",
    description: [
      "部分舊款法國車牌同樣採前白後黃的配色，與英國相似，",
      "也是少數前後顏色不同的設計之一。",
      "※ 注意：法國車牌共有三種主要樣式，包括前後皆白色的款式，以及左右雙藍條的版本。"
    ],
  },
  {
    country: "丹麥",
    image: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/denmark_plate.png?v=20250808",
    description: [
      "丹麥車牌只有商用車的車牌是全黃色，",
      "但有一種一部分黃色的 Parrot 車牌，",
      "一般的車為標準歐盟配色，雖然外面有一圈紅邊，但打碼之後幾乎看不到。"
    ],
  },
  {
    country: "荷蘭",
    image: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/netherlands_plate.png?v=20250808",
    description: [
      "荷蘭車牌為黃底，前後皆為黃色。",
    ],
  },
  {
    country: "盧森堡",
    image: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/luxembourg_plate.png?v=20250808",
    description: [
      "盧森堡的車牌為黃底，前後皆為黃色。",
    ],
  },
];

export const EURO_DOUBLE_STRIPE_PLATES: PlateInfo[] = [
  {
    country: "法國",
    image: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/france_plate.png?v=20250808",
    description: [
      "法國車牌的特色是左右兩側皆有藍條，",
      "舊的法國車牌為歐盟標準樣式，",
      "也就是只有一個藍條。",
      "※ 注意：包含黃底車牌，法國的車牌總共有三種樣式。",
    ],
  },
  {
    country: "義大利",
    image: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/italy_plate.png?v=20250808",
    description: [
      "義大利車牌左右兩側皆有藍色條紋，",
      "而前車牌比後車牌更短，",
      "※ 這是區分法國與阿爾巴尼亞車牌的重要線索，這兩國也使用雙藍條設計，但前後車牌的長度是相同的。"
    ],
  },
  {
    country: "阿爾巴尼亞",
    image: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/albania_plate.jpg?v=20250808",
    description: [
      "阿爾巴尼亞常見的車牌有兩種樣式，",
      "一種是紅色條紋，一種是雙邊藍色條紋。"
    ],
  },
  {
    country: "葡萄牙",
    image: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/portugal_plate.png?v=20250808",
    description: [
      "葡萄牙車牌右邊的條紋是黃色的。",
      "※ 這個車牌樣式在世界上是唯一的。"
    ],
  },
];

export const EURO_SPECIAL_PLATES: PlateInfo[] = [
  {
    country: "挪威",
    image: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/norway_plate.jpg?v=20250808",
    description: [
      "挪威並非歐盟成員國，因此有機會看到沒有藍邊、純白底的車牌。",
      "挪威的商用車牌是墨綠色的，辨識度相當高。"
    ],
  },
  {
    country: "比利時",
    image: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/belgium_plate.png?v=20250808",
    description: [
      "比利時車牌為白底紅字，風格在歐洲相當少見。",
      "打碼後整個車牌會呈現淡紅色，是辨識度很高的車牌之一。"
    ],
  },
];
