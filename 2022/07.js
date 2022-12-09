"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
function input() {
    return fs.readFileSync("2022/input-07-ex.txt", "utf-8").split("\n");
}
var DirData = /** @class */ (function () {
    function DirData() {
        this.paths = [];
        this.sizes = {};
        this.fullSizes = {};
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
    DirData.prototype.buildFullSize = function () {
        for (var i in this.sizes) {
            this.fullSizes[i] = this.fullSize(i);
        }
    };
    DirData.prototype.fullSize = function (onePath) {
        var size = 0;
        for (var k in this.sizes) {
            if (this.startsWith(onePath, k)) {
                size += this.sizes[k];
            }
        }
        return size;
    };
    DirData.prototype.startsWith = function (start, full) {
        if (start.length > full.length) {
            return false;
        }
        if (start === "/") {
            return true;
        }
        var mstart = start + "/", mfull = full + "/";
        for (var i = 0; i < mstart.length; i++) {
            if (mstart[i] !== mfull[i]) {
                return false;
            }
        }
        return true;
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
    var test = [
        ["/abc", "/abc/123", true],
        ["/", "/abc/123", true],
        ["/bac/321", "/bac/duff", false],
        ["/abc", "/abcd", false],
        ["/", "/ab", true],
    ];
    for (var i in test) {
        var d = test[i];
        var r = dirs.startsWith(d[0], d[1]);
        console.log("starts with", d[0], d[1], dirs.startsWith(d[0], d[1]), "STATUS", d[2] == r ? "PASS" : "FAIL");
    }
    dirs.buildFullSize();
    console.log(dirs.fullSizes);
}
exports.exec = exec;
