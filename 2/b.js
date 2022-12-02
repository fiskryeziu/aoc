const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf8')
let result
const arr = data.split(/\r?\n/)
const array = arr.map((item) => item.replace(' ', ''))
// const array = ['AY', 'BX', 'CZ']

function sumAllValues(array) {
  let valueOfRounds = []
  for (let i = 0; i < array.length; i++) {
    getArray(array[i], valueOfRounds)
  }
  return valueOfRounds.reduce((acc, item) => acc + item, 0)
}

function getArray(i, valueOfRounds) {
  let opponent = i[0]
  let user = i[1]

  let winValue = 0
  let drawValue = 0
  let value = 0
  let total
  if (user === 'X') {
    if (opponent === 'B') {
      value += 1
    } else if (opponent === 'C') {
      value += 2
    } else {
      value += 3
    }
  } else if (user === 'Y') {
    if (opponent === 'C') {
      value += 3
      drawValue += 3
    } else if (opponent === 'A') {
      value += 1
      drawValue += 3
    } else {
      value += 2
      drawValue += 3
    }
  } else if (user === 'Z') {
    if (opponent === 'A') {
      value += 2
      winValue += 6
    } else if (opponent === 'B') {
      value += 3
      winValue += 6
    } else {
      value += 1
      winValue += 6
    }
  }

  total = winValue + drawValue + value
  valueOfRounds.push(total)
}

result = sumAllValues(array)
console.log(result)
