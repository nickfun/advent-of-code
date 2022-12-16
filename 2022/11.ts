const fs = require("fs");
const _ = require("lodash");

function input(): Array<string> {
  return fs.readFileSync("2022/input-11.txt", "utf-8").split("\n");
}

class Monkey {
  id: number;
  items: Array<number> = [];
  operation: Array<string>;
  testDivisible: number;
  throwTrue: number;
  throwFalse: number;
  inspectCount: number;
  constructor(raw: Array<string>) {
    this.buildFromRaw(raw);
    this.inspectCount = 0;
  }
  debug() {
    console.log(this);
  }
  buildFromRaw(raw: Array<string>) {
    for (const i in raw) {
      const line = raw[i].trim();
      const parts = line.split(" ");
      console.log("PARTS", parts);
      const first = parts[0];
      switch (first) {
        case "Monkey":
          const rawid = parseIntSafe(parts[1][0]);
          this.id = rawid;
          break;
        case "Starting":
          parts.shift();
          parts.shift();
          this.items = parts
            .join("")
            .split(",")
            .map((n) => parseInt(n));
          break;
        case "Operation:":
          parts.shift();
          parts.shift();
          parts.shift();
          this.operation = parts;
          break;
        case "Test:":
          this.testDivisible = parseIntSafe(parts.pop());
          break;
        case "If":
          if (parts[1] == "true:") {
            this.throwTrue = parseIntSafe(parts.pop());
          } else {
            this.throwFalse = parseIntSafe(parts.pop());
          }
          break;
        default:
          console.log("--- INPUT ERROR ---");
          console.log("raw\n", line);
          console.log("first", first, "|");
          throw new Error("Bad Input! " + line);
      }
    }
  }
  getValue(str: string, current: number): number {
    if (str === "old") {
      return current;
    }
    return parseIntSafe(str);
  }
  doOperation(current: number): number {
    const lhs = this.getValue(this.operation[0], current);
    const rhs = this.getValue(this.operation[2], current);
    switch (this.operation[1]) {
      case "+":
        return lhs + rhs;
      case "-":
        return lhs - rhs;
      case "*":
        return lhs * rhs;
      case "/":
        return lhs / rhs;
      default:
        throw new Error("Invalid Operation! " + this.operation[1]);
    }
  }
  doTest(current: number): boolean {
    return current % this.testDivisible === 0;
  }
  accept(item: number) {
    this.items.push(item);
  }
  inventory() {
    console.log("Monkey " + this.id, this.items);
  }
  perform(others: Array<Monkey>) {
    console.log("PERFORM", "Monkey " + this.id);
    while (this.items.length > 0) {
      const item = this.items.shift();
      if (item === undefined) throw new Error("Invalid State");
      const withWorry = this.doOperation(item);
      this.inspectCount++;
      const afterReleif = Math.floor(withWorry / 3);
      const test = this.doTest(afterReleif);
      let nextMonkey: Monkey;
      if (test) {
        nextMonkey = others[this.throwTrue];
      } else {
        nextMonkey = others[this.throwFalse];
      }
      console.log(
        "Item",
        item,
        "new value",
        afterReleif,
        "throw to",
        nextMonkey.id
      );
      nextMonkey.accept(afterReleif);
    }
  }
}

function parseIntSafe(str: string | undefined): number {
  if (str === undefined) {
    console.error("parseIntSafe bad input");
    return 0;
  }
  const r = parseInt(str);
  if (r === undefined) {
    return 0;
  }
  return r;
}

function monkeyBusiness(monkies: Array<Monkey>): number {
  const sorted: Array<Monkey> = _.sortBy(
    monkies,
    (m: Monkey) => m.inspectCount * -1
  );
  const a = sorted.shift();
  const b = sorted.shift();
  if (a === undefined || b === undefined) throw new Error("Invalid state");
  console.log(a.inspectCount, "*", b.inspectCount);
  return a.inspectCount * b.inspectCount;
}

function round(monkies: Array<Monkey>, count: number) {
  for (const i in monkies) {
    const m = monkies[i];
    m.perform(monkies);
  }
  console.log("end of round", count, "results:");
  for (const i in monkies) {
    monkies[i].inventory();
  }
}

export function exec() {
  console.log("DAY ELEVEN");
  var buffer: Array<string> = [];
  const lines = input();
  const monkies: Array<Monkey> = [];
  for (const i in lines) {
    const line = lines[i];
    if (line.length == 0) {
      // move to next monkey
      monkies.push(new Monkey(buffer));
      buffer = [];
    } else {
      buffer.push(line);
    }
  }
  if (buffer.length > 2) {
    monkies.push(new Monkey(buffer));
    buffer = [];
  }
  for (const i in monkies) {
    monkies[i].debug();
  }
  const totalRounds = 20;
  for (var i = 1; i <= totalRounds; i++) {
    round(monkies, i);
  }
  console.log("Answer after", totalRounds, monkeyBusiness(monkies));
}
