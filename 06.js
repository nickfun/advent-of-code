"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
function input() {
    return fs.readFileSync("input-06.txt", "utf-8").split("\n");
}
function hasDupes(buf) {
    var s = new Set();
    for (var i = 0; i < buf.length; i++) {
        var ch = buf[i];
        if (s.has(ch)) {
            return true;
        }
        else {
            s.add(ch);
        }
    }
    return false;
}
function parseLine(line) {
    var buffer = [];
    for (var i = 0; i < line.length; i++) {
        var ch = line[i];
        if (buffer.length >= 14) {
            var v = buffer.shift(); // drop oldest
            console.log("Drop", v);
        }
        buffer.push(ch);
        if (buffer.length == 14 && hasDupes(buffer) == false) {
            return i;
        }
        else {
            //   console.log("no dupes", buffer, buffer.length);
        }
    }
    return line.length;
}
function exec() {
    var line = input()[0];
    console.log("Answer", 1 + parseLine(line));
}
exports.exec = exec;
