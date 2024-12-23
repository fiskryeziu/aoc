import fs from "fs";

let data = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .filter((x) => x);

let machines: number[][][] = [];

for (let i = 0; i < data.length; i += 3) {
  let r = formatArray(data.slice(i, i + 3));
  machines.push(r);
}
function formatArray(array: string[]) {
  let curr = [];
  for (let i = 0; i < array.length; i++) {
    const el = array[i];
    const numbers = el
      .split(":")[1]
      .split(",")
      .map((x) => parseInt(x.replace(/\D/g, ""), 10));

    curr.push(numbers);
  }

  return curr;
}

function findSolution(machine: number[][], bonus: number = 0) {
  const [A, B, P] = machine;
  const [ax, ay] = A;
  const [bx, by] = B;
  const [px, py] = P;

  // rregulla e kramerit per determinanten
  const d = ax * by - ay * bx;
  if (d === 0) return null;

  const pX = px + bonus;
  const pY = py + bonus;

  const countA = (pX * by - pY * bx) / d;
  const countB = (pX * ay - pY * ax) / -d;

  if (
    countA < 0 ||
    countB < 0 ||
    !Number.isInteger(countA) ||
    !Number.isInteger(countB)
  ) {
    return null;
  }

  return 3 * countA + countB;
}

function partOne() {
  let sum = 0;
  for (const machine of machines) {
    let r = findSolution(machine);
    if (r !== null) {
      sum += r;
    }
  }
  console.log(sum);
}

function partTwo() {
  let sum = 0;
  for (const machine of machines) {
    let r = findSolution(machine, 10000000000000);
    if (r !== null) {
      sum += r;
    }
  }
  console.log(sum);
}

// partOne();
partTwo();
