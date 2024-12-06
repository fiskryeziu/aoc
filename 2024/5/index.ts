import fs from 'fs'

const data: string[] = fs.readFileSync('./input.txt', 'utf-8').split('\n\n')

const pageOrderingRules = data[0].split("\n").map((line) => line.split("|").map(Number));
const pageNumbers = data[1].split("\n").map((line) => line.split(",").map(Number));

function checkRule(page: number[]): boolean {
    for (let i = 0; i < pageOrderingRules.length; i++) {
        const [left, right] = pageOrderingRules[i];

        const leftIndex = page.indexOf(left);
        const rightIndex = page.indexOf(right);

        if (!(leftIndex === -1 || rightIndex === -1 || leftIndex < rightIndex)) {
            return false;
        }
    }
    return true;
}
function a() {
    let page = []

    for (let i = 0; i < pageNumbers.length; i++) {
        let pageNumber = pageNumbers[i]
        if (checkRule(pageNumber)) {
            page.push(pageNumber)
        }
    }
    return page
        .map((item) => item[Math.floor(item.length / 2)])
        .reduce((a, b) => a + b, 0);

}

function checkRuleB(page: number[]): boolean {
    for (let i = 0; i < pageOrderingRules.length; i++) {
        const [left, right] = pageOrderingRules[i];

        const leftIndex = page.indexOf(left);
        const rightIndex = page.indexOf(right);

        if (!(leftIndex === -1 || rightIndex === -1 || leftIndex < rightIndex)) {
            return true;
        }
    }
    return false;
}
function sortPage(page: number[]): number[] {
    return page.slice().sort((a, b) => {
        for (let i = 0; i < pageOrderingRules.length; i++) {
            const [left, right] = pageOrderingRules[i];
            if ((a === left && b === right) || (a === right && b === left)) {
                return a === left ? -1 : 1;
            }
        }
        return 0;
    });
}

function b() {
    let page = []
    for (let i = 0; i < pageNumbers.length; i++) {
        let pageNumber = pageNumbers[i]
        if (checkRuleB(pageNumber)) {
            page.push(sortPage(pageNumber));
        }
    }
    return page
        .map((item) => item[Math.floor(item.length / 2)])
        .reduce((a, b) => a + b, 0);
}

console.log(a());
console.log(b())

