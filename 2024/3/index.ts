const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8').split('\n')


function a() {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = [...data.matchAll(regex)].map(match => [match[1], match[2]]);
    let sum = 0
    for (const [l, r] of matches) {
        let multi = Number(l) * Number(r)
        sum += multi
    } return sum
}

function b() {
    const lines = data.join("");
    const regex = /do\(\)|don't\(\)|mul\((\d{1,3}),(\d{1,3})\)/g;
    const matches = [...lines.matchAll(regex)]

    let doo = true;
    let sum = 0;

    for (const match of matches) {
        const instruction = match[0];
        if (instruction === "do()") {
            doo = true;
        } else if (instruction === "don't()") {
            doo = false;
        } else if (instruction.startsWith("mul")) {
            if (doo) {
                const x = parseInt(match[1], 10);
                const y = parseInt(match[2], 10);
                sum += x * y;
            }
        }
    }
    return sum
}

console.log(a());
console.log(b());


