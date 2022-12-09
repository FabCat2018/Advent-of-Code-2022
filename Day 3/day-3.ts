import * as fs from "fs";

function getRucksacks(): string[] {
  const content: string = fs
    .readFileSync("day-3-input.txt", "utf-8")
    .toString();
  const rucksacks: string[] = content.replace(/\r/gi, "").split("\n");
  return rucksacks;
}

function getRucksackCompartments(rucksack: string): string[] {
  const length: number = rucksack.length;
  const firstCompartment: string = rucksack.slice(0, length / 2);
  const secondCompartment: string = rucksack.slice(length / 2, length);
  return [firstCompartment, secondCompartment];
}

function getCommonItem(collection: string[]): string {
  const allItems = collection.map((item) => item.split(""));
  if (collection.length < 3) {
    return allItems[0].filter((item) => allItems[1].includes(item))[0];
  } else {
    return allItems[0]
      .filter((item) => allItems[1].includes(item))
      .filter((item) => allItems[2].includes(item))[0];
  }
}

function getItemValue(item: string): number {
  const charCode = item.charCodeAt(0);
  if (charCode < 97) {
    return charCode - 38;
  } else {
    return charCode - 96;
  }
}

function partOne(rucksackCompartments: string[][]) {
  const commonItems = rucksackCompartments.map((rucksack) =>
    getCommonItem(rucksack)
  );

  const itemValues = commonItems.map((item) => getItemValue(item));

  console.log(
    "Total Common Item Sum: ",
    itemValues.reduce((acc, current) => acc + current)
  );
}

function chunkItems(
  groupSize: number
): (
  previousValue: string[][],
  currentValue: string,
  currentIndex: number,
  array: string[]
) => string[][] {
  return (chunks: string[][], item: string, index: number) => {
    const chunk = Math.floor(index / groupSize);
    chunks[chunk] = ([] as string[]).concat(chunks[chunk] || [], item);
    return chunks;
  };
}

function partTwo(rucksacks: string[]) {
  const groups: string[][] = rucksacks.reduce(chunkItems(3), []);
  const badges: string[] = groups.map((group) => getCommonItem(group));
  const badgeValues = badges.map((item) => getItemValue(item));

  console.log(
    "Total Badge Priority Sum: ",
    badgeValues.reduce((acc, current) => acc + current)
  );
}

function main() {
  const rucksacks: string[] = getRucksacks();
  const rucksackCompartments: string[][] = rucksacks.map((rucksack) =>
    getRucksackCompartments(rucksack)
  );

  partOne(rucksackCompartments);
  partTwo(rucksacks);
}

main();
