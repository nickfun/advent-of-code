const fs = require("fs");
const _ = require("lodash");

function input(): number[][] {
  var data: number[][] = [[]];
  const raw: string[] = fs
    .readFileSync("2022/input-08.txt", "utf-8")
    .split("\n");
  for (var i = 0; i < raw.length; i++) {
    const line = raw[i];
    for (var j = 0; j < line.length; j++) {
      if (data[i] === undefined) {
        data[i] = [];
      }
      data[i][j] = parseInt(line[j]);
    }
  }
  return data;
}

class Treemap {
  map: number[][] = [[]];
  width: number = 0;
  height: number = 0;
  constructor(rawmap: number[][]) {
    this.map = rawmap;
    this.width = rawmap[0].length;
    this.height = rawmap.length;
  }
  isVisible(x: number, y: number): boolean {
    const treeHeight = this.map[x][y];
    var buff: number[] = [];
    var bag = {
      left: false,
      right: false,
      top: false,
      bottom: false,
    };
    // !! Left/Right compare
    const row = this.map[x];
    console.log("ROW:", row);
    for (var i = 0; i <= row.length; i++) {
      if (i < y) {
        // left side
        buff.push(this.map[x][i]);
      }
      if (i == y) {
        // compare what is to left of us
        bag.left = this.areAllBelow(buff, treeHeight, "left");
        buff = [];
      }
      if (i > y && i != row.length) {
        // build right side
        buff.push(this.map[x][i]);
      }
      if (i == row.length) {
        // compare what is right of us
        bag.right = this.areAllBelow(buff, treeHeight, "right");
      }
    }
    buff = [];
    const column: number[] = [];
    for (var i = 0; i < this.height; i++) {
      column.push(this.map[i][y]);
    }
    console.log("COLUMN:", column);
    for (var i = 0; i <= column.length; i++) {
      if (i < x) {
        // top
        buff.push(column[i]);
      }
      if (i == x) {
        // compare top
        bag.top = this.areAllBelow(buff, treeHeight, "top");
        buff = [];
      }
      if (i > x && i != column.length) {
        buff.push(column[i]);
      }
      if (i == column.length) {
        bag.bottom = this.areAllBelow(buff, treeHeight, "bottom");
        buff = [];
      }
    }
    const isVisible = bag.left || bag.right || bag.top || bag.bottom;
    console.log("POS", x, y, "Value", treeHeight, "Visible?", isVisible);
    console.log(bag);
    return isVisible;
  }
  areAllBelow(xs: number[], max: number, debug: string): boolean {
    console.log("are all below?", max, "list", xs, debug);
    if (xs.length == 0) {
      return true;
    }
    return _.every(xs, (i: number) => i < max);
  }
  maxTreeHeight(xs: number[]): number {
    return _.max(xs);
  }
}

function exec() {
  console.log("Day Eight!");
  var totalVisible = 0;
  const mt = new Treemap(input());
  for (var x = 0; x < mt.width; x++) {
    for (var y = 0; y < mt.height; y++) {
      if (mt.isVisible(x, y)) {
        totalVisible++;
      }
    }
    console.log("===");
  }
  // console.log(mt.isVisible(1, 1));
  console.log("Total Visible", totalVisible);
}

export { exec };
