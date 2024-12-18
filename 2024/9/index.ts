import fs from "fs";

let data = fs
  .readFileSync("./input.txt", "utf-8")
  .trim()
  .split("\n")
  .map((x) => x.split("").map(Number));

let a = data[0];
const n = a.length;

function partOne() {
  let arr = [];
  let temp = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < a[i]; j++) {
      if ((i + 1) % 2 === 1) {
        arr.push(temp);
        if (j + 1 === a[i]) {
          temp++;
        }
      } else {
        arr.push(".");
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i] !== "number") {
      swap(arr, i);
    }
  }

  function swap(a: (number | string)[], start: number) {
    for (let i = a.length - 1; i >= start; i--) {
      const el = a[i];
      if (el !== ".") {
        [[a[start]], [a[i]]] = [[a[i]], [a[start]]];
        break;
      }
    }
    return a;
  }

  let res = arr.reduce((acc: number, item: number | string, idx: number) => {
    if (item === ".") return acc;

    if (typeof item === "number") {
      return acc + item * idx;
    }
    return acc;
  }, 0);

  console.log(res); // part 1 correct
}

function partTwo() {
  let fileId = 0;
  let disk: number[] = [];
  for (let i = 0; i < n; i++) {
    const length = parseInt(a[i], 10);
    if (i % 2 === 0) {
      for (let j = 0; j < length; j++) disk.push(fileId);
      fileId++;
    } else {
      for (let j = 0; j < length; j++) disk.push(-1);
    }
  }
  const fileCount = fileId;

  for (let currentFileId = fileCount - 1; currentFileId >= 0; currentFileId--) {
    let l = -1,
      r = -1;
    for (let j = 0; j < disk.length; j++) {
      if (disk[j] === currentFileId) {
        if (l < 0) l = j;
        r = j;
      }
    }
    if (l < 0) continue;

    const fileLength = r - l + 1;
    const freeSpan = findFreeSlot(disk, l, fileLength);
    if (freeSpan == null) continue;

    for (let k = 0; k < fileLength; k++) disk[freeSpan + k] = currentFileId;

    for (let i = l; i <= r; i++) disk[i] = -1;
  }
  console.log(disk);

  function findFreeSlot(disk: number[], maxEnd: number, maxLength: number) {
    const limit = maxEnd - 1;
    if (limit < 0) return null;
    let start = -1,
      currentLength = 0;
    for (let i = 0; i <= limit; i++) {
      if (disk[i] === -1) {
        if (start < 0) start = i;
        currentLength++;
        if (currentLength >= maxLength) return start;
      } else {
        start = -1;
        currentLength = 0;
      }
    }
    return null;
  }

  let res = disk.reduce((acc: number, item: number | string, idx: number) => {
    if (item === -1) return acc;

    if (typeof item === "number") {
      return acc + item * idx;
    }
    return acc;
  }, 0);

  console.log(res); // part 2
}
// partOne();
partTwo();
