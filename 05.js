"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
function input() {
    return fs.readFileSync("input-05.txt", "utf-8").split("\n");
}
/**
 * returns -1 when done parsing the diagram
 * returns 0 when empty input
 * returns positive number to indicate that "ch" belongs to that stack number
 */
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
    // console.log(ch, i, 1 + pos);
    return 1 + pos;
}
function buildStacks(stacks, line) {
    for (var j = 0; j < line.length; j++) {
        var a = parse(line[j], j);
        if (a == -1) {
            // console.log("done with it");
            return false;
        }
        if (a > 0) {
            // console.log("add", line[j], "to stack", a);
            if (!stacks.hasOwnProperty(a)) {
                stacks[a] = [];
            }
            stacks[a].unshift(line[j]);
        }
    }
    return true;
}
function moveItems(command, stacks) {
    console.log("COMMAND", command);
    var parts = command.split(" ");
    if (parts.length < 5) {
        console.log("(skip)");
        return;
    }
    var holder = [];
    var amount = parseInt(parts[1]);
    var from = parseInt(parts[3]);
    var to = parseInt(parts[5]);
    for (var i = 0; i < amount; i++) {
        var x = stacks[from].shift();
        holder.push(x);
        // console.log("Move", x, "From", from, "To", to);
    }
    for (var i = 0; i < amount; i++) {
        var x = holder.pop();
        stacks[to].unshift(x);
    }
    printStacks(stacks);
}
function reverseStacks(stacks) {
    for (var k in stacks) {
        stacks[k].reverse();
    }
}
function exec() {
    var lines = input();
    var stacks = {};
    var building = true;
    for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        if (building) {
            building = buildStacks(stacks, line);
            if (!building) {
                reverseStacks(stacks);
                printStacks(stacks);
            }
        }
        else {
            moveItems(line, stacks);
        }
    }
    console.log("---", "Final State", "---");
    printStacks(stacks);
}
exports.exec = exec;
function printStacks(stacks) {
    var max = -1;
    for (var k in stacks) {
        if (max < stacks[k].length) {
            max = stacks[k].length;
        }
    }
    for (var k in stacks) {
        var buff = "";
        var spaces = max - stacks[k].length;
        for (var z = 0; z < spaces; z++) {
            buff = buff + " ";
        }
        console.log("Stack", k, buff + stacks[k].join(""));
    }
}
