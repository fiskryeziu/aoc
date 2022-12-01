const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf8')
let result
const arrOfString = data.split(/\r?\n/)
const arr = arrOfString.map((item) => Number(item))

// console.log(arrofNum)
// const arr = [
//   5686, 2211, 1513, 7036, 5196, 10274, 2967, 2551, 0, 5942, 5827, 2514, 4024, 0,
// ]

// const firstArr = [5942, 5827, 2514, 4024]
//reduce while is not empty
//push the value to new array

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

// result = firstArr.reduce((acc, item) => acc + item, 0)
console.log('resultati i vlerave :' + newArr)
result = Math.max(...newArr)
console.log(result)
