import * as fs from "fs";

function getPairs() {
  const content: string = fs
    .readFileSync("day-4-input.txt", "utf-8")
    .toString();
  const pairs: Array<string> = content.replace(/\r/gi, "").split("\n");
  return pairs;
}

function convertToNumberRange(areaRange: string): number[] {
  const [start, end] = areaRange.split("-");
  const result = [];

  for (let i: number = parseInt(start); i < parseInt(end) + 1; i++) {
    result.push(i);
  }

  return result;
}

function containsSubset(ranges: number[][]): boolean {
  const [first, second] = ranges;
  return (
    first.every((item) => second.includes(item)) ||
    second.every((item) => first.includes(item))
  );
}

function main() {
  const pairs: string[] = getPairs();
  const elfAreas: string[][] = pairs.map((pair) => pair.split(","));
  const ranges: number[][][] = elfAreas.map((area) =>
    area.map((range) => convertToNumberRange(range))
  );
  const allSubsets = ranges.filter((pair) => containsSubset(pair));
  console.log("Total Subsets: ", allSubsets.length);
}

main();
