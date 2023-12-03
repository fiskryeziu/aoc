const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf8')
let result
const arr = data.split(/\r?\n/)
// const array = arr.map((item) => item.replace(' ', ''))

// const arr = [
//   'vJrwpWtwJgWrhcsFMMfFFhFp',
//   'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
//   'PmmdzqPrVvPwwTWBwg',
//   'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
//   'ttgJtRGJQctTZtZT',
//   'CrZsJsPPZsGzwwsLwLmpwMDw',
// ]

function findItemType(array) {
  let items = []
  for (let index = 0; index < array.length; index++) {
    const element = array[index]
    const length = array[index].length
    const mid = length / 2
    let string = findPriority(element, mid, length)

    if (string.toUpperCase() === string) {
      items.push(string.charCodeAt(0) - 38)
    } else {
      items.push(string.charCodeAt(0) - 96)
    }
  }
  return items
}

function findPriority(element, mid, arrayLength) {
  const first = element.slice(0, mid).split('')
  const second = element.slice(mid, arrayLength).split('')
  let priorityString

  for (let index = 0; index < first.length; index++) {
    const firstWord = first[index]

    const priority = second.find((x) => x === firstWord)
    if (priority !== undefined) {
      priorityString = priority
    }
  }
  return priorityString
}

let arrayItems = findItemType(arr)

result = arrayItems.reduce((acc, item) => acc + item, 0)

console.log(result)
