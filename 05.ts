const fs = require("fs");

function input(): string[] {
  return fs.readFileSync("input-05-ex.txt", "utf-8").split("\n");
}

function parse(ch: string, i: number): number {
  const ignore = "[] ";
  const numeric = "0123456789";
  if (ignore.indexOf(ch) >= 0) {
    return 0;
  }
  if (numeric.indexOf(ch) >= 0) {
    return -1;
  }
  const pos = Math.floor(i / 4);
  console.log(ch, i, 1 + pos);
  return 1 + pos;
}

function exec() {
  const lines = input();
  for (var i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (var j = 0; j < line.length; j++) {
      const a = parse(line[j], j);
      if (a == -1) {
        console.log("done with it");
        return;
      }
      if (a > 0) {
        console.log("add", line[j], "to stack", a);
      }
    }
  }
}

export { exec };
