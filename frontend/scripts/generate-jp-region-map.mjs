// 產生 /quick-reference/jp 日本地方區分地圖的 SVG 資料。
//
// 地圖形狀先在這裡投影並簡化好，輸出成 components/quick-reference/jp/jpRegionMapData.ts，
// 頁面直接畫 SVG 路徑，瀏覽器不需要下載地形資料或跑投影。
// 標籤位置沿用原設計稿（doc/日本地方區分地圖重繪）手調過的經緯度。
//
// 用法（在 frontend/ 底下）：node scripts/generate-jp-region-map.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { geoArea, geoCentroid, geoMercator, geoPath } from "d3-geo";
import { feature } from "topojson-client";

const here = dirname(fileURLToPath(import.meta.url));
const TOPO_PATH = join(here, "data", "japan-prefectures.topo.json");
const OUT_PATH = join(here, "..", "components", "quick-reference", "jp", "jpRegionMapData.ts");

const WIDTH = 1600;
const HEIGHT = 1900;
// 簡化容許誤差（SVG 單位）。畫面寬約 800px 時約 0.4px，放大後仍看不出鋸齒
const SIMPLIFY_TOLERANCE = 0.8;
// 面積小於這個值（SVG 單位平方）的小島直接略過
const MIN_POLYGON_AREA = 8;

// 地方：hue 是 oklch 色相，at 是地方名稱的位置 [經度, 緯度]
const REGIONS = [
  { key: "hokkaido", name: "北海道", en: "Hokkaido", hue: 255, ids: [1], at: [144.2, 42.15] },
  { key: "tohoku", name: "東北地方", en: "Tohoku", hue: 150, ids: [2, 3, 4, 5, 6, 7], at: [143.1, 39.2] },
  { key: "kanto", name: "關東地方", en: "Kanto", hue: 185, ids: [8, 9, 10, 11, 12, 13, 14], at: [142.5, 34.95] },
  { key: "chubu", name: "中部地方", en: "Chubu", hue: 225, ids: [15, 16, 17, 18, 19, 20, 21, 22, 23], at: [139.0, 33.7] },
  { key: "kinki", name: "近畿地方", en: "Kansai", hue: 60, ids: [24, 25, 26, 27, 28, 29, 30], at: [134.6, 36.25] },
  { key: "chugoku", name: "中國地方", en: "Chugoku", hue: 25, ids: [31, 32, 33, 34, 35], at: [132.2, 36.1] },
  { key: "shikoku", name: "四國地方", en: "Shikoku", hue: 355, ids: [36, 37, 38, 39], at: [133.3, 32.45] },
  { key: "kyushu", name: "九州地方", en: "Kyushu", hue: 300, ids: [40, 41, 42, 43, 44, 45, 46], at: [129.0, 31.55] },
  { key: "ryukyu", name: "琉球群島", en: "Ryukyu", hue: 90, ids: [47], at: null },
];

const PREF = {
  1: ["北海道", "011–016"], 2: ["青森縣", "017"], 3: ["岩手縣", "019"], 4: ["宮城縣", "022"],
  5: ["秋田縣", "018"], 6: ["山形縣", "023"], 7: ["福島縣", "024"], 8: ["茨城縣", "029"],
  9: ["栃木縣", "028"], 10: ["群馬縣", "027"], 11: ["埼玉縣", "048/049"], 12: ["千葉縣", "043/047"],
  13: ["東京都", "03"], 14: ["神奈川縣", "044/045/046"], 15: ["新潟縣", "025"], 16: ["富山縣", "076"],
  17: ["石川縣", "076"], 18: ["福井縣", "077"], 19: ["山梨縣", "055"], 20: ["長野縣", "026"],
  21: ["岐阜縣", "057/058"], 22: ["靜岡縣", "053/054/055"], 23: ["愛知縣", "052/056"],
  24: ["三重縣", "059"], 25: ["滋賀縣", "077"], 26: ["京都府", "075"], 27: ["大阪府", "06/072"],
  28: ["兵庫縣", "078/079"], 29: ["奈良縣", "074"], 30: ["和歌山縣", "073"], 31: ["鳥取縣", "085"],
  32: ["島根縣", "085"], 33: ["岡山縣", "086"], 34: ["廣島縣", "082/084"], 35: ["山口縣", "083"],
  36: ["德島縣", "088"], 37: ["香川縣", "087"], 38: ["愛媛縣", "089"], 39: ["高知縣", "088"],
  40: ["福岡縣", "092/093/094"], 41: ["佐賀縣", "095"], 42: ["長崎縣", "095"], 43: ["熊本縣", "096"],
  44: ["大分縣", "097"], 45: ["宮崎縣", "098"], 46: ["鹿兒島縣", "099"], 47: ["沖繩縣", "098"],
};

