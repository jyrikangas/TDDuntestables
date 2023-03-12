import { readFile } from "node:fs/promises";
import { parse } from "csv-parse/sync";

//this doesn't require refactoring to test, we just need to use a test file
export async function parsePeopleCsv(filePath) {
  const csvData = await readFile(filePath, { encoding: "utf8" });  
  const records = parse(csvData, {
    skip_empty_lines: true,
    trim: true,
  });  
  return records.map(([firstName, lastName, age, gender]) => {
    const person = {
      firstName,
      lastName,
      gender: gender.charAt(0).toLowerCase(),
    };
    if (age !== "") {
      person.age = parseInt(age);
    }
    return person;
  });
}
