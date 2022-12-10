"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
var _ = require("lodash");
function input() {
    var data = [[]];
    var raw = fs
        .readFileSync("2022/input-08.txt", "utf-8")
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
var Treemap = /** @class */ (function () {
    function Treemap(rawmap) {
        this.map = [[]];
        this.width = 0;
        this.height = 0;
        this.map = rawmap;
        this.width = rawmap[0].length;
        this.height = rawmap.length;
    }
    Treemap.prototype.isVisible = function (x, y) {
        var treeHeight = this.map[x][y];
        var buff = [];
        var bag = {
            left: false,
            right: false,
            top: false,
            bottom: false
        };
        // !! Left/Right compare
        var row = this.map[x];
        console.log("ROW:", row);
        for (var i = 0; i <= row.length; i++) {
            if (i < y) {
                // left side
                buff.push(this.map[x][i]);
            }
            if (i == y) {
                // compare what is to left of us
                bag.left = this.areAllBelow(buff, treeHeight, "left");
                buff = [];
            }
            if (i > y && i != row.length) {
                // build right side
                buff.push(this.map[x][i]);
            }
            if (i == row.length) {
                // compare what is right of us
                bag.right = this.areAllBelow(buff, treeHeight, "right");
            }
        }
        buff = [];
        var column = [];
        for (var i = 0; i < this.height; i++) {
            column.push(this.map[i][y]);
        }
        console.log("COLUMN:", column);
        for (var i = 0; i <= column.length; i++) {
            if (i < x) {
                // top
                buff.push(column[i]);
            }
            if (i == x) {
                // compare top
                bag.top = this.areAllBelow(buff, treeHeight, "top");
                buff = [];
            }
            if (i > x && i != column.length) {
                buff.push(column[i]);
            }
            if (i == column.length) {
                bag.bottom = this.areAllBelow(buff, treeHeight, "bottom");
                buff = [];
            }
        }
        var isVisible = bag.left || bag.right || bag.top || bag.bottom;
        console.log("POS", x, y, "Value", treeHeight, "Visible?", isVisible);
        console.log(bag);
        return isVisible;
    };
    Treemap.prototype.areAllBelow = function (xs, max, debug) {
        console.log("are all below?", max, "list", xs, debug);
        if (xs.length == 0) {
            return true;
        }
        return _.every(xs, function (i) { return i < max; });
    };
    Treemap.prototype.maxTreeHeight = function (xs) {
        return _.max(xs);
    };
    return Treemap;
}());
function exec() {
    console.log("Day Eight!");
    var totalVisible = 0;
    var mt = new Treemap(input());
    for (var x = 0; x < mt.width; x++) {
        for (var y = 0; y < mt.height; y++) {
            if (mt.isVisible(x, y)) {
                totalVisible++;
            }
        }
        console.log("===");
    }
    // console.log(mt.isVisible(1, 1));
    console.log("Total Visible", totalVisible);
}
exports.exec = exec;
