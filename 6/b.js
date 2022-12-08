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

    if (newArr.length > 14) {
      newArr.shift()
    }
    if (newArr.length === 14 && isUnique(newArr)) {
      console.log(i + 1)
      break
    }
  }
}
valueMarker()
