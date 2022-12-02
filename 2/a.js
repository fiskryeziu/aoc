const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf8')
let result
const arr = data.split(/\r?\n/)
const array = arr.map((item) => item.replace(' ', ''))
// const array = ['AY', 'BX', 'CZ', 'AX']
// console.log(arr)
// 1 for Rock
// 2 for Paper
// 3 for Scissors
// 0 if you lost
// 3 if the round was a draw
// and 6 if you won).
// oponent A rock B paper C scissors
// me X rock  Y paper Z Scissors

//check through rounds
function sumAllValues(array) {
  let valueOfRounds = []
  for (let i = 0; i < array.length; i++) {
    getArray(array[i], valueOfRounds)
  }
  return valueOfRounds.reduce((acc, item) => acc + item, 0)
}

//exit
function getArray(i, valueOfRounds) {
  let opponent = i[0]
  let user = i[1]

  let winValue = 0
  let drawValue = 0
  let value = 0
  let total
  if (i === 'AX' || i === 'BY' || i === 'CZ') {
    drawValue = 3
    if (user === 'X') {
      value += 1
    } else if (user === 'Y') {
      value += 2
    } else {
      value += 3
    }
  } else if (user === 'X') {
    if (opponent === 'B') {
      value += 1
    } else {
      value += 1
      winValue += 6
    }
  } else if (user === 'Y') {
    if (opponent === 'C') {
      value += 2
    } else {
      value += 2
      winValue += 6
    }
  } else if (user === 'Z') {
    if (opponent === 'A') {
      value += 3
    } else {
      value += 3
      winValue += 6
    }
  }

  total = winValue + drawValue + value
  valueOfRounds.push(total)
}

result = sumAllValues(array)
console.log(result)
