const fs = require("fs");

function input(): Array<string> {
  return fs.readFileSync("2022/input-12.txt", "utf-8").split("\n");
}
class Pos {
  x: number;
  y: number;
  constructor(xi: number, yi: number) {
    this.x = xi;
    this.y = yi;
  }
  is(other: Pos) {
    return this.x == other.x && this.y == other.y;
  }
  toKey(): string {
    return `${this.x}-${this.y}`;
  }
  isValid(max_x: number, max_y: number): boolean {
    return this.x >= 0 && this.y >= 0 && this.x < max_x && this.y < max_y;
  }
  neighbors(max_x: number, max_y: number): Array<Pos> {
    return [
      new Pos(this.x + 1, this.y),
      new Pos(this.x - 1, this.y),
      new Pos(this.x, this.y + 1),
      new Pos(this.x, this.y - 1),
    ].filter((p) => p.isValid(max_x, max_y));
  }
}

class MyMap {
  all: Array<Array<number>>;
  start: Pos;
  end: Pos;
  max_x: number;
  max_y: number;
  getValue(p: Pos): number {
    const v = this.all[p.x][p.y];
    if (v === undefined) {
      throw new Error("Bad position! " + p.toKey());
    }
    return v;
  }
  debug() {
    for (const row of this.all) {
      console.log(row.join(" "));
    }
  }
}

function valueOf(s: string): number {
  if (s === "S") {
    return "a".charCodeAt(0);
  }
  if (s === "E") {
    return "z".charCodeAt(0);
  }
  return s.charCodeAt(0);
}

function buildMap(lines: Array<string>): MyMap {
  const max_x = lines.length;
  const max_y = lines[0].length;
  var start = new Pos(0, 0);
  var end = new Pos(0, 0);
  const rawmap: Array<Array<number>> = [[]];
  for (var x = 0; x < lines.length; x++) {
    const line = lines[x];
    for (var y = 0; y < line.length; y++) {
      const ch = line[y];
      if (ch === "S") {
        start = new Pos(x, y);
      }
      if (ch === "E") {
        end = new Pos(x, y);
      }
      if (rawmap[x] === undefined) {
        rawmap[x] = [];
      }
      rawmap[x][y] = valueOf(ch);
      // console.log(ch, "=>", rawmap[x][y]);
    }
  }
  const d = new MyMap();
  d.all = rawmap;
  d.start = start;
  d.end = end;
  d.max_x = max_x;
  d.max_y = max_y;
  return d;
}

function findPath(data: MyMap) {
  const seen = new Set<string>();
  var stepCount = 0;
  var positions: Array<Pos> = [data.start];
  var nextPositions: Array<Pos> = [];
  while (positions.length > 0) {
    console.log("Step");
    stepCount++;
    nextPositions = [];
    for (var i = 0; i < positions.length; i++) {
      const p = positions[i];
      const neigh = p.neighbors(data.max_x, data.max_y);
      for (var j = 0; j < neigh.length; j++) {
        const n = neigh[j];
        if (seen.has(n.toKey())) {
          continue;
        }
        const diff = data.getValue(n) - data.getValue(p);
        // console.log("diff", diff);
        if (diff > 1) {
          continue;
        }
        nextPositions.push(n);
        seen.add(n.toKey());
        console.log("add", n.toKey());
        if (n.is(data.end)) {
          return stepCount;
        }
      }
    }
    positions = nextPositions;
  }
  throw new Error("Did not find a path");
  // return stepCount;
}
export function exec() {
  console.log("DAY TWELVE");
  const data: MyMap = buildMap(input());
  // console.log(data);
  console.log("answer", findPath(data));
}
