const fs = require("fs");

function input(): string[] {
  return fs.readFileSync("input-06.txt", "utf-8").split("\n");
}

function hasDupes(buf) {
  const s = new Set();
  for (var i = 0; i < buf.length; i++) {
    const ch = buf[i];
    if (s.has(ch)) {
      return true;
    } else {
      s.add(ch);
    }
  }
  return false;
}

function parseLine(line): number {
  var buffer = [];
  for (var i = 0; i < line.length; i++) {
    const ch = line[i];
    if (buffer.length >= 14) {
      const v = buffer.shift(); // drop oldest
      console.log("Drop", v);
    }
    buffer.push(ch);
    if (buffer.length == 14 && hasDupes(buffer) == false) {
      return i;
    } else {
      //   console.log("no dupes", buffer, buffer.length);
    }
  }
  return line.length;
}

function exec() {
  const line = input()[0];
  console.log("Answer", 1 + parseLine(line));
}

export { exec };
