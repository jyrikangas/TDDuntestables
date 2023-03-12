import { expect } from "chai";
import { parsePeopleCsv } from "../src/untestable3.mjs";

// example input:
// Loid,Forger,,Male
// Anya,Forger,6,Female
// Yor,Forger,27,Female

describe("Untestable 3: CSV file parsing", () => {

  it("contains 3 records", async () => {
    expect(await parsePeopleCsv("people.csv")).to.have.lengthOf(3);
  });
  it("contains person with first name Loid", async () => {
    let map = await parsePeopleCsv("people.csv");
    expect(map[0]).to.have.property("firstName", "Loid");
  });
  it("contains person with gender", async () => {
    let map = await parsePeopleCsv("people.csv");
    expect(map[2]).to.have.property("gender", "f");
  });

});
