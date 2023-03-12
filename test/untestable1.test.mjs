import { expect } from "chai";
import { daysUntilChristmas } from "../src/untestable1_copy.mjs";

describe("Untestable 1: days until Christmas", () => {
  
  it("returns 0 on Christmas Day", () => {
    const now = new Date(2020, 12 - 1, 25);
    expect(daysUntilChristmas(now)).to.equal(0);
  });
  it("returns 1 on Christmas Eve", () => {
    const now = new Date(2020, 12 - 1, 24);
    expect(daysUntilChristmas(now)).to.equal(1);
  });

  it("returns 364 on New Year's Eve", () => {
    const now = new Date(2020, 12 - 1, 31);
    expect(daysUntilChristmas(now)).to.equal(359);
  });
});

