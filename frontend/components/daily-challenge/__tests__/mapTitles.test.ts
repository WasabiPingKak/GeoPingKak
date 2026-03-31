import { MAP_REPLACEMENTS, MAP_DISPLAY_TITLES } from "../mapTitles";

describe("MAP_DISPLAY_TITLES", () => {
  it("is not empty", () => {
    expect(Object.keys(MAP_DISPLAY_TITLES).length).toBeGreaterThan(0);
  });

  it("every entry has a non-empty title", () => {
    for (const [key, meta] of Object.entries(MAP_DISPLAY_TITLES)) {
      expect(meta.title, `${key} missing title`).toBeTruthy();
    }
  });

  it("every entry has a non-empty description", () => {
    for (const [key, meta] of Object.entries(MAP_DISPLAY_TITLES)) {
      expect(meta.description, `${key} missing description`).toBeTruthy();
    }
  });

  it("every entry has a source string", () => {
    for (const [key, meta] of Object.entries(MAP_DISPLAY_TITLES)) {
      expect(meta.source, `${key} missing source`).toBeTruthy();
    }
  });
});

describe("MAP_REPLACEMENTS", () => {
  it("every replacement target exists in MAP_DISPLAY_TITLES", () => {
    for (const [oldId, newId] of Object.entries(MAP_REPLACEMENTS)) {
      expect(
        MAP_DISPLAY_TITLES,
        `MAP_REPLACEMENTS["${oldId}"] points to "${newId}" which is not in MAP_DISPLAY_TITLES`
      ).toHaveProperty(newId);
    }
  });

  it("every replacement source exists in MAP_DISPLAY_TITLES", () => {
    for (const oldId of Object.keys(MAP_REPLACEMENTS)) {
      expect(
        MAP_DISPLAY_TITLES,
        `MAP_REPLACEMENTS key "${oldId}" is not in MAP_DISPLAY_TITLES`
      ).toHaveProperty(oldId);
    }
  });

  it("no self-referential replacements", () => {
    for (const [oldId, newId] of Object.entries(MAP_REPLACEMENTS)) {
      expect(oldId, `self-referential: ${oldId}`).not.toBe(newId);
    }
  });
});
