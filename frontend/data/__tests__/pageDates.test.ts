import { PAGE_DATES, toIsoDateTime } from "../pageDates";

const YMD = /^\d{4}-\d{2}-\d{2}$/;

describe("PAGE_DATES", () => {
  it("uses YYYY-MM-DD for every published and modified date", () => {
    for (const [route, dates] of Object.entries(PAGE_DATES)) {
      expect(dates.published, `${route} published`).toMatch(YMD);
      expect(dates.modified, `${route} modified`).toMatch(YMD);
    }
  });

  it("never has a modified date earlier than its published date", () => {
    for (const [route, dates] of Object.entries(PAGE_DATES)) {
      expect(dates.modified >= dates.published, route).toBe(true);
    }
  });
});

describe("toIsoDateTime", () => {
  it("appends midnight Taiwan time so Google gets a full ISO 8601 datetime", () => {
    expect(toIsoDateTime("2026-01-24")).toBe("2026-01-24T00:00:00+08:00");
  });
});