// 標籤位置覆寫 [經度, 緯度]，沒列的用該縣最大一塊陸地的中心
const ANCHOR = {
  1: [142.9, 43.35], 2: [140.85, 40.75], 3: [141.4, 39.6], 4: [140.95, 38.45], 5: [140.35, 39.65],
  6: [140.05, 38.5], 7: [140.2, 37.4], 8: [140.4, 36.28], 9: [139.8, 36.75], 10: [138.95, 36.55],
  12: [140.25, 35.5], 15: [138.85, 37.55], 16: [137.25, 36.62], 18: [136.2, 35.9], 19: [138.6, 35.6],
  20: [138.05, 36.15], 21: [137.05, 35.85], 22: [138.25, 35.05], 24: [136.5, 34.7],
  25: [136.13, 35.24], 26: [135.38, 35.4], 28: [134.8, 35.1], 29: [135.86, 34.36], 30: [135.5, 33.82],
  31: [133.8, 35.4], 32: [132.4, 35.1], 33: [133.8, 34.95], 34: [132.75, 34.6], 35: [131.5, 34.2],
  36: [134.25, 33.92], 38: [132.75, 33.6], 39: [133.35, 33.45], 40: [130.65, 33.55],
  41: [130.1, 33.28], 43: [130.72, 32.68], 44: [131.45, 33.2], 45: [131.32, 32.08], 46: [130.5, 31.55],
};
// 縣太小放不下標籤，拉一條引線到外面 [經度, 緯度, 對齊方向]
const CALLOUT = {
  11: [141.6, 36.1], 13: [141.6, 35.65], 14: [140.1, 34.75], 17: [136.2, 37.0],
  23: [137.15, 34.25, "start"], 27: [135.0, 33.35, "end"], 40: [130.45, 34.0, "end"],
  42: [129.35, 32.95],
};
// 縣名與區碼擠成一行
const COMPACT = { 37: [133.98, 34.24] };
// 北海道另外標出的城市
const CITIES = [
  ["札幌", "011", [141.35, 43.06]],
  ["函館", "013", [140.73, 41.77]],
];
// 沖繩插圖框的位置與大小
const INSET = { x: 1180, y: 1560, w: 360, h: 280 };

const round = (n) => Math.round(n * 10) / 10;

// ---- 讀地形資料 ----
const topo = JSON.parse(readFileSync(TOPO_PATH, "utf8"));
const all = feature(topo, topo.objects.japan).features;

// 略過東京都的離島（小笠原等）、鹿兒島縣的奄美以南、北海道東邊的北方四島外小島
function keepPolygon(id, polygon) {
  const c = geoCentroid({ type: "Polygon", coordinates: polygon });
  if (id === 13 && c[1] < 35) return false;
  if (id === 46 && c[1] < 29.6) return false;
  if (id === 1 && c[0] > 145.55 && geoArea({ type: "Polygon", coordinates: polygon }) < 0.003) {
    return false;
  }
  return true;
}
const polygonsOf = (f) =>
  f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;

// 每個縣要保留哪幾塊（依 feature() 輸出的順序）
const keepIndex = new Map();
for (const f of all) {
  const id = f.properties.id;
  const polys = polygonsOf(f);
  if (id === 47) {
    // 沖繩只畫本島
    keepIndex.set(id, polys.map((p, i) => {
      const [x, y] = geoCentroid({ type: "Polygon", coordinates: p });
      return x > 127.5 && x < 128.5 && y > 26 && y < 27 ? i : -1;
    }).filter((i) => i >= 0));
  } else {
    keepIndex.set(id, polys.map((p, i) => (keepPolygon(id, p) ? i : -1)).filter((i) => i >= 0));
  }
}
const pick = (f) => ({
  ...f,
  geometry: {
    type: "MultiPolygon",
    coordinates: keepIndex.get(f.properties.id).map((i) => polygonsOf(f)[i]),
  },
});
const main = all.filter((f) => f.properties.id !== 47).map(pick);
const okinawa = pick(all.find((f) => f.properties.id === 47));

