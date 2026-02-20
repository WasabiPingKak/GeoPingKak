// 街景覆蓋資料 — 單一資料來源
// 更新街景覆蓋狀態時，只需修改此檔案

export type CoverageStatus = "full" | "limited" | "none";

export interface CoverageCountry {
  id: string;             // ISO 3166-1 numeric code（對應 TopoJSON geometry.id）
  nameTw: string;         // 繁體中文名
  status: CoverageStatus;
  note?: string;          // 備註（tooltip 顯示）
}

export interface SmallNationMarker {
  id: string;
  nameTw: string;
  status: CoverageStatus;
  coordinates: [number, number]; // [經度, 緯度]
  note?: string;
}

export type RegionKey =
  | "world" | "asia" | "europe" | "northAmerica"
  | "southAmerica" | "caribbean" | "oceania" | "africa";

export interface RegionConfig {
  key: RegionKey;
  titleTw: string;
  center: [number, number];
  scale: number;
  countries: CoverageCountry[];
  smallNations: SmallNationMarker[];
}

// 配色
export const COVERAGE_COLORS: Record<CoverageStatus, string> = {
  full: "#1d7374",
  limited: "#39e5e5",
  none: "#71717a",
};

export const COVERAGE_LABELS: Record<CoverageStatus, string> = {
  full: "完整街景",
  limited: "有限街景",
  none: "沒有街景",
};

// 未列入任何區域的國家預設顏色（地圖背景）
export const DEFAULT_COUNTRY_COLOR = "#27272a"; // zinc-800

// ============================================================
// 各國覆蓋資料
// id = ISO 3166-1 numeric code (string)
// ============================================================

// ----- 亞洲 -----
const asiaCountries: CoverageCountry[] = [
  // 東亞
  { id: "392", nameTw: "日本", status: "full" },
  { id: "410", nameTw: "韓國", status: "full" },
  { id: "158", nameTw: "台灣", status: "full" },
  { id: "496", nameTw: "蒙古", status: "full" },
  { id: "156", nameTw: "中國", status: "limited", note: "室內博物館，數量非常少" },
  { id: "408", nameTw: "北韓", status: "none" },
  // 東南亞
  { id: "764", nameTw: "泰國", status: "full" },
  { id: "116", nameTw: "柬埔寨", status: "full" },
  { id: "418", nameTw: "寮國", status: "full" },
  { id: "704", nameTw: "越南", status: "full" },
  { id: "360", nameTw: "印尼", status: "full" },
  { id: "458", nameTw: "馬來西亞", status: "full" },
  { id: "608", nameTw: "菲律賓", status: "full" },
  { id: "702", nameTw: "新加坡", status: "full" },
  { id: "104", nameTw: "緬甸", status: "none" },
  { id: "096", nameTw: "汶萊", status: "none" },
  { id: "626", nameTw: "東帝汶", status: "none" },
  // 南亞
  { id: "356", nameTw: "印度", status: "full" },
  { id: "144", nameTw: "斯里蘭卡", status: "full" },
  { id: "050", nameTw: "孟加拉", status: "full" },
  { id: "064", nameTw: "不丹", status: "full" },
  { id: "524", nameTw: "尼泊爾", status: "full" },
  { id: "586", nameTw: "巴基斯坦", status: "limited", note: "僅拉合爾(Lahore)少量街景" },
  { id: "004", nameTw: "阿富汗", status: "limited", note: "聽說在一個巷子裡，這輩子沒見過" },
  // 中亞
  { id: "398", nameTw: "哈薩克", status: "full" },
  { id: "417", nameTw: "吉爾吉斯", status: "full" },
  { id: "762", nameTw: "塔吉克", status: "none" },
  { id: "860", nameTw: "烏茲別克", status: "none" },
  { id: "795", nameTw: "土庫曼", status: "none" },
  // 西亞 / 中東
  { id: "792", nameTw: "土耳其", status: "full" },
  { id: "376", nameTw: "以色列", status: "full" },
  { id: "400", nameTw: "約旦", status: "full" },
  { id: "422", nameTw: "黎巴嫩", status: "full" },
  { id: "784", nameTw: "阿聯酋", status: "full" },
  { id: "634", nameTw: "卡達", status: "full" },
  { id: "512", nameTw: "阿曼", status: "full" },
  { id: "682", nameTw: "沙烏地阿拉伯", status: "none" },
  { id: "414", nameTw: "科威特", status: "none" },
  { id: "368", nameTw: "伊拉克", status: "limited", note: "僅巴格達國家博物館中庭與室內" },
  { id: "364", nameTw: "伊朗", status: "full" },
  { id: "760", nameTw: "敘利亞", status: "none" },
  { id: "887", nameTw: "葉門", status: "none" },
  { id: "275", nameTw: "巴勒斯坦", status: "full" },
  // 高加索
  { id: "268", nameTw: "喬治亞", status: "full" },
  { id: "051", nameTw: "亞美尼亞", status: "full" },
  { id: "031", nameTw: "亞塞拜然", status: "full" },
];

