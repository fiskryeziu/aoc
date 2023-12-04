const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
let result
const arrOfString = data.split(/\r?\n/)


//part 1
const games = arrOfString.filter(game => game.trim() !== ' ')
function sumOfIdCubes(games) {
    let gamesCount = {
        blue: '14',
        green: '13',
        red: '12'
    }
    return games.map(game => {
        const [_, colorInfo] = game.split(':')
        const colors = colorInfo.split(';')
        return colors.every(color => {
            const colorPair = color.trim().split(',').map(item => item.trim().split(' '))
            return colorPair.every(([count, color]) => gamesCount[color] >= Number(count))

        })
    }).reduce((acc, result, i) => {
        return result ? acc + (i + 1) : acc
    }, 0)

}
result = sumOfIdCubes(games)

// console.log(result);

//part 2 
function sumOfIdCubes(games) {
    return games.map(game => {
        const [_, colorInfo] = game.split(':')
        const colors = colorInfo.split(';')

        let gamesCount = {
            blue: -Infinity,
            red: -Infinity,
            green: -Infinity,
        }
        let product = 1
        colors.map(color => {
            const colorPair = color.trim().split(',').map(item => item.trim().split(' '))
            let a = colorPair.map(([count, color]) => gamesCount[color] = Math.max(count, gamesCount[color]))
        })
        for (const key in gamesCount) {
            product *= gamesCount[key]
        }
        return product

    }).reduce((acc, result) => {
        return acc + result
    }, 0)

}
result = sumOfIdCubes(games)

// console.log(result);

