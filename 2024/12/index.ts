import fs from "fs";

let data = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const a = data.map((x) => x.split(""));

const rows = a.length;
const visited: Record<string, boolean> = {};
const cols = a[0].length;
const inBound = (r: number, c: number) =>
  r >= 0 && r < rows && c >= 0 && c < cols;

const directions = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function findRegion(
  row: number,
  col: number,
): { area: number; perimeter: number } {
  if (visited[`${row}-${col}`]) return { area: 0, perimeter: 0 };

  visited[`${row}-${col}`] = true;

  const el = a[row][col];
  let area = 1;
  let perimeter = 4;

  for (const [dx, dy] of directions) {
    const newRow = row + dx;
    const newCol = col + dy;

    if (inBound(newRow, newCol)) {
      if (el === a[newRow][newCol]) {
        perimeter--;

        if (!visited[`${newRow}-${newCol}`]) {
          const { area: neighborArea, perimeter: neighborPerimeter } =
            findRegion(newRow, newCol);

          area += neighborArea;
          perimeter += neighborPerimeter;
        }
      }
    }
  }

  return { area, perimeter };
}

function partOne() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      visited[`${row}-${col}`] = false;
    }
  }

  let sum = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let key = `${row}-${col}`;
      if (!visited[key]) {
        const { area, perimeter } = findRegion(row, col);
        sum += area * perimeter;
        console.log(`Area: ${area}, Perimeter: ${perimeter}`);
      }
    }
  }

  console.log(sum);
}

function findSides(row: number, col: number, area: number, sides: number) {
  visited[`${row}-${col}`] = true;
  area++;

  function isSameRegion(dir: number[]) {
    const [dx, dy] = dir;

    const newRow = row + dx;
    const newCol = col + dy;

    return inBound(newRow, newCol) && a[newRow][newCol] === a[row][col];
  }

  for (let i = 0; i < 4; i++) {
    const dir = directions[i];
    const dir2 = directions[(i + 1) % 4];

    const newDir = [dir[0] + dir2[0], dir[1] + dir2[1]];
    if (!isSameRegion(dir) && !isSameRegion(dir2)) {
      sides++;
    }

    // newDir to check if its outside the neighbor
    if (isSameRegion(dir) && isSameRegion(dir2) && !isSameRegion(newDir)) {
      sides++;
    }
  }

  for (const dir of directions) {
    const [dx, dy] = dir;

    const newRow = row + dx;
    const newCol = col + dy;
    if (isSameRegion(dir) && !visited[`${newRow}-${newCol}`]) {
      const [newArea, newSides] = findSides(newRow, newCol, area, sides);
      area = newArea;
      sides = newSides;
    }
  }
  return [area, sides];
}

function partTwo() {
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      visited[`${row}-${col}`] = false;
    }
  }

  let sum = 0;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let key = `${row}-${col}`;
      if (!visited[key]) {
        let area = 0,
          sides = 0;
        const [calculatedArea, calculatedSides] = findSides(
          row,
          col,
          area,
          sides,
        );
        sum += calculatedArea * calculatedSides;
      }
    }
  }

  console.log(sum);
}

// partOne();
partTwo();