const asiaSmallNations: SmallNationMarker[] = [
  { id: "096", nameTw: "汶萊", status: "none", coordinates: [114.9, 4.9] },
  { id: "702", nameTw: "新加坡", status: "full", coordinates: [103.8, 1.35] },
];

// ----- 歐洲 -----
const europeCountries: CoverageCountry[] = [
  { id: "826", nameTw: "英國", status: "full" },
  { id: "372", nameTw: "愛爾蘭", status: "full" },
  { id: "352", nameTw: "冰島", status: "full" },
  { id: "578", nameTw: "挪威", status: "full" },
  { id: "752", nameTw: "瑞典", status: "full" },
  { id: "246", nameTw: "芬蘭", status: "full" },
  { id: "208", nameTw: "丹麥", status: "full" },
  { id: "276", nameTw: "德國", status: "full" },
  { id: "250", nameTw: "法國", status: "full" },
  { id: "724", nameTw: "西班牙", status: "full" },
  { id: "620", nameTw: "葡萄牙", status: "full" },
  { id: "380", nameTw: "義大利", status: "full" },
  { id: "756", nameTw: "瑞士", status: "full" },
  { id: "040", nameTw: "奧地利", status: "full" },
  { id: "056", nameTw: "比利時", status: "full" },
  { id: "528", nameTw: "荷蘭", status: "full" },
  { id: "442", nameTw: "盧森堡", status: "full" },
  { id: "438", nameTw: "列支敦斯登", status: "full" },
  { id: "674", nameTw: "聖馬利諾", status: "full" },
  { id: "492", nameTw: "摩納哥", status: "full" },
  { id: "616", nameTw: "波蘭", status: "full" },
  { id: "203", nameTw: "捷克", status: "full" },
  { id: "703", nameTw: "斯洛伐克", status: "full" },
  { id: "348", nameTw: "匈牙利", status: "full" },
  { id: "642", nameTw: "羅馬尼亞", status: "full" },
  { id: "100", nameTw: "保加利亞", status: "full" },
  { id: "300", nameTw: "希臘", status: "full" },
  { id: "008", nameTw: "阿爾巴尼亞", status: "full" },
  { id: "807", nameTw: "北馬其頓", status: "full" },
  { id: "688", nameTw: "塞爾維亞", status: "full" },
  { id: "499", nameTw: "蒙特內哥羅", status: "full" },
  { id: "191", nameTw: "克羅埃西亞", status: "full" },
  { id: "705", nameTw: "斯洛維尼亞", status: "full" },
  { id: "070", nameTw: "波士尼亞與赫塞哥維納", status: "full" },
  { id: "233", nameTw: "愛沙尼亞", status: "full" },
  { id: "428", nameTw: "拉脫維亞", status: "full" },
  { id: "440", nameTw: "立陶宛", status: "full" },
  { id: "804", nameTw: "烏克蘭", status: "full" },
  { id: "643", nameTw: "俄羅斯", status: "full" },
  { id: "196", nameTw: "賽普勒斯", status: "full", note: "僅島嶼南部的賽普勒斯共和國" },
  { id: "498", nameTw: "摩爾多瓦", status: "none" },
  { id: "112", nameTw: "白俄羅斯", status: "limited", note: "僅首都明斯克河邊的小觀光區域" },
];

