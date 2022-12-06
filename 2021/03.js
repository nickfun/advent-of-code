"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
function input() {
    return fs.readFileSync("2021/input-03.txt", "utf-8").split("\n");
}
function parse(line, rows) {
    console.log("parse", line);
    for (var i = 0; i < line.length; i++) {
        var ch = line[i];
        if (!rows.hasOwnProperty(i)) {
            rows[i] = {
                "0": 0,
                "1": 0
            };
        }
        rows[i][ch] += 1;
    }
}
function toGamma(rows) {
    var str = "";
    for (var i = 0; i < rows.length; i++) {
        if (rows[i]["0"] > rows[i]["1"]) {
            str = str + "0";
        }
        else {
            str = str + "1";
        }
    }
    return parseInt(str, 2);
}
function toEpsilon(rows) {
    var str = "";
    for (var i = 0; i < rows.length; i++) {
        if (rows[i]["0"] > rows[i]["1"]) {
            str = str + "1";
        }
        else {
            str = str + "0";
        }
    }
    console.log(str);
    return parseInt(str, 2);
}
function exec() {
    var rows = [{ "0": 0, "1": 0 }];
    var lines = input();
    for (var i = 0; i < lines.length; i++) {
        parse(lines[i], rows);
    }
    var g = toGamma(rows);
    var e = toEpsilon(rows);
    var a = g * e;
    console.log(g, e, a);
}
exports.exec = exec;
