"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
function input() {
    return fs.readFileSync("./2022/input-10.txt", "utf-8").split("\n");
}
var Cpu = /** @class */ (function () {
    function Cpu(program) {
        this.signalTotal = 0;
        this.program = program;
        this.registerX = 1;
        this.cycleCount = 0;
    }
    Cpu.prototype.getOp = function (s) {
        return s.split(" ")[0];
    };
    Cpu.prototype.getArg = function (s) {
        var parts = s.split(" ");
        if (parts.length == 2) {
            return parseInt(parts[1]);
        }
        return undefined;
    };
    Cpu.prototype.executeCmd = function () {
        // console.log("cycle!", this.cycleCount);
        var cmd = this.program.shift(); // take first element, remove from list
        // process current command
        if (cmd !== undefined) {
            var op = this.getOp(cmd);
            var arg = this.getArg(cmd);
            if (op === "noop") {
                this.endOneCycle();
            }
            if (op === "addx") {
                if (arg === undefined) {
                    throw new Error("INvalid arg");
                }
                this.endOneCycle();
                this.endOneCycle();
                this.registerX += arg;
            }
        }
        return this.program.length == 0;
    };
    Cpu.prototype.endOneCycle = function () {
        this.cycleCount++;
        if ((this.cycleCount - 20) % 40 == 0) {
            var signal = this.cycleCount * this.registerX;
            console.log("signal", this.cycleCount, "regx=", this.registerX, signal);
            this.signalTotal += signal;
        }
    };
    return Cpu;
}());
function exec() {
    var program = input();
    console.log(program);
    var cpu = new Cpu(program);
    var result = false;
    while (result === false) {
        result = cpu.executeCmd();
    }
    console.log("Done", "\ncycles:", cpu.cycleCount, "\nregister x:", cpu.registerX, "\nSignal Total", cpu.signalTotal);
}
exports.exec = exec;