const europeSmallNations: SmallNationMarker[] = [
  { id: "442", nameTw: "盧森堡", status: "full", coordinates: [6.13, 49.82] },
  { id: "438", nameTw: "列支敦斯登", status: "full", coordinates: [9.55, 47.14] },
  { id: "674", nameTw: "聖馬利諾", status: "full", coordinates: [12.46, 43.94] },
  { id: "492", nameTw: "摩納哥", status: "full", coordinates: [7.41, 43.74] },
  { id: "234", nameTw: "法羅群島", status: "full", coordinates: [-7.0, 62.0] },
];

// ----- 北美洲 -----
const northAmericaCountries: CoverageCountry[] = [
  { id: "124", nameTw: "加拿大", status: "full" },
  { id: "840", nameTw: "美國", status: "full" },
  { id: "304", nameTw: "格陵蘭", status: "full" },
  { id: "484", nameTw: "墨西哥", status: "full" },
  { id: "320", nameTw: "瓜地馬拉", status: "full" },
  { id: "591", nameTw: "巴拿馬", status: "full" },
  { id: "188", nameTw: "哥斯大黎加", status: "full" },
  { id: "084", nameTw: "貝里斯", status: "none" },
  { id: "222", nameTw: "薩爾瓦多", status: "none" },
  { id: "340", nameTw: "宏都拉斯", status: "none" },
  { id: "558", nameTw: "尼加拉瓜", status: "none" },
];

const northAmericaSmallNations: SmallNationMarker[] = [
  { id: "060", nameTw: "百慕達", status: "full", coordinates: [-64.8, 32.3] },
];

// ----- 南美洲 -----
const southAmericaCountries: CoverageCountry[] = [
  { id: "076", nameTw: "巴西", status: "full" },
  { id: "032", nameTw: "阿根廷", status: "full" },
  { id: "152", nameTw: "智利", status: "full" },
  { id: "858", nameTw: "烏拉圭", status: "full" },
  { id: "600", nameTw: "巴拉圭", status: "full" },
  { id: "068", nameTw: "玻利維亞", status: "full" },
  { id: "604", nameTw: "秘魯", status: "full" },
  { id: "218", nameTw: "厄瓜多", status: "full" },
  { id: "170", nameTw: "哥倫比亞", status: "full" },
  { id: "862", nameTw: "委內瑞拉", status: "none" },
  { id: "328", nameTw: "蓋亞那", status: "none" },
  { id: "740", nameTw: "蘇利南", status: "none" },
];

const southAmericaSmallNations: SmallNationMarker[] = [
  { id: "254", nameTw: "法屬圭亞那", status: "none", coordinates: [-53.1, 3.9], note: "雖屬法國領土，但沒有街景" },
];

// ----- 加勒比海 -----
const caribbeanCountries: CoverageCountry[] = [
  { id: "214", nameTw: "多明尼加", status: "full" },
  { id: "630", nameTw: "波多黎各", status: "full" },
  { id: "332", nameTw: "海地", status: "none" },
  { id: "192", nameTw: "古巴", status: "none" },
  { id: "388", nameTw: "牙買加", status: "none" },
  { id: "780", nameTw: "千里達及托巴哥", status: "none" },
  { id: "044", nameTw: "巴哈馬", status: "none" },
];

const caribbeanSmallNations: SmallNationMarker[] = [
  { id: "850", nameTw: "美屬維京群島", status: "full", coordinates: [-64.9, 18.3] },
  { id: "531", nameTw: "庫拉索", status: "full", coordinates: [-69.0, 12.2] },
];

