const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
let result
const arrOfString = data.trim().split("\n")

console.log(result);
