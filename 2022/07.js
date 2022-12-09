"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
function input() {
    return fs.readFileSync("2022/input-07-ex.txt", "utf-8").split("\n");
}
var zdirs = {
    sizes: {},
    path: "/"
};
var DirData = /** @class */ (function () {
    function DirData() {
        this.paths = [];
        this.sizes = {};
        this.paths = [];
    }
    DirData.prototype.getPath = function () {
        return "/" + this.paths.join("/");
    };
    DirData.prototype.cd = function (dir) {
        if (dir === "/") {
            this.paths = [];
        }
        else if (dir === "..") {
            this.paths.pop();
        }
        else {
            this.paths.push(dir);
        }
    };
    DirData.prototype.addFile = function (name, size) {
        var p = this.getPath();
        if (this.sizes[p] == undefined) {
            this.sizes[p] = 0;
        }
        this.sizes[p] += size;
        console.log(p, name, size);
    };
    return DirData;
}());
function build(lines, dirs) {
    for (var i in lines) {
        var line = lines[i];
        console.log("input:", line);
        var parts = line.split(" ");
        if (parts[0] == "$" && parts[1] == "cd") {
            dirs.cd(parts[2]);
        }
        else if (parts[0] == "$" && parts[1] == "ls") {
            console.log("nop, listing files");
        }
        else if (parts[0] == "dir") {
        }
        else {
            var size = parseInt(parts[0]);
            var name_1 = parts[1];
            dirs.addFile(name_1, size);
        }
        console.log("dir is", dirs.getPath());
    }
    return dirs;
}
function exec() {
    var dirs = new DirData();
    console.log("Day seven!");
    var data = build(input(), dirs);
    console.log("***", "RESULTS");
    console.log(data);
}
exports.exec = exec;
