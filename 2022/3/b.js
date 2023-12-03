const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf8')
let result
const arr = data.split(/\r?\n/)

function groupArray(array) {
  let items = []
  for (let index = 0; array.length >= 3; index += 3) {
    let string = getValues(array.slice(0, 3))
    array.splice(0, 3)
    console.log(array.length)
    if (string.toUpperCase() === string) {
      items.push(string.charCodeAt(0) - 38)
    } else {
      items.push(string.charCodeAt(0) - 96)
    }
  }
  return items
}

function getValues(values) {
  const first = values[0].split('')
  const second = values[1].split('')
  const third = values[2].split('')
  let priorityString
  if (values.length > 0) {
    const priority = first.filter(
      (element) => second.includes(element) && third.includes(element)
    )
    const set = new Set(priority)
    const string = Array.from(set).join(' ')

    if (priority !== undefined) {
      priorityString = string
    }
  }
  return priorityString
}

let arrayItems = groupArray(arr)

result = arrayItems.reduce((acc, item) => acc + item, 0)

// result = groupArray(arr)

console.log(result)
