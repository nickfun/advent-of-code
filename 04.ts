const fs = require("fs");

function input(): string[] {
  return fs.readFileSync("./input-04.txt", "utf-8").split("\n");
}

// a-b,c-d
function fullyContain(a: number, b: number, c: number, d: number): boolean {
  console.log(a, b, c, d);
  return a <= c && b >= d;
}

function anyOverlap(a: number, b: number, c: number, d: number): boolean {
  const score = (a >= c && a <= d) || (b >= c && b <= d);
  console.log(a, b, c, d, score);
  return score;
}

function part2_line(line: string): number {
  const pairs = line.split(",");
  const p1 = pairs[0].split("-");
  const p2 = pairs[1].split("-");
  const a = parseInt(p1[0]),
    b = parseInt(p1[1]),
    c = parseInt(p2[0]),
    d = parseInt(p2[1]);
  if (anyOverlap(a, b, c, d) || anyOverlap(c, d, a, b)) {
    return 1;
  } else {
    return 0;
  }
}

function part1_line(line: string): number {
  const pairs = line.split(",");
  const p1 = pairs[0].split("-");
  const p2 = pairs[1].split("-");
  const a = parseInt(p1[0]),
    b = parseInt(p1[1]),
    c = parseInt(p2[0]),
    d = parseInt(p2[1]);
  if (fullyContain(a, b, c, d) || fullyContain(c, d, a, b)) {
    return 1;
  } else {
    return 0;
  }
}

function exec() {
  //exec_test();
  exec_part1();
}

function exec_test() {
  const a = 1,
    b = 3,
    c = 3,
    d = 19;
  const x = fullyContain(a, b, c, d);
  const y = fullyContain(c, d, a, b);
  if (x || y) {
    console.log("FAIL");
  } else {
    console.log("PASS");
  }
}

function exec_part1() {
  const lines = input();
  var sum = 0;
  lines.forEach((l) => {
    const score = part2_line(l);
    var w = "";
    if (score == 1) {
      w = "SCORE";
    } else {
      w = "NOT SCORE!";
    }
    sum += score;
    console.log(l, score, sum, w, "\n");
  });
  console.log("sum", sum);
}
export { exec };