// ----- 大洋洲 -----
const oceaniaCountries: CoverageCountry[] = [
  { id: "036", nameTw: "澳大利亞", status: "full" },
  { id: "554", nameTw: "紐西蘭", status: "full" },
  { id: "598", nameTw: "巴布亞紐幾內亞", status: "none" },
  { id: "548", nameTw: "萬那杜", status: "limited", note: "僅少數自然景觀處，幾乎不會遇到" },
  { id: "540", nameTw: "新喀里多尼亞", status: "none" },
  { id: "090", nameTw: "所羅門群島", status: "none" },
];

const oceaniaSmallNations: SmallNationMarker[] = [
  { id: "580", nameTw: "北馬利安那群島", status: "full", coordinates: [145.7, 15.2] },
  { id: "316", nameTw: "關島", status: "full", coordinates: [144.8, 13.4] },
  { id: "548", nameTw: "萬那杜", status: "limited", coordinates: [168.3, -17.7], note: "僅少數自然景觀處，幾乎不會遇到" },
  { id: "162", nameTw: "聖誕島", status: "full", coordinates: [105.7, -10.5] },
  { id: "166", nameTw: "科科斯群島", status: "full", coordinates: [96.8, -12.2] },
];

// ----- 非洲 -----
const africaCountries: CoverageCountry[] = [
  // 北非
  { id: "788", nameTw: "突尼西亞", status: "full" },
  { id: "504", nameTw: "摩洛哥", status: "none" },
  { id: "818", nameTw: "埃及", status: "limited", note: "僅亞歷山大港、開羅金字塔附近" },
  { id: "012", nameTw: "阿爾及利亞", status: "none" },
  { id: "434", nameTw: "利比亞", status: "none" },
  // 東非
  { id: "404", nameTw: "肯亞", status: "full" },
  { id: "800", nameTw: "烏干達", status: "full" },
  { id: "646", nameTw: "盧安達", status: "full" },
  { id: "450", nameTw: "馬達加斯加", status: "full" },
  { id: "834", nameTw: "坦桑尼亞", status: "limited", note: "僅貢貝國家公園與吉力馬札羅山" },
  { id: "231", nameTw: "衣索比亞", status: "none" },
  { id: "706", nameTw: "索馬利亞", status: "none" },
  { id: "232", nameTw: "厄利垂亞", status: "none" },
  { id: "262", nameTw: "吉布地", status: "none" },
  { id: "728", nameTw: "南蘇丹", status: "none" },
  { id: "729", nameTw: "蘇丹", status: "none" },
  // 西非
  { id: "686", nameTw: "塞內加爾", status: "full" },
  { id: "288", nameTw: "迦納", status: "full" },
  { id: "566", nameTw: "奈及利亞", status: "full" },
  { id: "466", nameTw: "馬利", status: "limited", note: "僅十段小型徒步拍攝影像，分布在七個地點" },
  { id: "478", nameTw: "茅利塔尼亞", status: "none" },
  { id: "562", nameTw: "尼日", status: "none" },
  { id: "854", nameTw: "布吉納法索", status: "none" },
  { id: "384", nameTw: "象牙海岸", status: "none" },
  { id: "324", nameTw: "幾內亞", status: "none" },
  { id: "624", nameTw: "幾內亞比索", status: "none" },
  { id: "430", nameTw: "賴比瑞亞", status: "none" },
  { id: "694", nameTw: "獅子山", status: "none" },
  { id: "768", nameTw: "多哥", status: "none" },
  { id: "204", nameTw: "貝南", status: "none" },
  { id: "270", nameTw: "甘比亞", status: "none" },
  // 中非
  { id: "120", nameTw: "喀麥隆", status: "none" },
  { id: "140", nameTw: "中非共和國", status: "none" },
  { id: "148", nameTw: "查德", status: "none" },
  { id: "178", nameTw: "剛果共和國", status: "none" },
  { id: "180", nameTw: "剛果民主共和國", status: "none" },
  { id: "266", nameTw: "加彭", status: "none" },
  { id: "226", nameTw: "赤道幾內亞", status: "none" },
  { id: "108", nameTw: "蒲隆地", status: "none" },
  // 南部非洲
  { id: "710", nameTw: "南非", status: "full" },
  { id: "748", nameTw: "史瓦帝尼", status: "full" },
  { id: "426", nameTw: "賴索托", status: "full" },
  { id: "072", nameTw: "波札那", status: "full" },
  { id: "516", nameTw: "納米比亞", status: "full" },
  { id: "024", nameTw: "安哥拉", status: "none" },
  { id: "894", nameTw: "尚比亞", status: "none" },
  { id: "716", nameTw: "辛巴威", status: "none" },
  { id: "508", nameTw: "莫三比克", status: "none" },
  { id: "454", nameTw: "馬拉威", status: "none" },
];

