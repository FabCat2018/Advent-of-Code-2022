import * as fs from "fs";

const content: string = fs.readFileSync("day-1-input.txt", "utf-8").toString();
const elves: Array<string> = content.replace(/\r/gi, "").split("\n\n");

const elfTotalAmounts: Array<number> = [];
elves.forEach((amounts) => {
  const numberAmounts = amounts.split("\n").map((amount) => parseInt(amount));
  elfTotalAmounts.push(numberAmounts.reduce((acc, current) => acc + current));
});

const elfTopAmounts = elfTotalAmounts.sort((n, m) => m - n).slice(0, 3);
const totalTopAmounts = elfTopAmounts.reduce((acc, current) => acc + current);

console.log("Top Elf's Total: " + Math.max(...elfTotalAmounts));
console.log("Total of Top 3: " + totalTopAmounts);
