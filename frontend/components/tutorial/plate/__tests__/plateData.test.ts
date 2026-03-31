import {
  EURO_YELLOW_PLATES,
  EURO_DOUBLE_STRIPE_PLATES,
  EURO_SPECIAL_PLATES,
} from "../plateData";
import { EURO_STANDARD_PLATE, EURO_NON_EU_PLATE } from "../plateEuroPlates";
import { ASIA_SPECIAL_PLATES } from "../plateAsiaPlates";
import { AMERICA_SPECIAL_PLATES } from "../plateAmericaPlates";
import { AFRICA_SPECIAL_PLATES } from "../plateAfricaPlates";

const URL_REGEX = /^https?:\/\/.+/;

const allPlateArrays = [
  { name: "EURO_YELLOW_PLATES", data: EURO_YELLOW_PLATES },
  { name: "EURO_DOUBLE_STRIPE_PLATES", data: EURO_DOUBLE_STRIPE_PLATES },
  { name: "EURO_SPECIAL_PLATES", data: EURO_SPECIAL_PLATES },
  { name: "ASIA_SPECIAL_PLATES", data: ASIA_SPECIAL_PLATES },
  { name: "AMERICA_SPECIAL_PLATES", data: AMERICA_SPECIAL_PLATES },
  { name: "AFRICA_SPECIAL_PLATES", data: AFRICA_SPECIAL_PLATES },
];

describe.each(allPlateArrays)("$name", ({ name, data }) => {
  it("is not empty", () => {
    expect(data.length, `${name} is empty`).toBeGreaterThan(0);
  });

  it("every entry has a non-empty country", () => {
    for (const plate of data) {
      expect(plate.country).toBeTruthy();
    }
  });

  it("every entry has a valid image URL", () => {
    for (const plate of data) {
      expect(plate.image, `${plate.country} image`).toMatch(URL_REGEX);
    }
  });

  it("every entry has at least one description line", () => {
    for (const plate of data) {
      expect(
        plate.description.length,
        `${plate.country} has no description`
      ).toBeGreaterThan(0);
    }
  });

  it("no empty description lines", () => {
    for (const plate of data) {
      for (const line of plate.description) {
        expect(line.trim(), `${plate.country} has empty description line`).not.toBe("");
      }
    }
  });
});

describe("Euro plate sections", () => {
  const euroSections = [
    { name: "EURO_STANDARD_PLATE", data: EURO_STANDARD_PLATE },
    { name: "EURO_NON_EU_PLATE", data: EURO_NON_EU_PLATE },
  ];

  it.each(euroSections)("$name has a non-empty title", ({ data }) => {
    expect(data.title).toBeTruthy();
  });

  it.each(euroSections)("$name has images with src and alt", ({ name, data }) => {
    expect(data.images.length, `${name} has no images`).toBeGreaterThan(0);
    for (const img of data.images) {
      expect(img.src, `${name} image missing src`).toMatch(URL_REGEX);
      expect(img.alt, `${name} image missing alt`).toBeTruthy();
    }
  });

  it.each(euroSections)("$name has at least one description", ({ name, data }) => {
    expect(data.descriptions.length, `${name} has no descriptions`).toBeGreaterThan(0);
  });
});