const proj = geoMercator().fitExtent([[40, 40], [1570, 1860]], {
  type: "FeatureCollection",
  features: main,
});
const insetProj = geoMercator().fitExtent([[30, 30], [160, INSET.h - 30]], okinawa);
const P = (ll) => proj(ll);
const path = geoPath(proj);

// ---- 在拓撲的弧線上投影並簡化，相鄰兩縣共用同一條弧，邊界不會裂開 ----
function decodeArcs(t) {
  const { scale, translate } = t.transform;
  return t.arcs.map((arc) => {
    let x = 0;
    let y = 0;
    return arc.map(([dx, dy]) => {
      x += dx;
      y += dy;
      return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
    });
  });
}

function simplify(points, tolerance) {
  if (points.length <= 2) return points;
  const keep = new Uint8Array(points.length);
  keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop();
    const [ax, ay] = points[a];
    const [bx, by] = points[b];
    const dx = bx - ax;
    const dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let maxD = -1;
    let maxI = -1;
    for (let i = a + 1; i < b; i++) {
      const [px, py] = points[i];
      let d;
      if (len2 === 0) {
        d = Math.hypot(px - ax, py - ay);
      } else {
        d = Math.abs(dy * px - dx * py + bx * ay - by * ax) / Math.sqrt(len2);
      }
      if (d > maxD) {
        maxD = d;
        maxI = i;
      }
    }
    if (maxD > tolerance) {
      keep[maxI] = 1;
      stack.push([a, maxI], [maxI, b]);
    }
  }
  return points.filter((_, i) => keep[i]);
}

function projectTopology(projection) {
  const arcs = decodeArcs(topo).map((arc) =>
    simplify(arc.map((ll) => projection(ll)), SIMPLIFY_TOLERANCE),
  );
  return { type: "Topology", objects: topo.objects, arcs };
}

// 數字取到小數一位，去掉多餘的 0，例如 0.5 → .5、-0.5 → -.5、3.0 → 3
const fmt = (n) => {
  const s = (Math.round(n * 10) / 10).toString();
  return s.replace(/^(-?)0\./, "$1.");
};
// 第一點用絕對座標，之後用相對位移（l），比 d3 預設的絕對座標短很多。
// 先把每個點四捨五入成絕對座標再相減，避免誤差累積
function ringPath(ring) {
  const pts = ring.slice(0, -1).map(([x, y]) => [Math.round(x * 10), Math.round(y * 10)]);
  let out = `M${fmt(pts[0][0] / 10)} ${fmt(pts[0][1] / 10)}l`;
  let prev = pts[0];
  let first = true;
  for (const p of pts.slice(1)) {
    const dx = p[0] - prev[0];
    const dy = p[1] - prev[1];
    if (dx === 0 && dy === 0) continue;
    const part = `${fmt(dx / 10)}${dy < 0 ? "" : " "}${fmt(dy / 10)}`;
    out += first || part.startsWith("-") ? part : ` ${part}`;
    first = false;
    prev = p;
  }
  return `${out}z`;
}
const planarPath = (multi) => multi.coordinates.flatMap((poly) => poly.map(ringPath)).join("");
const ringArea = (ring) => {
  let s = 0;
  for (let i = 0, n = ring.length; i < n; i++) {
    const [x0, y0] = ring[i];
    const [x1, y1] = ring[(i + 1) % n];
    s += x0 * y1 - x1 * y0;
  }
  return Math.abs(s / 2);
};

