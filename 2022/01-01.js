"use strict";
exports.__esModule = true;
exports.exec = void 0;
var _ = require("lodash");
var fs = require("fs");
var wholeFile = fs.readFileSync("input-01-01.txt", "utf-8");
var lines = wholeFile.split("\n");
var elves = [0];
var i = 0;
for (var line in lines) {
    var data = parseFloat(lines[line]);
    console.log("raw", lines[line], "parsed", data);
    if (isNaN(data)) {
        i++;
        elves[i] = 0;
        // console.log("new elf! ", i);
    }
    else {
        elves[i] += data;
    }
}
var total2 = 0;
function comp(a, b) {
    return a - b;
}
elves.sort(comp).reverse();
_.map(elves, function (v, k) {
    if (k < 3) {
        total2 += v;
    }
    console.log("Elf", v, k);
});
console.log("total2: ", total2);
function exec() {
    return total2;
}
exports.exec = exec;
