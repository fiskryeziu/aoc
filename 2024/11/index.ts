import fs from "fs";

let data = fs.readFileSync("./input.txt", "utf-8").trim().split("\n");

const nums = data.map((x) => x.split(" ").map(Number))[0];

function digitCount(num: number) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}
function divideNumber(n: number) {
  let count = digitCount(n);

  let a = parseInt(n.toString().slice(0, count / 2), 10);
  let b = parseInt(n.toString().slice(count / 2, n), 10);

  return [a, b];
}

function partOne() {
  let result: number[][] = [nums];

  function helper(n: number, curr: number[]) {
    if (n === 25) {
      return;
    }
    for (const num of result[n]) {
      if (digitCount(num) % 2 === 0) {
        curr.push(...divideNumber(num));
      }
      if (num !== 0 && (num === 1 || digitCount(num) % 2 !== 0)) {
        curr.push(num * 2024);
      }
      if (num === 0) {
        curr.push(1);
      }
    }
    result.push(curr);

    helper(n + 1, []);
  }
  helper(0, []);

  console.log(result[25].length);
}

function partTwo(nums: number[]): void {
  let prevCount: Map<number, number> = new Map();

  for (const num of nums) {
    prevCount.set(num, (prevCount.get(num) || 0) + 1);
  }

  for (let n = 0; n < 75; n++) {
    let currCount: Map<number, number> = new Map();

    for (const [num, count] of prevCount) {
      const digits = digitCount(num);

      if (digits % 2 === 0) {
        const [a, b] = divideNumber(num);
        currCount.set(a, (currCount.get(a) || 0) + count);
        currCount.set(b, (currCount.get(b) || 0) + count);
      } else if (num !== 0) {
        const newNum = num * 2024;
        currCount.set(newNum, (currCount.get(newNum) || 0) + count);
      } else {
        currCount.set(1, (currCount.get(1) || 0) + count);
      }
    }

    prevCount = currCount;

    console.log(
      `Blinking ${n + 1}:  ${Array.from(currCount.values()).reduce((a, b) => a + b, 0)} stones`,
    );
  }
}
// unoptimized more than 41 level it gets heap out of memory error
partOne();

// more optimized, works for both parts
partTwo(nums);
