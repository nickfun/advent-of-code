const fs = require("fs");

function input(): number[][] {
  var data: number[][] = [[]];
  const raw: string[] = fs
    .readFileSync("2022/input-08-ex.txt", "utf-8")
    .split("\n");
  for (var i = 0; i < raw.length; i++) {
    const line = raw[i];
    for (var j = 0; j < line.length; j++) {
      if (data[i] === undefined) {
        data[i] = [];
      }
      data[i][j] = parseInt(line[j]);
    }
  }
  return data;
}

function exec() {
  console.log("Day Eight!");
  console.log(input());
}

export { exec };
