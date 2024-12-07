import fs from 'fs'

let data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(x => x.split(''))

type CurrentKey = "^" | "v" | "<" | ">";

type Direction = {
    direction: [number, number];
    next: "^" | "v" | "<" | ">";
};

type DirectionMap = Record<CurrentKey, Direction>;

const directions: DirectionMap = {
    "^": { direction: [-1, 0], next: ">" },
    "v": { direction: [1, 0], next: "<" },
    "<": { direction: [0, -1], next: "^" },
    ">": { direction: [0, 1], next: "v" },
};

let rows = data.length
let cols = data[0].length

function moveGuard(
    el: CurrentKey,
    row: number,
    col: number,
) {
    let r = row
    let c = col

    while (true) {
        const dr = directions[el].direction[0];
        const dc = directions[el].direction[1];

        const inBound = r >= 0 && r < rows && c >= 0 && c < cols;

        if (!inBound) break

        if (r + dr < rows && c + dc < cols && data[r + dr][c + dc] === '#') {
            el = directions[el].next

        }
        else {
            data[r][c] = 'x'
            r += dr
            c += dc
        }
    }
}

function a() {
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let el = data[row][col];
            if (el === "^") {
                moveGuard(el, row, col);
            }
        }
    }
    const count = data.flat().reduce((acc, item) => item === 'x' ? acc + 1 : acc, 0)

    return count - 1
}


// function b() { }

console.log(a());
// console.log(b());
