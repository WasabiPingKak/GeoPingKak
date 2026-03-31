import VIDEO_EXPLANATIONS from "../videoExplanations";

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;
const YOUTUBE_URL_REGEX = /^https:\/\/(www\.youtube\.com|youtu\.be)\//;

describe("VIDEO_EXPLANATIONS", () => {
  const entries = Object.entries(VIDEO_EXPLANATIONS);

  it("is not empty", () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it("all keys are valid YYYY-MM-DD dates", () => {
    for (const [date] of entries) {
      expect(date, `invalid date format: ${date}`).toMatch(DATE_REGEX);
      // Also verify it parses to a real date
      const parsed = new Date(date);
      expect(parsed.toString(), `unparseable date: ${date}`).not.toBe("Invalid Date");
    }
  });

  it("every map entry has at least one field defined", () => {
    for (const [date, maps] of entries) {
      for (const [mapId, links] of Object.entries(maps)) {
        const hasField =
          links.livestream !== undefined || links.explanation !== undefined;
        expect(
          hasField,
          `${date}/${mapId} has no fields`
        ).toBeTruthy();
      }
    }
  });

  it("all non-empty URLs are valid YouTube URLs", () => {
    for (const [date, maps] of entries) {
      for (const [mapId, links] of Object.entries(maps)) {
        if (links.livestream && links.livestream.length > 0) {
          expect(
            links.livestream,
            `${date}/${mapId} livestream is not a YouTube URL`
          ).toMatch(YOUTUBE_URL_REGEX);
        }
        if (links.explanation && links.explanation.length > 0) {
          expect(
            links.explanation,
            `${date}/${mapId} explanation is not a YouTube URL`
          ).toMatch(YOUTUBE_URL_REGEX);
        }
      }
    }
  });

  it("dates are not in the future", () => {
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    for (const [date] of entries) {
      const parsed = new Date(date);
      expect(
        parsed.getTime(),
        `${date} is in the future`
      ).toBeLessThanOrEqual(today.getTime());
    }
  });
});
