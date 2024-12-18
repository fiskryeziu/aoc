function partTwo() {
  let arr = [
    0,
    0,
    ".",
    ".",
    ".",
    1,
    1,
    1,
    ".",
    ".",
    ".",
    2,
    ".",
    ".",
    ".",
    3,
    3,
    3,
    ".",
    4,
    4,
    ".",
    5,
    5,
    5,
    5,
    ".",
    6,
    6,
    6,
    6,
    ".",
    7,
    7,
    7,
    ".",
    8,
    8,
    8,
    8,
    9,
    9,
  ];

  let start = 0;
  let end = 0;
  let lastSearchedIdx = arr.length - 1;

  // First pass: Move all files to the left
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === ".") {
      start = i;
      while (typeof arr[i + 1] !== "number") {
        i++;
      }
      end = i;
      if (start === end) break;
      swap(arr, start, end);
      continue;
    }
  }

  function swap(a: (number | string)[], l: number, r: number) {
    const dotsLength = r - l + 1;
    let r2 = 0,
      l2 = 0;

    for (let i = lastSearchedIdx; i >= l; i--) {
      const el = a[i];
      if (el !== ".") {
        r2 = i;
        while (a[i - 1] === a[i]) {
          i--;
        }
        l2 = i;

        const rangeLength = r2 - l2 + 1;
        if (rangeLength > dotsLength) continue;
        else {
          break;
        }
      }
    }

    const rangeLength1 = r2 - l2 + 1;
    const swapLength = Math.min(rangeLength1, dotsLength);

    if (r2 > 0 || l2 > 0) {
      for (let i = 0; i < swapLength; i++) {
        [a[l + i], a[l2 + i]] = [a[l2 + i], a[l + i]];
      }
      lastSearchedIdx = l2;
    }
  }

  console.log(arr);
}
