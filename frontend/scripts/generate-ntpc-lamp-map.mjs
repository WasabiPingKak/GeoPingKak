// 產生 /quick-reference/tw 新北市路燈編號地圖的 SVG 資料。
//
// 輸入：
//   scripts/data/tw-towns.topo.json   鄉鎮市區界（taiwan-atlas@2021.9.20，內政部國土測繪中心資料）
//   scripts/data/ntpc-lamp-stats.json 各區燈桿編號統計（由 scripts/build-ntpc-lamp-stats.mjs 產生）
// 輸出：components/quick-reference/tw/ntpcLampMapData.ts
//
// 用法（在 frontend/ 底下）：node scripts/generate-ntpc-lamp-map.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { geoMercator, geoPath } from "d3-geo";
import { feature, merge, mesh } from "topojson-client";
import {
  innerPoint,
  planarLinePath,
  planarPath,
  projectTopologyArcs,
  ringArea,
  round,
} from "./lib/svg-map.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const TOPO_PATH = join(here, "data", "tw-towns.topo.json");
const STATS_PATH = join(here, "data", "ntpc-lamp-stats.json");
const OUT_PATH = join(here, "..", "components", "quick-reference", "tw", "ntpcLampMapData.ts");

const COUNTY = "新北市";
// 周邊縣市畫成灰底，讓人看得出相對位置
// 名稱照 tw-towns.topo.json 的寫法（台北市、台中市用「台」）
const NEIGHBORS = ["台北市", "基隆市", "桃園市", "宜蘭縣"];

const WIDTH = 1600;
// 地圖四周留白（SVG 單位）。上方留給標題
const PAD = { top: 200, right: 40, bottom: 40, left: 40 };
const SIMPLIFY_TOLERANCE = 0.8;
const MIN_POLYGON_AREA = 8;
// 前兩碼占該區 6 位數燈桿 1% 以上才列出，排除零星的跨區編號
const MIN_PREFIX_SHARE = 0.01;
// 只有 0～6 劃分區塊，7、8、9 是零星或特殊單位的編號
const ZONE_DIGITS = ["0", "1", "2", "3", "4", "5", "6"];

// 標籤位置覆寫 [經度, 緯度]，沒列的用該區最大一塊的最內部位置
const ANCHOR = {
  林口區: [121.325, 25.105],
  新莊區: [121.449, 25.049],
};
// 區太小放不下標籤，拉一條引線到外面 [經度, 緯度, 對齊方向]。三重、永和拉到台北市的灰底上
const CALLOUT = {
  三重區: [121.524, 25.068, "start"],
  永和區: [121.546, 25.018, "start"],
};
// 第一碼大字的位置覆寫 [經度, 緯度]，避開區名標籤
const DIGIT_AT = {
  2: [121.415, 25.015],
  3: [121.387, 25.123],
  4: [121.479, 25.227],
};
// 周邊縣市名稱位置 [經度, 緯度]
const NEIGHBOR_AT = {
  台北市: [121.539, 25.141],
  基隆市: [121.72, 25.12],
  桃園市: [121.3, 24.9],
  宜蘭縣: [121.88, 24.75],
};

// ---- 讀資料 ----
const topo = JSON.parse(readFileSync(TOPO_PATH, "utf8"));
const stats = JSON.parse(readFileSync(STATS_PATH, "utf8"));

const isNtpc = (g) => g.properties.COUNTYNAME === COUNTY;
const townGeoms = topo.objects.towns.geometries.filter(isNtpc);
const ntpcGeo = feature(topo, {
  type: "GeometryCollection",
  geometries: topo.objects.counties.geometries.filter(isNtpc),
});

