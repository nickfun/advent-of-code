"use strict";
exports.__esModule = true;
exports.exec = void 0;
var fs = require("fs");
function buildLookup() {
    var rock_a = {
        name: "Rock",
        value: 1,
        id: "A"
    };
    var rock_x = {
        name: "Rock",
        value: 1,
        id: "X"
    };
    var paper_b = {
        name: "Paper",
        value: 2,
        id: "B"
    };
    var paper_y = {
        name: "Paper",
        value: 2,
        id: "Y"
    };
    var scissors_c = {
        name: "Scissors",
        value: 3,
        id: "C"
    };
    var scissors_z = {
        name: "Scissors",
        value: 3,
        id: "Z"
    };
    var allItems = [rock_a, rock_x, paper_b, paper_y, scissors_c, scissors_z];
    var lookup = {
        ff: scissors_z
    };
    for (var i in allItems) {
        var t = allItems[i];
        lookup[t.id] = t;
    }
    return lookup;
}
/**
 * 0 = loss
 * 3 = draw
 * 6 = win
 */
function score(me, opponent) {
    // console.log('score args',me, opponent);
    var battle = {
        Rock: {
            Paper: {
                phrase: "Rock loss to Paper",
                score: 0
            },
            Scissors: {
                phrase: "Rock beats Paper",
                score: 6
            },
            Rock: {
                phrase: "Rock draw to Rock",
                score: 3
            }
        },
        Paper: {
            Paper: {
                phrase: "Paper draw to Paper",
                score: 3
            },
            Scissors: {
                phrase: "Paper loss to Scissors",
                score: 0
            },
            Rock: {
                phrase: "Paper beats Rock",
                score: 6
            }
        },
        Scissors: {
            Paper: {
                phrase: "Scissors beats Paper",
                score: 6
            },
            Scissors: {
                phrase: "Scissors draw to Scissors",
                score: 3
            },
            Rock: {
                phrase: "Scissors loss to Rock",
                score: 0
            }
        }
    };
    var result = battle[me.name][opponent.name];
    console.log(result.phrase);
    return result.score + me.value;
}
// x-lose
// y-draw
// z-win
var part2 = {
    "A X": "A Z",
    "A Y": "A X",
    "A Z": "A Y",
    "B X": "B X",
    "B Y": "B Y",
    "B Z": "B Z",
    "C X": "C Y",
    "C Y": "C Z",
    "C Z": "C X"
};
function exec() {
    var wholeFile = fs.readFileSync("input-02-01.txt", "utf-8");
    var lines = wholeFile.split("\n");
    var lookup = buildLookup();
    var total = 0;
    lines.forEach(function (lineraw) {
        // console.log("LINE: ", line);
        var line = part2[lineraw];
        var parts = line.split(" ");
        var result = score(lookup[parts[1]], lookup[parts[0]]);
        total += result;
    });
    console.log("Final Score", total);
}
exports.exec = exec;
