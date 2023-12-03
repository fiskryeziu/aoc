const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf8')
let result
const arr = data.split(/\r?\n/)
// const arr = [
//   '8-82,3-96',
//   '13-95,99-99',
//   '4-92,5-93',
//   '16-80,16-80',
//   '23-36,6-10',
//   '82-98,24-83',
//   '48-48,47-48',
//   '58-81,58-80',
//   '14-14,13-98',
//   '46-66,45-46',
// ]
// console.log(arr)
function getValues(array) {
  let total = 0
  for (let index = 0; index < array.length; index++) {
    const value = getPair(array[index])
    total += value
  }
  return total
}
const range = (start, end, length = end - start + 1) =>
  Array.from({ length }, (_, i) => start + i)

function getPair(pair) {
  let pairs = pair.split(',')
  const firstPairLeft = +pairs[0].split('-')[0]
  const firstPairRight = +pairs[0].split('-')[1]

  const secondPairLeft = +pairs[1].split('-')[0]
  const secondPairRight = +pairs[1].split('-')[1]

  let firstPairRange = range(firstPairLeft, firstPairRight)
  let secondPairRange = range(secondPairLeft, secondPairRight)

  const isSubset =
    firstPairRange.every((element) => secondPairRange.includes(element)) ||
    secondPairRange.every((element) => firstPairRange.includes(element))

  return isSubset ? 1 : 0
}

result = getValues(arr)

// result = range(2, 8)
console.log(result)
