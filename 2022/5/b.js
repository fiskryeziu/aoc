const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf8')
const arr = data.split(/\r?\n/)
let result

const inputPartExample = `
[G]                 [D] [R]        
[W]         [V]     [C] [T] [M]    
[L]         [P] [Z] [Q] [F] [V]    
[J]         [S] [D] [J] [M] [T] [V]
[B]     [M] [H] [L] [Z] [J] [B] [S]
[R] [C] [T] [C] [T] [R] [D] [R] [D]
[T] [W] [Z] [T] [P] [B] [B] [H] [P]
[D] [S] [R] [D] [G] [F] [S] [L] [Q]
 1   2   3   4   5   6   7   8   9 
`

function getArr(array) {
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
  const arrayFrom = object[`${from}`]
  const arrayTo = object[`${to}`]
  const removedElement = arrayFrom.splice(arrayFrom.length - value, value)
  //   console.log(removedElement)
  arrayTo.splice(object[`${to}`].length, 0, ...removedElement)

  return object
}
result = getArr(arr)
console.log(result)
