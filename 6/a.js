const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf8')
const arr = data.replace(/\r?\n/, '').trim()
let result

function isUnique(array) {
  return new Set(array).size === array.length
}

function valueMarker() {
  let i
  let newArr = []
  for (i = 0; i <= arr.length; i++) {
    newArr.push(arr[i])

    if (newArr.length > 4) {
      newArr.shift()
    }
    if (newArr.length === 4 && isUnique(newArr)) {
      return i + 1
      break
    }
  }
}

result = valueMarker(arr)
console.log(result)