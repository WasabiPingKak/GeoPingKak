import { REGION_VIEWS, type GeoBounds } from "@/data/coverageData";
import {
  REGION_MAP_WIDTH,
  fitRegionProjection,
  intersectsBounds,
} from "../regionProjection";

const box = (west: number, south: number, east: number, north: number): GeoJSON.Feature => ({
  type: "Feature",
  properties: {},
  geometry: {
    type: "Polygon",
    coordinates: [[[west, south], [west, north], [east, north], [east, south], [west, south]]],
  },
});

describe("fitRegionProjection", () => {
  it("maps the bounds corners onto the canvas corners", () => {
    const bounds: GeoBounds = [-25, 34.5, 42.5, 68.5];
    const { projection, height } = fitRegionProjection(bounds);
    const [x0, y0] = projection([-25, 68.5])!;
    const [x1, y1] = projection([42.5, 34.5])!;
    expect(x0).toBeCloseTo(0, 0);
    expect(y0).toBeCloseTo(0, 0);
    expect(x1).toBeCloseTo(REGION_MAP_WIDTH, 0);
    expect(y1).toBeCloseTo(height, 0);
  });

  it("gives every region a sensible canvas height", () => {
    for (const view of Object.values(REGION_VIEWS)) {
      const { height } = fitRegionProjection(view.bounds);
      // 太扁或太長的地圖放進卡片都會很難看
      expect(height, `${view.key} height`).toBeGreaterThan(REGION_MAP_WIDTH / 3);
      expect(height, `${view.key} height`).toBeLessThan(REGION_MAP_WIDTH * 2);
    }
  });
});

describe("intersectsBounds", () => {
  const europe: GeoBounds = [-25, 34.5, 42.5, 68.5];

  it("keeps shapes inside or overlapping the bounds", () => {
    expect(intersectsBounds(box(5, 47, 15, 55), europe)).toBe(true);
    expect(intersectsBounds(box(40, 40, 50, 45), europe)).toBe(true);
  });

  it("drops shapes entirely outside the bounds", () => {
    expect(intersectsBounds(box(100, 20, 120, 40), europe)).toBe(false);
    expect(intersectsBounds(box(5, -30, 15, -20), europe)).toBe(false);
  });

  it("keeps shapes crossing the 180th meridian", () => {
    const fiji = box(177, -19, -179, -16);
    expect(intersectsBounds(fiji, [94, -47.5, 179.5, -8])).toBe(true);
  });
});
