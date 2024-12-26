import fs from "fs";

let data = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const robots = data.map((line) => {
  const [position, velocity] = line.split(" ");
  const [x, y] = position.replace("p=", "").split(",").map(Number);
  const [v1, v2] = velocity.replace("v=", "").split(",").map(Number);

  return {
    pos: [x, y],
    v: [v1, v2],
  };
});

const W = 101;
const H = 103;

function wrap(value: number, max: number) {
  if (value < 0) {
    return max + value;
  } else if (value >= max) {
    return value - max;
  } else {
    return value;
  }
}
function partOne(cols: number, rows: number) {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0),
  );

  let curr = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 0),
  );
  for (let i = 0; i < robots.length; i++) {
    curr = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0),
    );
    let [col, row] = robots[i].pos;
    let [v1, v2] = robots[i].v;
    curr[row][col] = 1;

    for (let j = 1; j <= 100; j++) {
      curr[row][col] = 0;

      row = wrap(row + v2, rows);
      col = wrap(col + v1, cols);

      curr[row][col] = 1;
    }
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        grid[r][c] += curr[r][c];
      }
    }
  }

  const x = Math.floor(rows / 2);
  const y = Math.floor(cols / 2);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (r === x) {
        grid[x][c] = 0;
      }

      if (c === y) {
        grid[r][y] = 0;
      }
    }
  }
  let quadrants = [0, 0, 0, 0];

  for (let r = 0; r <= x; r++) {
    for (let c = 0; c <= y; c++) {
      quadrants[0] += grid[r][c];
    }
  }

  for (let r = 0; r <= x; r++) {
    for (let c = y + 1; c < cols; c++) {
      quadrants[1] += grid[r][c];
    }
  }

  for (let r = x + 1; r < rows; r++) {
    for (let c = 0; c <= y; c++) {
      quadrants[2] += grid[r][c];
    }
  }

  for (let r = x + 1; r < rows; r++) {
    for (let c = y + 1; c < cols; c++) {
      quadrants[3] += grid[r][c];
    }
  }

  const res = quadrants.reduce((acc, count) => acc * count, 1);
  console.log(res);
}

function partTwo() {
  let time = 0;
  while (true) {
    const grid = Array.from({ length: H }, () => Array(W).fill("."));
    time++;

    for (let i = 0; i < robots.length; i++) {
      let [x, y] = robots[i].pos;
      let [v1, v2] = robots[i].v;

      x = wrap(x + v1, W);
      y = wrap(y + v2, H);

      robots[i].pos = [x, y];
      grid[x][y] = "X";
    }

    let count = 0;
    for (let i = 0; i < H; i++) {
      for (let j = 0; j < W; j++) {
        if (j < W - 1 - j && grid[i][j] === "X" && grid[i][W - 1 - j] === "X") {
          count++;
        }
      }
    }
    if (count >= 50) {
      // to check the tree in output
      // for (let y = 0; y < W; y++) {
      // let row = "";
      // for (let x = 0; x < H; x++) {
      //   row += grid[x][y];
      // }
      // console.log(row);
      // }
      console.log(time);
      return 0;
    }
  }
}

// partOne(W, H);
partTwo();
