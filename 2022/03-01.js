"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
function input() {
    return fs.readFileSync("./input-03.txt", "utf-8").split("\n");
}
function common3(a, b, c) {
    var sa = new Set();
    var sb = new Set();
    for (var i = 0; i < a.length; i++) {
        sa.add(a[i]);
    }
    for (var i = 0; i < b.length; i++) {
        sb.add(b[i]);
    }
    for (var i = 0; i < c.length; i++) {
        var ch = c[i];
        if (sa.has(ch) && sb.has(ch)) {
            return ch;
        }
    }
}
function buildScore() {
    var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var scores = {};
    for (var i = 0; i < chars.length; i++) {
        scores[chars[i]] = 1 + i;
    }
    return scores;
}
function exec() {
    var sum = 0;
    var scores = buildScore();
    var lines = input();
    for (var i = 0; i < lines.length; i += 3) {
        var common = common3(lines[i], lines[i + 1], lines[i + 2]);
        sum += scores[common];
    }
    console.log("Sum is", sum);
}
exports.exec = exec;
function exec_first_part() {
    var sum = 0;
    var scores = buildScore();
    var lines = input();
    lines.forEach(function (line) {
        var s = new Set();
        var s2 = new Set();
        var half = line.length / 2;
        for (var i = 0; i < line.length; i++) {
            var c = line[i];
            if (i < half) {
                s.add(c);
            }
            else {
                if (s.has(c)) {
                    if (!s2.has(c)) {
                        sum += scores[c];
                        console.log("Line", line, "seen", c);
                    }
                    s2.add(c);
                }
            }
        }
    });
    console.log("Sum of scores:", sum);
}