function shapesFrom(projectedTopo, ids) {
  const out = new Map();
  for (const f of feature(projectedTopo, projectedTopo.objects.japan).features) {
    const id = f.properties.id;
    if (!ids.includes(id)) continue;
    const polys = keepIndex
      .get(id)
      .map((i) => polygonsOf(f)[i])
      .filter((p) => p[0].length >= 4 && ringArea(p[0]) >= MIN_POLYGON_AREA);
    out.set(id, planarPath({ type: "MultiPolygon", coordinates: polys }));
  }
  return out;
}

const mainIds = main.map((f) => f.properties.id);
const mainShapes = shapesFrom(projectTopology(proj), mainIds);
const okinawaShape = shapesFrom(projectTopology(insetProj), [47]).get(47);

// ---- 標籤 ----
const regionOf = {};
for (const r of REGIONS) for (const id of r.ids) regionOf[id] = r.key;

const prefectures = [];
for (const f of main) {
  const id = f.properties.id;
  const [name, code] = PREF[id];
  const biggest = f.geometry.coordinates
    .map((p) => ({ type: "Polygon", coordinates: p }))
    .sort((a, b) => geoArea(b) - geoArea(a))[0];
  const centroid = path.centroid(biggest);
  const entry = { id, name, code, region: regionOf[id], d: mainShapes.get(id) };

  if (COMPACT[id]) {
    const [x, y] = P(COMPACT[id]);
    entry.label = { x: round(x), y: round(y), anchor: "middle", compact: true };
  } else if (CALLOUT[id]) {
    const [tx, ty] = P(CALLOUT[id]);
    const align = CALLOUT[id][2];
    const left = align ? align === "end" : tx < centroid[0];
    entry.label = {
      x: round(tx + (left ? -6 : 6)),
      y: round(ty - 2),
      anchor: left ? "end" : "start",
    };
    entry.callout = {
      from: [round(centroid[0]), round(centroid[1])],
      to: [round(tx), round(ty)],
    };
  } else {
    const [x, y] = ANCHOR[id] ? P(ANCHOR[id]) : centroid;
    entry.label = { x: round(x), y: round(y), anchor: "middle" };
  }
  prefectures.push(entry);
}
prefectures.sort((a, b) => a.id - b.id);

const cities = CITIES.map(([name, code, ll]) => {
  const [x, y] = P(ll);
  return { name, code, x: round(x), y: round(y) };
});

const regions = REGIONS.map((r) => ({
  key: r.key,
  name: r.name,
  en: r.en,
  hue: r.hue,
  ids: r.ids,
  label: r.at ? (([x, y]) => ({ x: round(x), y: round(y) }))(P(r.at)) : null,
}));

const inset = { ...INSET, id: 47, name: PREF[47][0], code: PREF[47][1], d: okinawaShape };

// ---- 輸出 ----
const banner = `// 此檔由 scripts/generate-jp-region-map.mjs 產生，請勿手動修改。\n`;
const ts = `${banner}
export type JpRegionKey =
${regions.map((r) => `  | "${r.key}"`).join("\n")};

export interface JpPrefecture {
  id: number;
  name: string;
  /** 市外電話區碼，多組用 / 分隔 */
  code: string;
  region: JpRegionKey;
  /** SVG 路徑 */
  d: string;
  label: { x: number; y: number; anchor: "start" | "middle" | "end"; compact?: boolean };
  /** 縣太小時從縣中心拉引線到標籤 */
  callout?: { from: [number, number]; to: [number, number] };
}

export interface JpRegion {
  key: JpRegionKey;
  name: string;
  en: string;
  /** oklch 色相 */
  hue: number;
  ids: number[];
  label: { x: number; y: number } | null;
}

export const JP_MAP_SIZE = { width: ${WIDTH}, height: ${HEIGHT} } as const;

export const JP_REGIONS: JpRegion[] = ${JSON.stringify(regions, null, 2)};

export const JP_CITIES = ${JSON.stringify(cities, null, 2)};

export const JP_OKINAWA_INSET = ${JSON.stringify(inset, null, 2)};

export const JP_PREFECTURES: JpPrefecture[] = ${JSON.stringify(prefectures, null, 2)};
`;
writeFileSync(OUT_PATH, ts.replace(/\r\n/g, "\n"), "utf8");
console.log(`wrote ${OUT_PATH} (${(ts.length / 1024).toFixed(1)} KB)`);
