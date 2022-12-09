const fs = require("fs");

function input(): string[] {
  return fs.readFileSync("2022/input-07-ex.txt", "utf-8").split("\n");
}

class DirData {
  paths: string[] = [];
  sizes: { [keys: string]: number } = {};
  fullSizes: { [keys: string]: number } = {};
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
  buildFullSize(): void {
    for (var i in this.sizes) {
      this.fullSizes[i] = this.fullSize(i);
    }
  }
  fullSize(onePath: string): number {
    var size = 0;
    for (var k in this.sizes) {
      if (this.startsWith(onePath, k)) {
        size += this.sizes[k];
      }
    }
    return size;
  }
  startsWith(start: string, full: string): boolean {
    if (start.length > full.length) {
      return false;
    }
    if (start === "/") {
      return true;
    }
    const mstart = start + "/",
      mfull = full + "/";
    for (var i = 0; i < mstart.length; i++) {
      if (mstart[i] !== mfull[i]) {
        return false;
      }
    }
    return true;
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
  const test: [string, string, boolean][] = [
    ["/abc", "/abc/123", true],
    ["/", "/abc/123", true],
    ["/bac/321", "/bac/duff", false],
    ["/abc", "/abcd", false],
    ["/", "/ab", true],
  ];
  for (var i in test) {
    const d = test[i];
    const r = dirs.startsWith(d[0], d[1]);
    console.log(
      "starts with",
      d[0],
      d[1],
      dirs.startsWith(d[0], d[1]),
      "STATUS",
      d[2] == r ? "PASS" : "FAIL"
    );
  }
  dirs.buildFullSize();
  console.log(dirs.fullSizes);
}

export { exec };
