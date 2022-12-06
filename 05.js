"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
function input() {
    return fs.readFileSync("input-05-ex.txt", "utf-8").split("\n");
}
function parse(ch, i) {
    var ignore = "[] ";
    var numeric = "0123456789";
    if (ignore.indexOf(ch) >= 0) {
        return 0;
    }
    if (numeric.indexOf(ch) >= 0) {
        return -1;
    }
    var pos = Math.floor(i / 4);
    console.log(ch, i, 1 + pos);
    return 1 + pos;
}
function exec() {
    var lines = input();
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        for (var j = 0; j < line.length; j++) {
            var a = parse(line[j], j);
            if (a == -1) {
                console.log("done with it");
                return;
            }
            if (a > 0) {
                console.log("add", line[j], "to stack", a);
            }
        }
    }
}
exports.exec = exec;
