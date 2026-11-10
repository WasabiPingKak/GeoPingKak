import { describe, expect, it } from "vitest";
import {
  lonLatToTaipower,
  lonLatToTwd97,
  twd67ToLonLat,
  twd97ToLonLat,
} from "../taipowerGrid";

describe("TM2 投影", () => {
  it("中央經線上的 x 是 250000", () => {
    const [x] = lonLatToTwd97(121, 24);
    expect(x).toBeCloseTo(250_000, 3);
  });

  it("正反算來回誤差小於 1 cm", () => {
    for (const [lon, lat] of [
      [121.5645, 25.034],
      [120.2, 22.9],
      [120.85, 21.95],
      [121.9, 24.9],
    ]) {
      const [x, y] = lonLatToTwd97(lon, lat);
      const [lon2, lat2] = twd97ToLonLat(x, y);
      expect(lon2).toBeCloseTo(lon, 7);
      expect(lat2).toBeCloseTo(lat, 7);
    }
  });

  it("台北 101 的 TWD97 座標", () => {
    const [x, y] = lonLatToTwd97(121.5645, 25.034);
    expect(x).toBeGreaterThan(306_000);
    expect(x).toBeLessThan(307_500);
    expect(y).toBeGreaterThan(2_769_000);
    expect(y).toBeLessThan(2_770_500);
  });
});

describe("台電電桿碼", () => {
  it("分區西南角往內一點點是 0000AA00", () => {
    const [lon, lat] = twd67ToLonLat(250_000 + 5, 2_700_000 + 5);
    expect(lonLatToTaipower(lon, lat)).toMatchObject({ zone: "E", digits: "0000", fine: "AA00" });
  });

  it("照圖上的範例：E 區 32%、64%", () => {
    const [lon, lat] = twd67ToLonLat(250_000 + 32 * 800 + 155, 2_700_000 + 64 * 500 + 485);
    expect(lonLatToTaipower(lon, lat)).toMatchObject({ zone: "E", digits: "3264", fine: "BE58" });
  });

  it("台灣各地落在對的分區", () => {
    const cases: [number, number, string][] = [
      [121.5645, 25.034, "B"], // 台北 101
      [121.0, 24.8, "D"], // 新竹
      [120.68, 24.15, "G"], // 台中
      [120.17, 23.75, "J"], // 雲林麥寮海邊
      [120.45, 23.48, "N"], // 嘉義
      [120.13, 23.0, "P"], // 台南安平
      [120.3, 22.99, "Q"], // 台南永康
      [121.6, 23.98, "H"], // 花蓮
      [121.15, 22.75, "R"], // 台東
      [120.8, 21.95, "V"], // 鵝鑾鼻
    ];
    for (const [lon, lat, zone] of cases) {
      expect(lonLatToTaipower(lon, lat)?.zone, `${lon},${lat}`).toBe(zone);
    }
  });

  it("蘭嶼在 W 區", () => {
    expect(lonLatToTaipower(121.55, 22.05)?.zone).toBe("W");
  });

  it("澎湖用 119°E 中央經線，分成 X、Y 兩區", () => {
    expect(lonLatToTaipower(119.57, 23.57)?.zone).toBe("Y"); // 馬公
    expect(lonLatToTaipower(119.6, 23.73)?.zone).toBe("X"); // 吉貝
    const [lon, lat] = twd67ToLonLat(275_000 + 5, 2_614_000 + 5, 119);
    expect(lonLatToTaipower(lon, lat)).toMatchObject({ zone: "X", digits: "0000", fine: "AA00" });
  });

  it("澎湖西邊的海與外海不給碼", () => {
    expect(lonLatToTaipower(119.1, 23.5)).toBeNull();
    expect(lonLatToTaipower(123, 24)).toBeNull();
  });
});
