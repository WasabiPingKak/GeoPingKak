import {
  REGION_CONFIGS,
  COVERAGE_COLORS,
  COVERAGE_LABELS,
  type RegionKey,
  type CoverageCountry,
  type SmallNationMarker,
} from "../coverageData";

const allRegionKeys: RegionKey[] = [
  "world", "asia", "europe", "northAmerica",
  "southAmerica", "caribbean", "oceania", "africa",
];

describe("REGION_CONFIGS", () => {
  it("contains all expected region keys", () => {
    for (const key of allRegionKeys) {
      expect(REGION_CONFIGS).toHaveProperty(key);
    }
  });

  it("every region has a non-empty titleTw", () => {
    for (const [key, config] of Object.entries(REGION_CONFIGS)) {
      expect(config.titleTw, `${key} missing titleTw`).toBeTruthy();
    }
  });

  it("every region has valid center coordinates", () => {
    for (const [key, config] of Object.entries(REGION_CONFIGS)) {
      const [lng, lat] = config.center;
      expect(lng, `${key} longitude out of range`).toBeGreaterThanOrEqual(-180);
      expect(lng, `${key} longitude out of range`).toBeLessThanOrEqual(180);
      expect(lat, `${key} latitude out of range`).toBeGreaterThanOrEqual(-90);
      expect(lat, `${key} latitude out of range`).toBeLessThanOrEqual(90);
    }
  });

  it("every region has positive scale", () => {
    for (const [key, config] of Object.entries(REGION_CONFIGS)) {
      expect(config.scale, `${key} scale`).toBeGreaterThan(0);
    }
  });

  it("every region key matches its config.key", () => {
    for (const [key, config] of Object.entries(REGION_CONFIGS)) {
      expect(config.key, `${key} key mismatch`).toBe(key);
    }
  });
});

describe("countries data integrity", () => {
  const allCountries = Object.values(REGION_CONFIGS)
    .filter((c) => c.key !== "world") // world aggregates others
    .flatMap((c) => c.countries);

  it("every country has a non-empty id", () => {
    for (const country of allCountries) {
      expect(country.id, `${country.nameTw} missing id`).toBeTruthy();
    }
  });

  it("every country has a non-empty nameTw", () => {
    for (const country of allCountries) {
      expect(country.nameTw).toBeTruthy();
    }
  });

  it("every country has a valid status", () => {
    const validStatuses = ["full", "limited", "none"];
    for (const country of allCountries) {
      expect(
        validStatuses,
        `${country.nameTw} has invalid status "${country.status}"`
      ).toContain(country.status);
    }
  });

  it("no duplicate country ids within a single region", () => {
    for (const [key, config] of Object.entries(REGION_CONFIGS)) {
      if (config.key === "world") continue;
      const ids = config.countries.map((c: CoverageCountry) => c.id);
      const unique = new Set(ids);
      expect(unique.size, `${key} has duplicate country ids`).toBe(ids.length);
    }
  });
});

describe("smallNations data integrity", () => {
  const allSmall = Object.values(REGION_CONFIGS)
    .filter((c) => c.key !== "world")
    .flatMap((c) => c.smallNations);

  it("every small nation has valid coordinates", () => {
    for (const marker of allSmall) {
      const [lng, lat] = marker.coordinates;
      expect(lng, `${marker.nameTw} longitude`).toBeGreaterThanOrEqual(-180);
      expect(lng, `${marker.nameTw} longitude`).toBeLessThanOrEqual(180);
      expect(lat, `${marker.nameTw} latitude`).toBeGreaterThanOrEqual(-90);
      expect(lat, `${marker.nameTw} latitude`).toBeLessThanOrEqual(90);
    }
  });

  it("every small nation has a non-empty nameTw", () => {
    for (const marker of allSmall) {
      expect(marker.nameTw).toBeTruthy();
    }
  });

  it("every small nation has a valid status", () => {
    const validStatuses = ["full", "limited", "none"];
    for (const marker of allSmall) {
      expect(
        validStatuses,
        `${marker.nameTw} has invalid status`
      ).toContain(marker.status);
    }
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
