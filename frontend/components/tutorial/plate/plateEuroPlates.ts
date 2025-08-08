export type EuroPlateInfo = {
  title: string;
  images: { src: string; alt: string }[];
  descriptions: string[];
};

// 歐盟標準車牌
export const EURO_STANDARD_PLATE: EuroPlateInfo = {
  title: "歐盟標準車牌",
  images: [
    { src: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/spain_plate.png?v=20250808", alt: "歐盟標準車牌範例" },
    { src: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/euro_plate.jpg?v=20250808", alt: "歐盟標準車牌街景" },
  ],
  descriptions: [
    "歐洲車牌的特色是特別細長，長寬比大概是 1:4.7。",
    "尤其是歐盟標準車牌會有一個特色：左邊會有一個藍邊。",
  ],
};

// 非歐盟歐洲車牌
export const EURO_NON_EU_PLATE: EuroPlateInfo = {
  title: "非歐盟歐洲車牌",
  images: [
    { src: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/russia_plate.png?v=20250808", alt: "俄羅斯車牌範例" },
    { src: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/ukraine_plate.jpg?v=20250808", alt: "烏克蘭車牌範例" },
    { src: "https://cdn.jsdelivr.net/gh/WasabiPingKak/GeoPingKak@main/frontend/public/license-plates/eu/non_eu_plate.jpg?v=20250808", alt: "歐洲車牌街景" },
  ],
  descriptions: [
    "俄羅斯車牌多為白底，右側會顯示俄羅斯國旗與地區代碼。",
    "烏克蘭車牌多為白底，左側為藍黃相間的國旗與國家代碼。",
    "但打碼之後通常只會看到一條白色車牌，未必能準確的辨識出來，但沒有藍邊條紋的特徵可以與歐盟區分隔開來。",
  ],
};
