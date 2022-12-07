const fs = require("fs");

function input(): string[] {
  return fs.readFileSync("./input-03.txt", "utf-8").split("\n");
}

function common3(a: string, b: string, c: string): string {
  const sa = new Set();
  const sb = new Set();
  for (var i = 0; i < a.length; i++) {
    sa.add(a[i]);
  }
  for (var i = 0; i < b.length; i++) {
    sb.add(b[i]);
  }
  for (var i = 0; i < c.length; i++) {
    const ch = c[i];
    if (sa.has(ch) && sb.has(ch)) {
      return ch;
    }
  }
}

function buildScore() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const scores = {};
  for (var i = 0; i < chars.length; i++) {
    scores[chars[i]] = 1 + i;
  }
  return scores;
}

function exec() {
  var sum = 0;
  const scores = buildScore();
  const lines = input();
  for (var i = 0; i < lines.length; i += 3) {
    const common = common3(lines[i], lines[i + 1], lines[i + 2]);
    sum += scores[common];
  }
  console.log("Sum is", sum);
}

function exec_first_part() {
  var sum = 0;
  const scores = buildScore();
  const lines = input();
  lines.forEach((line) => {
    const s = new Set();
    const s2 = new Set();
    const half = line.length / 2;
    for (var i = 0; i < line.length; i++) {
      const c = line[i];
      if (i < half) {
        s.add(c);
      } else {
        if (s.has(c)) {
          if (!s2.has(c)) {
            sum += scores[c];
            console.log("Line", line, "seen", c);
          }
          s2.add(c);
        }
      }
    }
  });
  console.log("Sum of scores:", sum);
}

export { exec };
