export type TutorialSection = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
};

export const TUTORIAL_SECTIONS: TutorialSection[] = [
  {
    slug: "intro",
    title: "前言",
    shortTitle: "前言",
    description: "了解 GeoGuessr 的魅力與學習方向，建立正確的推理觀念。",
  },
  {
    slug: "street-coverage",
    title: "街景覆蓋國家",
    shortTitle: "街景覆蓋",
    description: "掌握全球街景覆蓋範圍，快速排除不可能的國家。",
  },
  {
    slug: "flags-domains",
    title: "國旗/網域",
    shortTitle: "國旗/網域",
    description: "透過路邊國旗、廣告與網域後綴辨識國家。",
  },
  {
    slug: "driving-side",
    title: "道路通行方向",
    shortTitle: "通行方向",
    description: "靠左或靠右行駛？這是縮小範圍的重要依據。",
  },
  {
    slug: "sun-position",
    title: "太陽位置",
    shortTitle: "太陽",
    description: "利用太陽方位判斷南北半球與緯度範圍。",
  },
  {
    slug: "license-plates",
    title: "車牌辨識",
    shortTitle: "車牌",
    description: "各國車牌的顏色、形狀與文字特徵完整解析。",
  },
];
