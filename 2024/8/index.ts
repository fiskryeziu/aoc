import fs from "fs";

let data = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

let a = data.map((x) => x.split(""));

const rows = a.length;
const cols = a[0].length;
let count = 0;

function part1() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (a[row][col] !== "." || a[row][col] !== "#") {
        findPair(row, col);
      }
    }

    function findPair(row: number, col: number) {
      let el = a[row][col];
      for (let r = row + 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (a[r][c] !== "." && a[r][c] !== "#" && el === a[r][c]) {
            let pair = [
              [row, col],
              [r, c],
            ];
            createAntinodes(pair);
          }
        }
      }
    }

    function createAntinodes(pair: number[][]) {
      let [first, last] = pair;

      const diffR = Math.abs(first[0] - last[0]);
      const diffC = Math.abs(first[1] - last[1]);

      if (first[1] > last[1]) {
        markPosition(a, first[0] - diffR, first[1] + diffC);

        markPosition(a, last[0] + diffR, last[1] - diffC);
      } else if (first[1] < last[1]) {
        markPosition(a, first[0] - diffR, first[1] - diffC);

        markPosition(a, last[0] + diffR, last[1] + diffC);
      } else {
        markPosition(a, first[0] - 1, first[1]);
        markPosition(a, last[0] + 1, last[1]);
      }
    }

    function inBound(r: number, c: number) {
      return r >= 0 && r < rows && c >= 0 && c < cols;
    }
    function markPosition(
      grid: string[][],
      row: number,
      col: number,
      condition = ".",
    ) {
      if (inBound(row, col) && grid[row][col] === condition) {
        count++;
        grid[row][col] = "#";
      } else if (inBound(row, col) && grid[row][col] !== "#") {
        count++;
      }
    }
  }
  console.log(count);
}

function part2() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (a[row][col] !== "." || a[row][col] !== "#") {
        findPair(row, col);
      }
    }

    function findPair(row: number, col: number) {
      let el = a[row][col];
      for (let r = row + 1; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (a[r][c] !== "." && a[r][c] !== "#" && el === a[r][c]) {
            let pair = [
              [row, col],
              [r, c],
            ];
            createAntinodes(pair);
          }
        }
      }
    }

    function createAntinodes(pair: number[][]) {
      let [first, last] = pair;

      const diffR = Math.abs(first[0] - last[0]);
      const diffC = Math.abs(first[1] - last[1]);

      if (first[1] > last[1]) {
        recursiveMark(a, first[0] - diffR, first[1] + diffC, -diffR, diffC);

        recursiveMark(a, last[0] + diffR, last[1] - diffC, diffR, -diffC);
      } else if (first[1] < last[1]) {
        recursiveMark(a, first[0] - diffR, first[1] - diffC, -diffR, -diffC);

        recursiveMark(a, last[0] + diffR, last[1] + diffC, diffR, diffC);
      } else {
        recursiveMark(a, first[0] - 1, first[1], -1, 0);

        recursiveMark(a, last[0] + 1, last[1], 1, 0);
      }
    }

    function recursiveMark(
      grid: string[][],
      row: number,
      col: number,
      rowStep: number,
      colStep: number,
      condition = ".",
    ) {
      if (!inBound(row, col)) {
        return;
      }

      markPosition(grid, row, col, condition);

      recursiveMark(
        grid,
        row + rowStep,
        col + colStep,
        rowStep,
        colStep,
        condition,
      );
    }

    function inBound(r: number, c: number) {
      return r >= 0 && r < rows && c >= 0 && c < cols;
    }
    function markPosition(
      grid: string[][],
      row: number,
      col: number,
      condition = ".",
    ) {
      if (inBound(row, col) && grid[row][col] === condition) {
        count++;
        grid[row][col] = "#";
      }
    }
  }

  let sum = a.reduce((total, line) => {
    return (
      total +
      line.reduce(
        (acc, item) => (item !== "." && item !== "#" ? acc + 1 : acc),
        0,
      )
    );
  }, 0);

  console.log(sum + count);
}

// part1();
part2();
