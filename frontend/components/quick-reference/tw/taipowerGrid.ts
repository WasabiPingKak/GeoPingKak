// 台電電桿座標（電力座標）換算。
//
// 台電把台灣切成東西 80 km、南北 50 km 的分區，每區一個英文字母。
// 分區原點是 TWD67 二度分帶（TM2）座標，電桿牌上的碼長這樣：
//   E 32 64   B E 0 8
//   │ │  │    │ │ │ └ 南北再細分 10 m（0～9）
//   │ │  │    │ │ └── 東西再細分 10 m（0～9）
//   │ │  │    │ └──── 南北 100 m（A～E，500 m 切 5 段）
//   │ │  │    └────── 東西 100 m（A～H，800 m 切 8 段）
//   │ │  └─────────── 由分區南緣往北的百分比（每格 500 m）
//   │ └────────────── 由分區西緣往東的百分比（每格 800 m）
//   └──────────────── 分區
//
// 本島與蘭嶼用中央經線 121°E；澎湖用 119°E，另給 X、Y 兩區（範圍和本島 J、M 重疊）。
// 金門（Z）、馬祖（S）用六度分帶，公開的換算參數只有網友推算值，這裡不處理。
// 參考：https://wiki.osgeo.org/wiki/Taiwan_Power_Company_grid

export const ZONE_WIDTH = 80_000;
export const ZONE_HEIGHT = 50_000;
export const CELL_WIDTH = ZONE_WIDTH / 100;
export const CELL_HEIGHT = ZONE_HEIGHT / 100;

/** 中央經線（度） */
export type CentralMeridian = 121 | 119;

export interface TaipowerZone {
  /** 西南角 TWD67 TM2 座標（公尺） */
  x0: number;
  y0: number;
  lon0: CentralMeridian;
}

const main = (x0: number, y0: number): TaipowerZone => ({ x0, y0, lon0: 121 });
const penghu = (x0: number, y0: number): TaipowerZone => ({ x0, y0, lon0: 119 });

export const TAIPOWER_ZONES: Record<string, TaipowerZone> = {
  A: main(170_000, 2_750_000),
  B: main(250_000, 2_750_000),
  C: main(330_000, 2_750_000),
  D: main(170_000, 2_700_000),
  E: main(250_000, 2_700_000),
  F: main(330_000, 2_700_000),
  G: main(170_000, 2_650_000),
  H: main(250_000, 2_650_000),
  J: main(90_000, 2_600_000),
  K: main(170_000, 2_600_000),
  L: main(250_000, 2_600_000),
  M: main(90_000, 2_550_000),
  N: main(170_000, 2_550_000),
  O: main(250_000, 2_550_000),
  P: main(90_000, 2_500_000),
  Q: main(170_000, 2_500_000),
  R: main(250_000, 2_500_000),
  T: main(170_000, 2_450_000),
  U: main(250_000, 2_450_000),
  V: main(170_000, 2_400_000),
  // 蘭嶼。依分區排列推算（R、U 正下方），尚未找到官方資料確認
  W: main(250_000, 2_400_000),
  X: penghu(275_000, 2_614_000),
  Y: penghu(275_000, 2_564_000),
};

// 這條經線以西用澎湖的座標系統。澎湖最東約 119.75°E，本島最西約 120.03°E
export const PENGHU_EAST_LON = 119.9;

// ---- TM2 投影（GRS80 / TWD97） ----
const A = 6_378_137;
const F = 1 / 298.257222101;
const E2 = F * (2 - F);
const EP2 = E2 / (1 - E2);
const K0 = 0.9999;
const FALSE_EASTING = 250_000;
const RAD = Math.PI / 180;

// TWD67 與 TWD97 在 TM2 平面上的近似平移量，台灣本島誤差約數十公尺，對 100 m 等級的碼夠用。
// 澎湖沿用同一組，誤差會再大一些
const DX_67_TO_97 = 828;
const DY_67_TO_97 = -207;

const meridianArc = (phi: number) => {
  const e4 = E2 * E2;
  const e6 = e4 * E2;
  return (
    A *
    ((1 - E2 / 4 - (3 * e4) / 64 - (5 * e6) / 256) * phi -
      ((3 * E2) / 8 + (3 * e4) / 32 + (45 * e6) / 1024) * Math.sin(2 * phi) +
      ((15 * e4) / 256 + (45 * e6) / 1024) * Math.sin(4 * phi) -
      ((35 * e6) / 3072) * Math.sin(6 * phi))
  );
};

/** WGS84 經緯度 → TWD97 TM2 */
export function lonLatToTwd97(
  lon: number,
  lat: number,
  lon0: CentralMeridian = 121,
): [number, number] {
  const phi = lat * RAD;
  const sin = Math.sin(phi);
  const cos = Math.cos(phi);
  const n = A / Math.sqrt(1 - E2 * sin * sin);
  const t = Math.tan(phi) ** 2;
  const c = EP2 * cos * cos;
  const a = (lon - lon0) * RAD * cos;
  const x =
    FALSE_EASTING +
    K0 *
      n *
      (a + ((1 - t + c) * a ** 3) / 6 + ((5 - 18 * t + t * t + 72 * c - 58 * EP2) * a ** 5) / 120);
  const y =
    K0 *
    (meridianArc(phi) +
      n *
        Math.tan(phi) *
        ((a * a) / 2 +
          ((5 - t + 9 * c + 4 * c * c) * a ** 4) / 24 +
          ((61 - 58 * t + t * t + 600 * c - 330 * EP2) * a ** 6) / 720));
  return [x, y];
}

