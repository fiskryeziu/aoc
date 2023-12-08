const fs = require('fs')

const data = fs.readFileSync('./input.txt', 'utf-8')
let result
const arrOfString = data.split(/\r?\n/)

const seeds = arrOfString[0].replace("seeds: ", "").split(" ").map(Number);



const mapKeywords = [
    "seed-to-soil map:",
    "soil-to-fertilizer map:",
    "fertilizer-to-water map:",
    "water-to-light map:",
    "light-to-temperature map:",
    "temperature-to-humidity map:",
    "humidity-to-location map:"
];


const values = mapKeywords.reduce((acc, keyword) => {
    acc.push(arrOfString.indexOf(keyword));
    return acc;
}, []);



const maps = []
for (let i = 0; i < values.length; i++) {
    let lists = arrOfString.slice(values[i] + 1, values[i + 1]);


    let category = []
    for (const list of lists) {
        category.push(list.split(' ').map(Number))

    }

    maps.push(category)
}

let location = []
for (const seed of seeds) {
    let defaultValue = seed
    for (let i = 0; i < maps.length; i++) {
        const map = maps[i];
        for (const [to, from, range] of map) {
            if (defaultValue >= from && defaultValue <= from + range - 1) {
                defaultValue = to + (defaultValue - from)
                break
            }
        }
    }
    location.push(defaultValue)
}

console.log(location);
console.log(Math.min(...location));


