const fs = require("fs");

function input(): string[] {
  return fs.readFileSync("2022/input-07-ex.txt", "utf-8").split("\n");
}

var zdirs = {
  sizes: {},
  path: "/",
};

class DirData {
  paths: string[] = [];
  sizes: { [keys: string]: number } = {};
  constructor() {
    this.paths = [];
  }
  getPath(): string {
    return "/" + this.paths.join("/");
  }
  cd(dir: string): void {
    if (dir === "/") {
      this.paths = [];
    } else if (dir === "..") {
      this.paths.pop();
    } else {
      this.paths.push(dir);
    }
  }
  addFile(name: string, size: number) {
    const p = this.getPath();
    if (this.sizes[p] == undefined) {
      this.sizes[p] = 0;
    }
    this.sizes[p] += size;
    console.log(p, name, size);
  }
}

function build(lines: string[], dirs: DirData) {
  for (var i in lines) {
    const line: string = lines[i];
    console.log("input:", line);
    const parts = line.split(" ");
    if (parts[0] == "$" && parts[1] == "cd") {
      dirs.cd(parts[2]);
    } else if (parts[0] == "$" && parts[1] == "ls") {
      console.log("nop, listing files");
    } else if (parts[0] == "dir") {
    } else {
      const size = parseInt(parts[0]);
      const name = parts[1];
      dirs.addFile(name, size);
    }
    console.log("dir is", dirs.getPath());
  }
  return dirs;
}

function exec() {
  var dirs = new DirData();
  console.log("Day seven!");
  const data = build(input(), dirs);
  console.log("***", "RESULTS");
  console.log(data);
}

export { exec };
