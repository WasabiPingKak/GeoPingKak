import { glossaryEntries } from "../glossary";

describe("glossaryEntries", () => {
  it("is not empty", () => {
    expect(glossaryEntries.length).toBeGreaterThan(0);
  });

  it("has no duplicate titles", () => {
    const titles = glossaryEntries.map((e) => e.title);
    const unique = new Set(titles);
    expect(unique.size, "duplicate titles found").toBe(titles.length);
  });

  it("every entry has a non-empty title", () => {
    for (const entry of glossaryEntries) {
      expect(entry.title.trim()).not.toBe("");
    }
  });

  it("every entry has non-empty content", () => {
    for (const entry of glossaryEntries) {
      expect(entry.content.trim(), `"${entry.title}" has empty content`).not.toBe("");
    }
  });

  it("every image has alt text for accessibility", () => {
    for (const entry of glossaryEntries) {
      if (entry.images && entry.images.length > 0) {
        for (const img of entry.images) {
          expect(
            img.alt,
            `image in "${entry.title}" missing alt text`
          ).toBeTruthy();
        }
      }
    }
  });
});
