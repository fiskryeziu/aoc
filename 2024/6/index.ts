import fs from 'fs'

let data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(x => x.split(''))

const dirs = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1]
];
let rows = data.length;
let cols = data[0].length;

function a() {
    let el = data[0][0];
    let pos = [-1, -1]
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (data[row][col] === "^") {
                el = data[row][col]
                data[row][col] = '.'
                pos = [row, col]
                break;
            }
        }
    }

    let dir = 0

    let set = new Set()
    let [row, col] = pos
    while (true) {
        set.add(`${row}-${col}`)
        const [dr, dc] = dirs[dir]

        const r2 = row + dr
        const c2 = col + dc


        const inBound = r2 >= 0 && r2 < rows && c2 >= 0 && c2 < cols

        if (!inBound) break;

        if (data[r2][c2] !== "#") {
            row = r2
            col = c2
        } else {
            dir = (dir + 1) % 4
        }
    }
    console.log(set.size - 1)
}


function b() {
    let startP = [-1, -1]
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (data[row][col] === "^") {
                startP = [row, col]
                data[row][col] = '.'
                break
            }
        }
    }

    function solveCycle() {
        let pos = startP
        let dir = 0
        let [row, col] = pos
        const vis = new Uint8Array(rows * cols * 4)
        while (true) {
            const [dr, dc] = dirs[dir]
            let hash = (pos[0] * rows + pos[1]) * 4 + dir
            if (vis[hash] === 1) {
                return true
            }

            vis[hash] = 1
            const r2 = row + dr
            const c2 = col + dc


            const inBound = r2 >= 0 && r2 < rows && c2 >= 0 && c2 < cols

            if (!inBound) return false

            if (data[r2][c2] !== "#") {
                pos = [r2, c2]
                row = r2;
                col = c2;
            } else {
                dir = (dir + 1) % 4
            }
        }

    }

    let answer = 0
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (data[row][col] === '.' && !(startP[0] === row && startP[1] === col)) {
                data[row][col] = "#"
                if (solveCycle()) {
                    answer++
                }
                data[row][col] = "."

            }
        }
    }
    console.log(answer)
}


// a()
b()
