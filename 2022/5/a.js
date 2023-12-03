const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf8')
const arr = data.split(/\r?\n/)
let result

// const current = [
//   'move 1 from 2 to 1',
//   'move 3 from 1 to 3',
//   'move 2 from 2 to 1',
//   'move 1 from 1 to 2',
// ]

function getArr(array) {
  //   const obj = { 1: ['Z', 'N'], 2: ['M', 'C', 'D'], 3: ['P'] }
  const obj = {
    1: ['D', 'T', 'R', 'B', 'J', 'L', 'W', 'G'],
    2: ['S', 'W', 'C'],
    3: ['R', 'Z', 'T', 'M'],
    4: ['D', 'T', 'C', 'H', 'S', 'P', 'V'],
    5: ['G', 'P', 'T', 'L', 'D', 'Z'],
    6: ['F', 'B', 'R', 'Z', 'J', 'Q', 'C', 'D'],
    7: ['S', 'B', 'D', 'J', 'M', 'F', 'T', 'R'],
    8: ['L', 'H', 'R', 'B', 'T', 'V', 'M'],
    9: ['Q', 'P', 'D', 'S', 'V'],
  }
  let result
  for (let index = 0; index < array.length; index++) {
    const element = array[index].split(' ')
    const valueToMove = element[1]
    const fromCargo = element[3]
    const toCargo = element[5]

    result = arrangeCargo(obj, valueToMove, fromCargo, toCargo)
  }
  return result
}

function arrangeCargo(object, value, from, to) {
  //   console.log(object)
  const arrayFrom = object[`${from}`]
  for (let index = 0; index < value; index++) {
    const removedElement = arrayFrom.pop()
    const arrayTo = object[`${to}`].push(removedElement)
  }
  return object
}

result = getArr(arr)
console.log(result)
