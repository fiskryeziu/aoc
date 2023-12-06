
const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
let result
const arrOfString = data.split(/\r?\n/)
const rows = arrOfString.map(item => item.split(''));

function removeEmptyStrings(arr) {
    return arr.filter(str => str.trim() !== '');
}


const totalPoints = (rows, sum = 0) => {

    rows.forEach((row) => {
        const [_, numbersInfo] = (row.split(':'))
        const [numbers, luckyNumbers] = (numbersInfo.trim().split('|'))

        let count = 0
        removeEmptyStrings(numbers.split(' ')).forEach(number => {
            if (removeEmptyStrings(luckyNumbers.split(' ')).includes(number)) {

                if (count === 0) {
                    count++
                } else {
                    count *= 2
                }
            }

        })
        sum += count

    })

    return sum
}

// result = totalPoints(arrOfString, 0)

//part 2 
const totalScratchCards = (rows) => {
    const card = new Array(rows.length).fill(1)
    rows.forEach((row, index) => {
        const [_, numbersInfo] = (row.split(':'))
        const [numbers, luckyNumbers] = (numbersInfo.trim().split('|'))

        const cleanedNumbers = removeEmptyStrings(numbers.split(' '));
        const cleanedLuckyNumbers = removeEmptyStrings(luckyNumbers.split(' '));

        const count = cleanedNumbers.reduce((acc, number) => {
            return acc + cleanedLuckyNumbers.includes(number);
        }, 0);

        if (count) {
            for (let i = index + 1; i < index + 1 + count; i++) {
                if (card[i]) {
                    card[i] += card[index] || 0
                }
            }
        }

    })

    return card.reduce((acc, item) => {
        return acc + item
    }, 0)

}

// result = totalScratchCards(arrOfString, 0)
// console.log(result);
