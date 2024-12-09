import fs from 'fs'

let data = fs.readFileSync('./input.txt', 'utf-8').trim().split('\n')

type Pairing = [number, number[]][]
const pairings: Pairing = data.map((line: string) => {
    const [left, right] = line.split(": ");
    return [+left, right.split(" ").map(Number)];
});
let sum = 0

function evaluateLeftToRight(numbers: number[], ops: string[]) {
    let result = numbers[0];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === '*') {
            result *= numbers[i + 1];
        } else if (ops[i] === '+') {
            result += numbers[i + 1];
        }
        else if (ops[i] === "||") {
            result = parseInt(result.toString() + numbers[i + 1].toString());
        }
    }
    return result;
}

function generateCombinations(
    target: any,
    values: number[],
    operations: string[],
    current: string[] = [],
): boolean {
    const n = values.length - 1;

    if (current.length === n) {
        const result = evaluateLeftToRight(values, current);
        if (result === target) {
            return true
        }
        return false
    }

    for (const op of operations) {
        current.push(op);
        if (generateCombinations(target, values, operations, current)) {
            return true;
        }

        // backtrack
        current.pop();
    }

    return false
}

const a = pairings.filter((pairing) => {
    return generateCombinations(pairing[0], pairing[1], ["+", "*"]);
});
// sum = a.reduce((acc, [curr]) => acc + curr, 0);
//
const b = pairings.filter((pairing) => {
    return generateCombinations(pairing[0], pairing[1], ["+", "*", "||"]);
});

sum = b.reduce((acc, [curr]) => acc + curr, 0);
console.log(sum);

