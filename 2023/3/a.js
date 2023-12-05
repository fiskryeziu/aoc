const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
let result
const arrOfString = data.split(/\r?\n/)
const rows = arrOfString.map(item => item.split(''));


// Function to check if a character is a digit
function isDigit(char) {
    return /^\d$/.test(char);
}

// Function to find neighbors of a position
function neighbors([x, y]) {
    const directions = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1], [0, 1],
        [1, -1], [1, 0], [1, 1]];

    return directions.map(([dx, dy]) => [x + dx, y + dy]);
}

const symbols = {};
const digits = [];
const numbers = {};

rows.forEach((line, y) => {
    line.forEach((c, x) => {
        if (c === ".") return;

        // add symbols the pos x, y as keys
        if (!isDigit(c)) {
            symbols[`${x},${y}`] = c;

            return;
        }

        if (x && isDigit(line[x - 1])) {
            digits[digits.length - 1] += c;
        } else {
            digits.push(c);
        }

        numbers[`${x},${y}`] = digits.length - 1;
    });
});

let partOne = 0;
let partTwo = 0;

Object.entries(symbols).forEach(([position, s]) => {
    const [x, y] = position.split(',').map(Number);
    const neighborsSet = new Set();

    // neighbors of symbols 
    neighbors([x, y]).forEach(([nx, ny]) => {
        const neighborPosition = `${nx},${ny}`;

        if (numbers[neighborPosition] !== undefined) {
            neighborsSet.add(numbers[neighborPosition]);
        }
    });

    //get the unique neightbors with the help of pos of neighborsSet value
    // & digits
    const uniqueNeighbors = Array.from(neighborsSet).map(i => digits[i]);
    partOne += uniqueNeighbors.reduce((sum, num) => sum + parseInt(num, 10), 0);

    if (s === "*" && uniqueNeighbors.length === 2) {
        partTwo += uniqueNeighbors.reduce((product, num) => product * parseInt(num, 10), 1);
    }
});

console.log("Part 1:", partOne);
console.log("Part 2:", partTwo);