const africaSmallNations: SmallNationMarker[] = [
  { id: "678", nameTw: "聖多美普林西比", status: "full", coordinates: [6.6, 0.2] },
  { id: "638", nameTw: "留尼旺", status: "full", coordinates: [55.5, -21.1] },
];

// ----- 其他地區（僅顯示在世界地圖） -----
const otherCountries: CoverageCountry[] = [
  { id: "010", nameTw: "南極洲", status: "limited", note: "南極半島有少量街景" },
];

// 合併所有國家（世界地圖用）
const allCountries: CoverageCountry[] = [
  ...asiaCountries,
  ...europeCountries,
  ...northAmericaCountries,
  ...southAmericaCountries,
  ...caribbeanCountries,
  ...oceaniaCountries,
  ...africaCountries,
  ...otherCountries,
];

const allSmallNations: SmallNationMarker[] = [
  ...asiaSmallNations,
  ...europeSmallNations,
  ...northAmericaSmallNations,
  ...southAmericaSmallNations,
  ...caribbeanSmallNations,
  ...oceaniaSmallNations,
  ...africaSmallNations,
];

// ============================================================
// 區域設定
// ============================================================

export const REGION_CONFIGS: Record<RegionKey, RegionConfig> = {
  world: {
    key: "world",
    titleTw: "全球街景覆蓋",
    center: [0, 20],
    scale: 147,
    countries: allCountries,
    smallNations: allSmallNations,
  },
  asia: {
    key: "asia",
    titleTw: "亞洲",
    center: [80, 28],
    scale: 450,
    countries: asiaCountries,
    smallNations: asiaSmallNations,
  },
  europe: {
    key: "europe",
    titleTw: "歐洲",
    center: [15, 54],
    scale: 750,
    countries: europeCountries,
    smallNations: europeSmallNations,
  },
  northAmerica: {
    key: "northAmerica",
    titleTw: "北美洲大陸",
    center: [-100, 30],
    scale: 450,
    countries: northAmericaCountries,
    smallNations: northAmericaSmallNations,
  },
  southAmerica: {
    key: "southAmerica",
    titleTw: "南美洲大陸",
    center: [-58, -20],
    scale: 500,
    countries: southAmericaCountries,
    smallNations: southAmericaSmallNations,
  },
  caribbean: {
    key: "caribbean",
    titleTw: "加勒比海島國",
    center: [-72, 18],
    scale: 1500,
    countries: caribbeanCountries,
    smallNations: caribbeanSmallNations,
  },
  oceania: {
    key: "oceania",
    titleTw: "大洋洲",
    center: [148, -22],
    scale: 500,
    countries: oceaniaCountries,
    smallNations: oceaniaSmallNations,
  },
  africa: {
    key: "africa",
    titleTw: "非洲",
    center: [20, 3],
    scale: 450,
    countries: africaCountries,
    smallNations: africaSmallNations,
  },
};
