import fs from 'fs'

const data: string[] = fs.readFileSync('./input.txt', 'utf-8').split('\n')

const matrix = data.map(x => x.split(''))

const rows = matrix.length
const cols = matrix[0].length
const word = 'XMAS'

// part I 
const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
    [-1, -1],
    [1, 1],
    [-1, 1],
    [1, -1],
];

function inBounds(row: number, col: number): boolean {
    return row >= 0 && row < rows && col >= 0 && col < cols;
}

function checkDirection(row: number, col: number, dr: number, dc: number): boolean {
    let r = row;
    let c = col;

    for (let i = 0; i < word.length; i++) {
        if (!inBounds(r, c) || matrix[r][c] !== word[i]) {
            return false;
        }
        r += dr;
        c += dc;
    }

    return true;
}

function a() {
    let count = 0
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            for (const [dr, dc] of directions) {
                if (checkDirection(row, col, dr, dc)) {
                    count++;
                }
            }
        }
    }
    return count;

}



// part II 
function generateDiagonals(r: number, c: number): string[] {
    return [
        matrix[r - 1]?.[c - 1] + matrix[r]?.[c] + matrix[r + 1]?.[c + 1],

        matrix[r - 1]?.[c + 1] + matrix[r]?.[c] + matrix[r + 1]?.[c - 1],
    ];
}

function checkPattern(r: number, c: number): boolean {
    return generateDiagonals(r, c).every(
        (d) => d === "MAS" || d === "SAM"
    );
}

function b(): number {
    let count = 0;

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (checkPattern(r, c)) {
                count++;
            }
        }
    }

    return count;
}

console.log(a());
console.log(b());


