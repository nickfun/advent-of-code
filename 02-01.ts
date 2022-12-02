const fs = require("fs");

type MoveName = "A" | "B" | "C" | "X" | "Y" | "Z";
type Move = {
  name: string;
  value: number;
  id: MoveName;
};
type LookupTable = { [key: string]: Move };

function buildLookup(): LookupTable {
  const rock_a: Move = {
    name: "Rock",
    value: 1,
    id: "A",
  };
  const rock_x: Move = {
    name: "Rock",
    value: 1,
    id: "X",
  };
  const paper_b: Move = {
    name: "Paper",
    value: 2,
    id: "B",
  };
  const paper_y: Move = {
    name: "Paper",
    value: 2,
    id: "Y",
  };
  const scissors_c: Move = {
    name: "Scissors",
    value: 3,
    id: "C",
  };
  const scissors_z: Move = {
    name: "Scissors",
    value: 3,
    id: "Z",
  };
  const allItems = [rock_a, rock_x, paper_b, paper_y, scissors_c, scissors_z];
  var lookup: LookupTable = {
    ff: scissors_z,
  };
  for (const i in allItems) {
    const t = allItems[i];
    lookup[t.id] = t;
  }
  return lookup;
}

/**
 * 0 = loss
 * 3 = draw
 * 6 = win
 */
function score(me: Move, opponent: Move): number {
  // console.log('score args',me, opponent);
  const battle = {
    Rock: {
      Paper: {
        phrase: "Rock loss to Paper",
        score: 0,
      },
      Scissors: {
        phrase: "Rock beats Paper",
        score: 6,
      },
      Rock: {
        phrase: "Rock draw to Rock",
        score: 3,
      },
    },
    Paper: {
      Paper: {
        phrase: "Paper draw to Paper",
        score: 3,
      },
      Scissors: {
        phrase: "Paper loss to Scissors",
        score: 0,
      },
      Rock: {
        phrase: "Paper beats Rock",
        score: 6,
      },
    },
    Scissors: {
      Paper: {
        phrase: "Scissors beats Paper",
        score: 6,
      },
      Scissors: {
        phrase: "Scissors draw to Scissors",
        score: 3,
      },
      Rock: {
        phrase: "Scissors loss to Rock",
        score: 0,
      },
    },
  };
  const result = battle[me.name][opponent.name];
  console.log(result.phrase);
  return result.score + me.value;
}

// x-lose
// y-draw
// z-win
const part2 = {
  "A X": "A Z",
  "A Y": "A X",
  "A Z": "A Y",
  "B X": "B X",
  "B Y": "B Y",
  "B Z": "B Z",
  "C X": "C Y",
  "C Y": "C Z",
  "C Z": "C X",
};

function exec() {
  const wholeFile = fs.readFileSync("input-02-01.txt", "utf-8");
  const lines = wholeFile.split("\n");
  const lookup = buildLookup();
  var total = 0;
  lines.forEach((lineraw) => {
    // console.log("LINE: ", line);
    const line = part2[lineraw];
    const parts = line.split(" ");
    const result = score(lookup[parts[1]], lookup[parts[0]]);
    total += result;
  });
  console.log("Final Score", total);
}

export { exec };
