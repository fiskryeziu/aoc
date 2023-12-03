const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf8')
let result
const arr = data.split(/\r?\n/)

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
    firstPairRange.some((element) => secondPairRange.includes(element)) ||
    secondPairRange.some((element) => firstPairRange.includes(element))

  return isSubset ? 1 : 0
}

result = getValues(arr)

// result = range(2, 8)
console.log(result)
