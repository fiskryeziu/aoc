import fs from "fs";

let data = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const dirs: Record<string, number[]> = {
  ">": [0, 1],
  "<": [0, -1],
  "^": [-1, 0],
  v: [1, 0],
};

const idx = data.findIndex((x) => x === "");

const a = data.slice(0, idx).map((row) => row.split(""));

const moves: string[] = [];
data.slice(idx + 1).forEach((x) => moves.push(...x.split("")));

const cols = a[0].length;
const rows = a.length;

function partOne() {
  let startIdx = [-1, -1];
  let found = false;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (a[i][j] === "@") {
        startIdx = [i, j];
        found = true;
      }
    }
    if (found) break;
  }

  for (let i = 0; i < moves.length; i++) {
    const dir = moves[i];
    const pos = dirs[dir];
    let [row, col] = startIdx;
    let [dr, dc] = pos;

    a[row][col] = ".";
    while (true) {
      let nR = row + dr;
      let nC = col + dc;
      if (a[nR][nC] === "#") {
        break;
      } else if (a[nR][nC] === "O") {
        let start = moveBoxes(startIdx, dir);
        startIdx = [...start];
        row = startIdx[0];
        col = startIdx[1];
        break;
      } else {
        startIdx = [nR, nC];
        row = startIdx[0];
        col = startIdx[1];
        break;
      }
    }
  }
  a[startIdx[0]][startIdx[1]] = "@";
  string(a);

  let sum = 0;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (a[i][j] === "O") {
        console.log(i, j);
        sum += 100 * i + j;
      }
    }
  }
  console.log(sum);
}

function string(array: any[]) {
  console.log(array.map((x) => x.join(" ")));
}

function moveBoxes(start: number[], move: string) {
  const dir = dirs[move];
  let [row, col] = start;
  let [dr, dc] = dir;
  let arr = [];
  arr.push([row, col]);

  let cr = row + dr;
  let cc = col + dc;
  arr.push([cr, cc]);
  while (a[cr][cc] !== ".") {
    if (a[cr][cc] === "#") return start;
    cr = cr + dr;
    cc = cc + dc;
    arr.push([cr, cc]);
  }

  let e = arr[0];
  let sP = arr[1];
  a[e[0]][e[1]] = ".";
  a[sP[0]][sP[1]] = "@";

  for (let i = 2; i <= arr.length - 1; i++) {
    let [r, c] = arr[i];
    a[r][c] = "O";
  }

  return (start = [...sP]);
}
partOne();
