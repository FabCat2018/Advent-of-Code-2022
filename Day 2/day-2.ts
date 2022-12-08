import * as fs from "fs";

class Option {
  name: string;
  score: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }
}

enum Outcomes {
  WIN = 6,
  DRAW = 3,
  LOSE = 0,
}

class Options {
  static readonly ROCK = new Option("Rock", 1);
  static readonly PAPER = new Option("Paper", 2);
  static readonly SCISSORS = new Option("Scissors", 3);
}

const Mappings = new Map<string, Option>([
  ["A", Options.ROCK],
  ["B", Options.PAPER],
  ["C", Options.SCISSORS],
  ["X", Options.ROCK],
  ["Y", Options.PAPER],
  ["Z", Options.SCISSORS],
]);

function getPairs() {
  const content: string = fs
    .readFileSync("day-2-input.txt", "utf-8")
    .toString();
  const pairs: Array<string> = content.replace(/\r/gi, "").split("\n");
  return pairs;
}

function mapPairToOptions(pair: string): Option[] {
  const parts: string[] = pair.split(" ");
  return parts
    .map((part) => Mappings.get(part) || new Option("default", 0))
    .filter((option) => option.name !== "default");
}

function calculateScore(optionsPair: Option[]): number {
  const outcomeScore: number = calculateOutcomeScore(optionsPair);
  return outcomeScore + optionsPair[1].score;
}

function calculateOutcomeScore(optionsPair: Option[]) {
  if (optionsPair[0] === optionsPair[1]) {
    return Outcomes.DRAW;
  }

  if (optionsPair[0] === Options.ROCK) {
    if (optionsPair[1] === Options.PAPER) {
      return Outcomes.WIN;
    } else {
      return Outcomes.LOSE;
    }
  } else if (optionsPair[0] === Options.PAPER) {
    if (optionsPair[1] === Options.ROCK) {
      return Outcomes.LOSE;
    } else {
      return Outcomes.WIN;
    }
  } else {
    if (optionsPair[1] === Options.ROCK) {
      return Outcomes.WIN;
    } else {
      return Outcomes.LOSE;
    }
  }
}

function main() {
  const pairs: string[] = getPairs();
  const optionPairs: Option[][] = pairs.map((pair) => mapPairToOptions(pair));
  const allScores: number[] = optionPairs.map((optionPair) =>
    calculateScore(optionPair)
  );
  console.log(
    "Total Score: " + allScores.reduce((acc, current) => acc + current)
  );
}

main();
