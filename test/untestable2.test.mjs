import { expect } from "chai";
import { evaluateDice } from "../src/untestable2_copy.mjs";

describe("Untestable 2: a dice game", () => {
  it("Returns 100+dice value when dice are equal", () => {
    expect(evaluateDice(1,1)).to.equal(101);
  });
  it("Returns the highest dice value when dice are not equal", () => {
    expect(evaluateDice(1,2)).to.equal(2);
  });
});
