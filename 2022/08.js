"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
function input() {
    var data = [[]];
    var raw = fs
        .readFileSync("2022/input-08-ex.txt", "utf-8")
        .split("\n");
    for (var i = 0; i < raw.length; i++) {
        var line = raw[i];
        for (var j = 0; j < line.length; j++) {
            if (data[i] === undefined) {
                data[i] = [];
            }
            data[i][j] = parseInt(line[j]);
        }
    }
    return data;
}
function exec() {
    console.log("Day Eight!");
    console.log(input());
}
exports.exec = exec;
