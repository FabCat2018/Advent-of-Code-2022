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

const OptionMap = new Map<string, Option>([
  ["A", Options.ROCK],
  ["B", Options.PAPER],
  ["C", Options.SCISSORS],
]);

const OutcomeMap = new Map<string, number>([
  ["X", Outcomes.LOSE],
  ["Y", Outcomes.DRAW],
  ["Z", Outcomes.WIN],
]);

function getPairs() {
  const content: string = fs
    .readFileSync("day-2-input.txt", "utf-8")
    .toString();
  const pairs: Array<string> = content.replace(/\r/gi, "").split("\n");
  return pairs;
}

function mapPair(pair: string): { oppOption: Option; outcome: number } {
  const parts: string[] = pair.split(" ");
  const oppOption = OptionMap.get(parts[0]) || new Option("default", 0);
  const outcome = OutcomeMap.get(parts[1]) || 0;
  return { oppOption, outcome };
}

function calculateScore(mappedPair: {
  oppOption: Option;
  outcome: number;
}): number {
  const { oppOption, outcome } = mappedPair;
  return outcome + getPlayerOption(outcome, oppOption).score;
}

function getPlayerOption(outcome: number, oppOption: Option): Option {
  if (outcome === Outcomes.DRAW) {
    return oppOption;
  } else if (outcome === Outcomes.WIN) {
    if (oppOption === Options.ROCK) {
      return Options.PAPER;
    } else if (oppOption === Options.PAPER) {
      return Options.SCISSORS;
    } else {
      return Options.ROCK;
    }
  } else {
    if (oppOption === Options.ROCK) {
      return Options.SCISSORS;
    } else if (oppOption === Options.PAPER) {
      return Options.ROCK;
    } else {
      return Options.PAPER;
    }
  }
}

function main() {
  const pairs: string[] = getPairs();
  const mappedPairs: Array<{ oppOption: Option; outcome: number }> = pairs.map(
    (pair) => mapPair(pair)
  );
  const allScores: number[] = mappedPairs.map((mappedPair) =>
    calculateScore(mappedPair)
  );
  console.log(
    "Total Score: " + allScores.reduce((acc, current) => acc + current)
  );
}

main();