// 地圖高度依新北市的形狀決定
const probe = geoMercator().fitWidth(WIDTH - PAD.left - PAD.right, ntpcGeo);
const [[, y0], [, y1]] = geoPath(probe).bounds(ntpcGeo);
const HEIGHT = Math.round(y1 - y0 + PAD.top + PAD.bottom);
const proj = geoMercator().fitExtent(
  [
    [PAD.left, PAD.top],
    [WIDTH - PAD.right, HEIGHT - PAD.bottom],
  ],
  ntpcGeo,
);
const P = (ll) => proj(ll);
const pt = ([x, y]) => ({ x: round(x), y: round(y) });

const planar = projectTopologyArcs(topo, proj, SIMPLIFY_TOLERANCE);

const polygonsOf = (geom) =>
  geom.type === "Polygon" ? [geom.coordinates] : geom.type === "MultiPolygon" ? geom.coordinates : [];
// 去掉太小的離島，避免路徑裡一堆看不見的碎點
const cleanPolygons = (geom) =>
  polygonsOf(geom).filter((p) => p[0].length >= 4 && ringArea(p[0]) >= MIN_POLYGON_AREA);
const shapePath = (geom) => planarPath({ type: "MultiPolygon", coordinates: cleanPolygons(geom) });
const largest = (geom) =>
  cleanPolygons(geom).sort((a, b) => ringArea(b[0]) - ringArea(a[0]))[0];

// ---- 各區統計 ----
function mainDigit(town) {
  const t = stats.towns[town];
  const [d, n] = Object.entries(t.digits)
    .filter(([k]) => ZONE_DIGITS.includes(k))
    .sort((a, b) => b[1] - a[1])[0];
  return { digit: d, share: round((n / t.total) * 100) };
}

/**
 * 把用到的前兩碼寫成「00–03」「16」這種格式，多段用頓號分開。
 * 只看 0～6 開頭，7～9 開頭的零星編號另外說明
 */
function prefixRanges(town) {
  const c = stats.towns[town].prefixes;
  const sum = Object.entries(c)
    .filter(([k]) => ZONE_DIGITS.includes(k[0]))
    .reduce((a, [, v]) => a + v, 0);
  const ps = Object.entries(c)
    .filter(([k, v]) => ZONE_DIGITS.includes(k[0]) && v / sum >= MIN_PREFIX_SHARE)
    .map(([k]) => Number(k))
    .sort((a, b) => a - b);
  const runs = [];
  let start = ps[0];
  ps.forEach((p, i) => {
    if (ps[i + 1] !== p + 1) {
      const a = String(start).padStart(2, "0");
      const b = String(p).padStart(2, "0");
      runs.push(start === p ? a : `${a}–${b}`);
      start = ps[i + 1];
    }
  });
  return runs;
}

// ---- 各區形狀與標籤 ----
const planarTowns = feature(planar, {
  type: "GeometryCollection",
  geometries: townGeoms,
}).features;

const districts = planarTowns.map((f) => {
  const name = f.properties.TOWNNAME;
  if (!stats.towns[name]) throw new Error(`${name} 沒有路燈統計資料`);
  const { digit, share } = mainDigit(name);
  const entry = {
    name,
    digit,
    total: stats.towns[name].total,
    share,
    prefixes: prefixRanges(name),
    d: shapePath(f.geometry),
  };
  const inner = innerPoint(largest(f.geometry));
  if (CALLOUT[name]) {
    const [lon, lat, align] = CALLOUT[name];
    const [tx, ty] = P([lon, lat]);
    const left = align ? align === "end" : tx < inner[0];
    entry.label = { ...pt([tx + (left ? -6 : 6), ty]), anchor: left ? "end" : "start" };
    entry.callout = { from: [round(inner[0]), round(inner[1])], to: [round(tx), round(ty)] };
  } else {
    entry.label = { ...pt(ANCHOR[name] ? P(ANCHOR[name]) : inner), anchor: "middle" };
  }
  return entry;
});
districts.sort((a, b) => a.prefixes[0].localeCompare(b.prefixes[0]));

