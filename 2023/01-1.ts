const fs = require("fs");

const words = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function verify(line: string): boolean {
  for (let w of words) {
    if (line.indexOf(w) >= 0) {
      return false;
    }
  }
  return true;
}

function lineToNumberArray(line: string): number[] {
  let nums: number[] = [];
  for (let i = 0; i < line.length; i++) {
    let c = line[i];
    let rest = line.substring(i, line.length);
    if (/[0-9]/g.test(c)) {
      nums.push(Number(c));
    }
    words.forEach((word, index) => {
      if (rest.startsWith(word)) {
        nums.push(1 + index);
      }
    });
  }
  return nums;
}

function wordToNumber(line: string): string {
  let changed = line;
  console.log("---- line");
  for (let i = 0; i < line.length; i++) {
    words.forEach((word, index) => {
      if (changed.substring(i, line.length).startsWith(word)) {
        changed = changed.replace(word, (1 + index).toString());
        console.log(word, 1 + index);
      }
    });
  }
  return changed;
}

function wordToNumber2(line: string): string {
  let changed: string = line;
  for (let i = 0; i < line.length; i++) {
    let sofar = "";
    for (let j = i; j < line.length; j++) {
      sofar = line.substring(i, j);
      const wordIndex = words.indexOf(sofar);
      if (wordIndex >= 0) {
        changed = changed.replace(sofar, (1 + wordIndex).toString());
      }
    }
  }
  return changed;
}

function csv(xs: any[]) {
  return xs.map((z) => z.toString()).join(", ");
}

function exec() {
  const contents: string = fs.readFileSync("2023/1-input.txt", "utf-8");
  const nums: number[] = contents.split("\n").map((line, lineNo) => {
    const lineNums: number[] = lineToNumberArray("a".concat(line).concat("a"));
    if (lineNums.length === 0) {
      console.log("BAD!", lineNums, line);
      throw new Error(`bad line ${lineNums} ${lineNo} - ${line}`);
    }
    const first = lineNums[0].toString();
    const last = lineNums[lineNums.length - 1].toString();
    const lineAnswer = Number(first.concat(last));
    console.log(lineAnswer, csv(lineNums), null, line);
    return lineAnswer;
  });
  const answer = nums.reduce((c, m) => c + m, 0);
  console.log(answer);
}
export { exec };
