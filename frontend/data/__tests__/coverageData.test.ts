import {
  ALL_COUNTRIES,
  ALL_SMALL_NATIONS,
  REGION_VIEWS,
  WORLD_VIEW,
  COVERAGE_COLORS,
  COVERAGE_LABELS,
  type RegionKey,
} from "../coverageData";

const allRegionKeys: RegionKey[] = [
  "asia", "europe", "northAmerica",
  "southAmerica", "caribbean", "oceania", "africa",
];

describe("REGION_VIEWS", () => {
  it("contains all expected region keys", () => {
    for (const key of allRegionKeys) {
      expect(REGION_VIEWS).toHaveProperty(key);
    }
  });

  it("every region has a non-empty titleTw", () => {
    for (const [key, view] of Object.entries(REGION_VIEWS)) {
      expect(view.titleTw, `${key} missing titleTw`).toBeTruthy();
    }
  });

  it("every region key matches its view.key", () => {
    for (const [key, view] of Object.entries(REGION_VIEWS)) {
      expect(view.key, `${key} key mismatch`).toBe(key);
    }
  });

  it("every region has valid bounds (west < east, south < north)", () => {
    for (const [key, view] of Object.entries(REGION_VIEWS)) {
      const [west, south, east, north] = view.bounds;
      expect(west, `${key} west`).toBeGreaterThanOrEqual(-180);
      expect(east, `${key} east`).toBeLessThanOrEqual(180);
      expect(west, `${key} west < east`).toBeLessThan(east);
      // Mercator 在兩極附近會無限拉長
      expect(south, `${key} south`).toBeGreaterThan(-85);
      expect(north, `${key} north`).toBeLessThan(85);
      expect(south, `${key} south < north`).toBeLessThan(north);
    }
  });
});

describe("WORLD_VIEW", () => {
  it("has valid center and positive scale", () => {
    const [lng, lat] = WORLD_VIEW.center;
    expect(Math.abs(lng)).toBeLessThanOrEqual(180);
    expect(Math.abs(lat)).toBeLessThanOrEqual(90);
    expect(WORLD_VIEW.scale).toBeGreaterThan(0);
  });
});

describe("countries data integrity", () => {
  const validStatuses = ["full", "limited", "none"];

  it("every country has a non-empty id and nameTw", () => {
    for (const country of ALL_COUNTRIES) {
      expect(country.id, `${country.nameTw} missing id`).toBeTruthy();
      expect(country.nameTw).toBeTruthy();
    }
  });

  it("every country has a valid status", () => {
    for (const country of ALL_COUNTRIES) {
      expect(
        validStatuses,
        `${country.nameTw} has invalid status "${country.status}"`
      ).toContain(country.status);
    }
  });

  it("a country listed in several regions has the same status everywhere", () => {
    const seen = new Map<string, string>();
    for (const country of ALL_COUNTRIES) {
      const prev = seen.get(country.id);
      if (prev) {
        expect(country.status, `${country.nameTw} has conflicting status`).toBe(prev);
      }
      seen.set(country.id, country.status);
    }
  });
});

describe("smallNations data integrity", () => {
  it("every small nation has valid coordinates", () => {
    for (const marker of ALL_SMALL_NATIONS) {
      const [lng, lat] = marker.coordinates;
      expect(lng, `${marker.nameTw} longitude`).toBeGreaterThanOrEqual(-180);
      expect(lng, `${marker.nameTw} longitude`).toBeLessThanOrEqual(180);
      expect(lat, `${marker.nameTw} latitude`).toBeGreaterThanOrEqual(-90);
      expect(lat, `${marker.nameTw} latitude`).toBeLessThanOrEqual(90);
    }
  });

  it("every small nation has a non-empty nameTw and valid status", () => {
    for (const marker of ALL_SMALL_NATIONS) {
      expect(marker.nameTw).toBeTruthy();
      expect(["full", "limited", "none"]).toContain(marker.status);
    }
  });

  it("small nation ids are unique (used as React keys)", () => {
    const ids = ALL_SMALL_NATIONS.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("COVERAGE_COLORS and COVERAGE_LABELS", () => {
  it("has colors for all three statuses", () => {
    expect(COVERAGE_COLORS).toHaveProperty("full");
    expect(COVERAGE_COLORS).toHaveProperty("limited");
    expect(COVERAGE_COLORS).toHaveProperty("none");
  });

  it("all colors are valid hex codes", () => {
    for (const [status, color] of Object.entries(COVERAGE_COLORS)) {
      expect(color, `${status} color is not valid hex`).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });

  it("has labels for all three statuses", () => {
    expect(COVERAGE_LABELS).toHaveProperty("full");
    expect(COVERAGE_LABELS).toHaveProperty("limited");
    expect(COVERAGE_LABELS).toHaveProperty("none");
  });
});
