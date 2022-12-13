const fs = require("fs");

function input() {
  return fs.readFileSync("./2022/input-10.txt", "utf-8").split("\n");
}

class Cpu {
  cycleCount: number;
  signalTotal: number = 0;
  program: string[];
  registerX: number;
  constructor(program: string[]) {
    this.program = program;
    this.registerX = 1;
    this.cycleCount = 0;
  }
  getOp(s: string): string {
    return s.split(" ")[0];
  }
  getArg(s: string): number | undefined {
    const parts = s.split(" ");
    if (parts.length == 2) {
      return parseInt(parts[1]);
    }
    return undefined;
  }
  executeCmd(): boolean {
    // console.log("cycle!", this.cycleCount);
    const cmd: string | undefined = this.program.shift(); // take first element, remove from list
    // process current command
    if (cmd !== undefined) {
      const op: string = this.getOp(cmd);
      const arg: number | undefined = this.getArg(cmd);
      if (op === "noop") {
        this.endOneCycle();
      }
      if (op === "addx") {
        if (arg === undefined) {
          throw new Error("INvalid arg");
        }
        this.endOneCycle();
        this.endOneCycle();
        this.registerX += arg;
      }
    }
    return this.program.length == 0;
  }
  endOneCycle() {
    this.cycleCount++;
    if ((this.cycleCount - 20) % 40 == 0) {
      const signal = this.cycleCount * this.registerX;
      console.log("signal", this.cycleCount, "regx=", this.registerX, signal);
      this.signalTotal += signal;
    }
  }
}

function exec() {
  const program = input();
  console.log(program);
  const cpu = new Cpu(program);
  var result = false;
  while (result === false) {
    result = cpu.executeCmd();
  }
  console.log(
    "Done",
    "\ncycles:",
    cpu.cycleCount,
    "\nregister x:",
    cpu.registerX,
    "\nSignal Total",
    cpu.signalTotal
  );
}

export { exec };
