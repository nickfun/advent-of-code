"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
function input() {
    return fs.readFileSync("./input-04.txt", "utf-8").split("\n");
}
// a-b,c-d
function fullyContain(a, b, c, d) {
    console.log(a, b, c, d);
    return a <= c && b >= d;
}
function anyOverlap(a, b, c, d) {
    var score = (a >= c && a <= d) || (b >= c && b <= d);
    console.log(a, b, c, d, score);
    return score;
}
function part2_line(line) {
    var pairs = line.split(",");
    var p1 = pairs[0].split("-");
    var p2 = pairs[1].split("-");
    var a = parseInt(p1[0]), b = parseInt(p1[1]), c = parseInt(p2[0]), d = parseInt(p2[1]);
    if (anyOverlap(a, b, c, d) || anyOverlap(c, d, a, b)) {
        return 1;
    }
    else {
        return 0;
    }
}
function part1_line(line) {
    var pairs = line.split(",");
    var p1 = pairs[0].split("-");
    var p2 = pairs[1].split("-");
    var a = parseInt(p1[0]), b = parseInt(p1[1]), c = parseInt(p2[0]), d = parseInt(p2[1]);
    if (fullyContain(a, b, c, d) || fullyContain(c, d, a, b)) {
        return 1;
    }
    else {
        return 0;
    }
}
function exec() {
    //exec_test();
    exec_part1();
}
exports.exec = exec;
function exec_test() {
    var a = 1, b = 3, c = 3, d = 19;
    var x = fullyContain(a, b, c, d);
    var y = fullyContain(c, d, a, b);
    if (x || y) {
        console.log("FAIL");
    }
    else {
        console.log("PASS");
    }
}
function exec_part1() {
    var lines = input();
    var sum = 0;
    lines.forEach(function (l) {
        var score = part2_line(l);
        var w = "";
        if (score == 1) {
            w = "SCORE";
        }
        else {
            w = "NOT SCORE!";
        }
        sum += score;
        console.log(l, score, sum, w, "\n");
    });
    console.log("sum", sum);
}
