const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
let result
const arrOfString = data.split(/\r?\n/).filter(x => x !== '')


function findTotalDistance() {
    let distance, left = [], right = []

    for (let i = 0; i <= arrOfString.length - 1; i++) {
        let [first, second] = arrOfString[i].split('  ').map(x => +x.trim())

        left.push(first)
        right.push(second)
    }

    left.sort((a, b) => a - b)
    right.sort((a, b) => a - b)


    distance = left.reduce((acc, num, idx) => {
        return acc += Math.abs(right[idx] - num)
    }, 0)
    return distance
}

// 1941353
// result = findTotalDistance()
//
function totalSimilarity() {
    let score = 0, left = [], right = []

    for (let i = 0; i <= arrOfString.length - 1; i++) {
        let [first, second] = arrOfString[i].split('  ').map(x => +x.trim())

        left.push(first)
        right.push(second)
    }

    for (const leftNum of left) {
        let count = 0
        for (const rightNum of right) {
            if (leftNum === rightNum) count++
        }
        score += leftNum * count
    }
    return score
}
result = totalSimilarity()

console.log(result);
