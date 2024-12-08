import fs from 'fs'

let data = fs.readFileSync('./input.txt', 'utf-8').split('\n').map(x => x.split(''))
