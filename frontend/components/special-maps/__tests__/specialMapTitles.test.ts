import { SPECIAL_MAP_TITLES } from "../specialMapTitles";

describe("SPECIAL_MAP_TITLES", () => {
  it("is not empty", () => {
    expect(Object.keys(SPECIAL_MAP_TITLES).length).toBeGreaterThan(0);
  });

  it("every entry has a non-empty title", () => {
    for (const [key, meta] of Object.entries(SPECIAL_MAP_TITLES)) {
      expect(meta.title, `${key} missing title`).toBeTruthy();
    }
  });

  it("every entry has a source", () => {
    for (const [key, meta] of Object.entries(SPECIAL_MAP_TITLES)) {
      expect(meta.source, `${key} missing source`).toBeTruthy();
    }
  });

  it("entries with img_src have valid URL format", () => {
    for (const [key, meta] of Object.entries(SPECIAL_MAP_TITLES)) {
      if (meta.img_src) {
        expect(
          meta.img_src,
          `${key} has invalid img_src`
        ).toMatch(/^https?:\/\/.+/);
      }
    }
  });

  it("all keys follow special-* naming convention", () => {
    for (const key of Object.keys(SPECIAL_MAP_TITLES)) {
      expect(key, `${key} does not follow naming convention`).toMatch(
        /^special-/
      );
    }
  });
});
