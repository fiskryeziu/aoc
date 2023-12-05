const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
let result
const arrOfString = data.split(/\r?\n/)
const rows = arrOfString.map(item => item.split(''));