/** TWD97 TM2 → WGS84 經緯度 */
export function twd97ToLonLat(
  x: number,
  y: number,
  lon0: CentralMeridian = 121,
): [number, number] {
  const e4 = E2 * E2;
  const e6 = e4 * E2;
  const mu = y / K0 / (A * (1 - E2 / 4 - (3 * e4) / 64 - (5 * e6) / 256));
  const e1 = (1 - Math.sqrt(1 - E2)) / (1 + Math.sqrt(1 - E2));
  const phi1 =
    mu +
    ((3 * e1) / 2 - (27 * e1 ** 3) / 32) * Math.sin(2 * mu) +
    ((21 * e1 * e1) / 16 - (55 * e1 ** 4) / 32) * Math.sin(4 * mu) +
    ((151 * e1 ** 3) / 96) * Math.sin(6 * mu) +
    ((1097 * e1 ** 4) / 512) * Math.sin(8 * mu);
  const sin = Math.sin(phi1);
  const cos = Math.cos(phi1);
  const c1 = EP2 * cos * cos;
  const t1 = Math.tan(phi1) ** 2;
  const n1 = A / Math.sqrt(1 - E2 * sin * sin);
  const r1 = (A * (1 - E2)) / (1 - E2 * sin * sin) ** 1.5;
  const d = (x - FALSE_EASTING) / (n1 * K0);
  const phi =
    phi1 -
    ((n1 * Math.tan(phi1)) / r1) *
      ((d * d) / 2 -
        ((5 + 3 * t1 + 10 * c1 - 4 * c1 * c1 - 9 * EP2) * d ** 4) / 24 +
        ((61 + 90 * t1 + 298 * c1 + 45 * t1 * t1 - 252 * EP2 - 3 * c1 * c1) * d ** 6) / 720);
  const lam =
    (d -
      ((1 + 2 * t1 + c1) * d ** 3) / 6 +
      ((5 - 2 * c1 + 28 * t1 - 3 * c1 * c1 + 8 * EP2 + 24 * t1 * t1) * d ** 5) / 120) /
    cos;
  return [lon0 + lam / RAD, phi / RAD];
}

/** WGS84 經緯度 → TWD67 TM2（近似） */
export function lonLatToTwd67(
  lon: number,
  lat: number,
  lon0: CentralMeridian = 121,
): [number, number] {
  const [x, y] = lonLatToTwd97(lon, lat, lon0);
  return [x - DX_67_TO_97, y - DY_67_TO_97];
}

/** TWD67 TM2 → WGS84 經緯度（近似） */
export function twd67ToLonLat(
  x: number,
  y: number,
  lon0: CentralMeridian = 121,
): [number, number] {
  return twd97ToLonLat(x + DX_67_TO_97, y + DY_67_TO_97, lon0);
}

export interface TaipowerCode {
  zone: string;
  /** 四位數，例如 "3264" */
  digits: string;
  /** 細碼，例如 "BE08" */
  fine: string;
  /** 所在 800 m × 500 m 格子的西南角（TWD67，該分區的座標系統） */
  cellOrigin: [number, number];
}

/** 找出 TWD67 座標所在的分區（只看同一條中央經線的分區），找不到回傳 null */
export function findZone(x: number, y: number, lon0: CentralMeridian = 121): string | null {
  for (const [zone, z] of Object.entries(TAIPOWER_ZONES)) {
    if (z.lon0 !== lon0) continue;
    if (x >= z.x0 && x < z.x0 + ZONE_WIDTH && y >= z.y0 && y < z.y0 + ZONE_HEIGHT) return zone;
  }
  return null;
}

const pad2 = (n: number) => String(n).padStart(2, "0");

/** WGS84 經緯度 → 台電電桿碼，不在分區內回傳 null */
export function lonLatToTaipower(lon: number, lat: number): TaipowerCode | null {
  const lon0: CentralMeridian = lon < PENGHU_EAST_LON ? 119 : 121;
  const [x, y] = lonLatToTwd67(lon, lat, lon0);
  const zone = findZone(x, y, lon0);
  if (!zone) return null;
  const { x0, y0 } = TAIPOWER_ZONES[zone];
  const dx = x - x0;
  const dy = y - y0;
  const col = Math.floor(dx / CELL_WIDTH);
  const row = Math.floor(dy / CELL_HEIGHT);
  const rx = dx - col * CELL_WIDTH;
  const ry = dy - row * CELL_HEIGHT;
  const fine =
    "ABCDEFGH"[Math.floor(rx / 100)] +
    "ABCDE"[Math.floor(ry / 100)] +
    Math.floor((rx % 100) / 10) +
    Math.floor((ry % 100) / 10);
  return {
    zone,
    digits: pad2(col) + pad2(row),
    fine,
    cellOrigin: [x0 + col * CELL_WIDTH, y0 + row * CELL_HEIGHT],
  };
}
