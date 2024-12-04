const fs = require('fs')

const arrOfString = fs.readFileSync("input.txt", "utf8").split("\n");


function isSafe(array) {
    const diffs = array.map((n, i) => n - array[i - 1]);
    diffs.shift()

    return diffs.every((n) => n >= -3 && n < 0) || diffs.every((n) => n <= 3 && n > 0)
}

function safeReportsA() {
    const arr = arrOfString.map((row) => row.split(" ").map((num) => parseInt(num, 10)));

    return arr.filter(num => isSafe(num)).length
}
function safeReportsB() {
    const arr = arrOfString.map((row) => row.split(" ").map((num) => parseInt(num, 10)));

    return arr.filter(num => {
        if (isSafe(num)) return true;
        for (let i = 0; i < num.length; i++) {
            if (isSafe(num.toSpliced(i, 1))) return true;
        }
    }).length
}




result = safeReportsA()
// result = safeReportsB()
console.log(result);