// ---- 第一碼大區：合併外框與大字位置 ----
const digitOf = Object.fromEntries(districts.map((d) => [d.name, d.digit]));
const zones = ZONE_DIGITS.map((digit) => {
  const members = townGeoms.filter((g) => digitOf[g.properties.TOWNNAME] === digit);
  const merged = merge(planar, members);
  return {
    digit,
    towns: districts.filter((d) => d.digit === digit).map((d) => d.name),
    label: pt(DIGIT_AT[digit] ? P(DIGIT_AT[digit]) : innerPoint(largest(merged), 6)),
  };
});

// 邊界線：不同第一碼之間（含新北市外緣）畫粗線，同一碼的區與區之間畫細線
const townsObj = { type: "GeometryCollection", geometries: townGeoms };
const zoneOf = (g) => digitOf[g.properties.TOWNNAME];
const borders = {
  zone: planarLinePath(mesh(planar, townsObj, (a, b) => a === b || zoneOf(a) !== zoneOf(b))),
  town: planarLinePath(mesh(planar, townsObj, (a, b) => a !== b && zoneOf(a) === zoneOf(b))),
};

// ---- 周邊縣市 ----
const neighbors = feature(planar, {
  type: "GeometryCollection",
  geometries: topo.objects.counties.geometries.filter((g) =>
    NEIGHBORS.includes(g.properties.COUNTYNAME),
  ),
}).features.map((f) => ({
  name: f.properties.COUNTYNAME,
  d: shapePath(f.geometry),
  label: pt(P(NEIGHBOR_AT[f.properties.COUNTYNAME])),
}));

// ---- 7、8、9 開頭（不劃區）----
const extras = ["7", "8", "9"].map((digit) => ({
  digit,
  count: stats.digits[digit] ?? 0,
  // town 欄位裡的值與筆數，例如 { 高灘地: 16520, 水利局: 1813 }
  towns: Object.fromEntries(
    Object.entries(stats.towns)
      .map(([town, t]) => [town, t.digits[digit] ?? 0])
      .filter(([, n]) => n > 0)
      .sort((a, b) => b[1] - a[1]),
  ),
}));

const summary = {
  total: stats.total,
  digits: stats.digits,
  fiveDigit: stats.lengths["5"] ?? 0,
};

// ---- 輸出 ----
const ts = `// 此檔由 scripts/generate-ntpc-lamp-map.mjs 產生，請勿手動修改。

export type LampDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6";

export interface NtpcDistrict {
  name: string;
  /** 該區燈桿編號最常見的第一碼 */
  digit: LampDigit;
  /** 路燈總數 */
  total: number;
  /** 第一碼為 digit 的比例（%） */
  share: number;
  /** 用到的前兩碼，例如 ["00–03"] */
  prefixes: string[];
  /** SVG 路徑 */
  d: string;
  label: { x: number; y: number; anchor: "start" | "middle" | "end" };
  /** 區太小時從區中心拉引線到標籤 */
  callout?: { from: [number, number]; to: [number, number] };
}

export interface NtpcZone {
  digit: LampDigit;
  towns: string[];
  /** 第一碼大字位置 */
  label: { x: number; y: number };
}

export const NTPC_MAP_SIZE = { width: ${WIDTH}, height: ${HEIGHT} } as const;

export const NTPC_LAMP_SUMMARY = ${JSON.stringify(summary, null, 2)};

export const NTPC_ZONES: NtpcZone[] = ${JSON.stringify(zones, null, 2)};

export const NTPC_EXTRA_DIGITS = ${JSON.stringify(extras, null, 2)};

export const NTPC_DISTRICTS: NtpcDistrict[] = ${JSON.stringify(districts, null, 2)};

export const NTPC_BORDERS = ${JSON.stringify(borders, null, 2)};

export const NTPC_NEIGHBORS = ${JSON.stringify(neighbors, null, 2)};
`;
writeFileSync(OUT_PATH, ts.replace(/\r\n/g, "\n"), "utf8");
console.log(`wrote ${OUT_PATH} (${(ts.length / 1024).toFixed(1)} KB)，地圖 ${WIDTH}×${HEIGHT}`);
