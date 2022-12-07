const _ = require("lodash");
const fs = require("fs");

const wholeFile = fs.readFileSync("input-01-01.txt", "utf-8");
const lines = wholeFile.split("\n");

const elves: number[] = [0];
var i = 0;

for (const line in lines) {
  const data = parseFloat(lines[line]);
  console.log("raw", lines[line], "parsed", data);
  if (isNaN(data)) {
    i++;
    elves[i] = 0;
    // console.log("new elf! ", i);
  } else {
    elves[i] += data;
  }
}

var total2 = 0;
function comp(a: number, b: number) {
  return a - b;
}
elves.sort(comp).reverse();

_.map(elves, (v: number, k: number) => {
  if (k < 3) {
    total2 += v;
  }
  console.log("Elf", v, k);
});

console.log("total2: ", total2);

function exec() {
  return total2;
}

export { exec };
