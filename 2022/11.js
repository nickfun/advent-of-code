"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
var _ = require("lodash");
function input() {
    return fs.readFileSync("2022/input-11.txt", "utf-8").split("\n");
}
var Monkey = /** @class */ (function () {
    function Monkey(raw) {
        this.items = [];
        this.buildFromRaw(raw);
        this.inspectCount = 0;
    }
    Monkey.prototype.debug = function () {
        console.log(this);
    };
    Monkey.prototype.buildFromRaw = function (raw) {
        for (var i in raw) {
            var line = raw[i].trim();
            var parts = line.split(" ");
            console.log("PARTS", parts);
            var first = parts[0];
            switch (first) {
                case "Monkey":
                    var rawid = parseIntSafe(parts[1][0]);
                    this.id = rawid;
                    break;
                case "Starting":
                    parts.shift();
                    parts.shift();
                    this.items = parts
                        .join("")
                        .split(",")
                        .map(function (n) { return parseInt(n); });
                    break;
                case "Operation:":
                    parts.shift();
                    parts.shift();
                    parts.shift();
                    this.operation = parts;
                    break;
                case "Test:":
                    this.testDivisible = parseIntSafe(parts.pop());
                    break;
                case "If":
                    if (parts[1] == "true:") {
                        this.throwTrue = parseIntSafe(parts.pop());
                    }
                    else {
                        this.throwFalse = parseIntSafe(parts.pop());
                    }
                    break;
                default:
                    console.log("--- INPUT ERROR ---");
                    console.log("raw\n", line);
                    console.log("first", first, "|");
                    throw new Error("Bad Input! " + line);
            }
        }
    };
    Monkey.prototype.getValue = function (str, current) {
        if (str === "old") {
            return current;
        }
        return parseIntSafe(str);
    };
    Monkey.prototype.doOperation = function (current) {
        var lhs = this.getValue(this.operation[0], current);
        var rhs = this.getValue(this.operation[2], current);
        switch (this.operation[1]) {
            case "+":
                return lhs + rhs;
            case "-":
                return lhs - rhs;
            case "*":
                return lhs * rhs;
            case "/":
                return lhs / rhs;
            default:
                throw new Error("Invalid Operation! " + this.operation[1]);
        }
    };
    Monkey.prototype.doTest = function (current) {
        return current % this.testDivisible === 0;
    };
    Monkey.prototype.accept = function (item) {
        this.items.push(item);
    };
    Monkey.prototype.inventory = function () {
        console.log("Monkey " + this.id, this.items);
    };
    Monkey.prototype.perform = function (others) {
        console.log("PERFORM", "Monkey " + this.id);
        while (this.items.length > 0) {
            var item = this.items.shift();
            if (item === undefined)
                throw new Error("Invalid State");
            var withWorry = this.doOperation(item);
            this.inspectCount++;
            var afterReleif = Math.floor(withWorry / 3);
            var test = this.doTest(afterReleif);
            var nextMonkey = void 0;
            if (test) {
                nextMonkey = others[this.throwTrue];
            }
            else {
                nextMonkey = others[this.throwFalse];
            }
            console.log("Item", item, "new value", afterReleif, "throw to", nextMonkey.id);
            nextMonkey.accept(afterReleif);
        }
    };
    return Monkey;
}());
function parseIntSafe(str) {
    if (str === undefined) {
        console.error("parseIntSafe bad input");
        return 0;
    }
    var r = parseInt(str);
    if (r === undefined) {
        return 0;
    }
    return r;
}
function monkeyBusiness(monkies) {
    var sorted = _.sortBy(monkies, function (m) { return m.inspectCount * -1; });
    var a = sorted.shift();
    var b = sorted.shift();
    if (a === undefined || b === undefined)
        throw new Error("Invalid state");
    console.log(a.inspectCount, "*", b.inspectCount);
    return a.inspectCount * b.inspectCount;
}
function round(monkies, count) {
    for (var i in monkies) {
        var m = monkies[i];
        m.perform(monkies);
    }
    console.log("end of round", count, "results:");
    for (var i in monkies) {
        monkies[i].inventory();
    }
}
function exec() {
    console.log("DAY ELEVEN");
    var buffer = [];
    var lines = input();
    var monkies = [];
    for (var i_1 in lines) {
        var line = lines[i_1];
        if (line.length == 0) {
            // move to next monkey
            monkies.push(new Monkey(buffer));
            buffer = [];
        }
        else {
            buffer.push(line);
        }
    }
    if (buffer.length > 2) {
        monkies.push(new Monkey(buffer));
        buffer = [];
    }
    for (var i_2 in monkies) {
        monkies[i_2].debug();
    }
    var totalRounds = 20;
    for (var i = 1; i <= totalRounds; i++) {
        round(monkies, i);
    }
    console.log("Answer after", totalRounds, monkeyBusiness(monkies));
}
exports.exec = exec;
