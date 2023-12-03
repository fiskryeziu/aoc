const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
let result
const arrOfString = data.split(/\r?\n/)

const sumExtractedNum = (res) => {
    for (let i = 0; i < res.length; i++) {
        let num = ''
        for (let j = 0; j < res[i].length; j++) {
            if (!isNaN(parseInt(res[i][j]))) {
                num += res[i][j]
            }

        }
        res[i] = +(num[0] + num[num.length - 1])
    }
    return res.reduce((acc, num) => acc + num, 0)
}
result = sumExtractedNum(arrOfString)
console.log(result);