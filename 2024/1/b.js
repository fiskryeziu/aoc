const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
let result
const arrOfString = data.split(/\r?\n/).filter(x => x !== '')


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
