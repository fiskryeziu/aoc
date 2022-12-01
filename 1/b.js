const fs = require('fs')

const data = fs.readFileSync('./1/input.txt', 'utf8')
let result
const arrOfString = data.split(/\r?\n/)
const arr = arrOfString.map((item) => Number(item))

const newArr = []

result = arr.reduce((acc, item) => {
  if (item === 0) {
    newArr.push(acc)
    acc = 0
  } else {
    return acc + item
  }
  return acc
}, 0)

const sumOfTopThree = newArr
  .sort((a, b) => b - a)
  .slice(0, 3)
  .reduce((acc, item) => acc + item, 0)

console.log(sumOfTopThree)
