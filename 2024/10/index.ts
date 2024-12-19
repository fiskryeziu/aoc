import fs from "fs";

let data = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");
let a = data.map((line) => line.split("").map(Number));

const rows = a.length;
const cols = a[0].length;

const direction = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let trailHead = new Set<number[]>();
const inBound = (r: number, c: number) =>
  r >= 0 && r < rows && c >= 0 && c < cols;

function partOne() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (a[row][col] === 0) {
        trailHead.add([row, col]);
      }
    }
  }
  let trailHeadArr = [...trailHead];

  const countTrail = new Set<string>();
  for (const trail of trailHeadArr) {
    findTrail(trail, countTrail, trail);
  }

  function findTrail(start: number[], set: Set<string>, nextStart: number[]) {
    if (a[nextStart[0]][nextStart[1]] === 9) {
      set.add(`${start},${nextStart}`);
      return;
    }
    const [row, col] = nextStart;
    for (const [dr, dc] of direction) {
      if (
        inBound(row + dr, col + dc) &&
        a[row + dr][col + dc] === a[row][col] + 1
      ) {
        let nextStart = [row + dr, col + dc];
        findTrail(start, set, nextStart);
      }
    }
  }
  console.log(countTrail.size);
}

function partTwo() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (a[row][col] === 0) {
        trailHead.add([row, col]);
      }
    }
  }
  let trailHeadArr = [...trailHead];

  const countTrail = new Set<string>();
  for (const trail of trailHeadArr) {
    findTrail(trail, countTrail, trail, `${trail[0]},${trail[1]}`);
  }

  function findTrail(
    start: number[],
    set: Set<string>,
    nextStart: number[],
    storeTrail: string,
  ) {
    if (a[nextStart[0]][nextStart[1]] === 9) {
      set.add(storeTrail);
      return;
    }
    const [row, col] = nextStart;
    for (const [dr, dc] of direction) {
      if (
        inBound(row + dr, col + dc) &&
        a[row + dr][col + dc] === a[row][col] + 1
      ) {
        let nextStart = [row + dr, col + dc];
        storeTrail += `${row},${col}`;

        findTrail(start, set, nextStart, storeTrail);
      }
    }
  }
  console.log(countTrail.size);
}

// partOne()
// partTwo();
