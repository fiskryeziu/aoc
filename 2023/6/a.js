const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
let result
const arrOfString = data.split(/\r?\n/)


// part I 
function getMultipliedNumber(array) {
    const [first, second] = array.map(row => row.split(':'))
    const [, dValues] = second.map(item => item.trim().split(' '))
    const distance = dValues.filter(x => x.trim() != '')
    const [, values] = first.map(item => item.trim().split(' '))
    const time = values.filter(x => x.trim() != '')
    let sum = 1
    for (let i = 0; i < time.length; i++) {
        let count = 0
        for (let j = 0; j < time[i]; j++) {
            let speed = j
            let remaining = +time[i] - speed
            if ((remaining * speed) > +distance[i]) {
                count++
            }

        }
        sum *= count
    }
    return sum
}


result = getMultipliedNumber(arrOfString)




// part II 
function getMultipliedNumber(array) {
    const [first, second] = array.map(row => row.split(':'))
    const [, dValues] = second.map(item => item.trim().split(' '))
    const distance = dValues.filter(x => x.trim() != '').join('')

    const [, values] = first.map(item => item.trim().split(' '))
    const time = values.filter(x => x.trim() != '').join('')
    let sum = 0
    for (let i = 0; i < 1; i++) {
        let count = 0
        for (let j = 0; j < time; j++) {
            let speed = j
            let remaining = +time - speed
            if ((remaining * speed) > +distance) {
                count++
            }

        }
        sum = count
    }
    return sum
}

result = getMultipliedNumber(arrOfString)
