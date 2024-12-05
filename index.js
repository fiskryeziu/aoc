"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var data = fs_1.default.readFileSync('./input.txt', 'utf-8').trim().split('\n');
// This word search allows words to be horizontal, vertical,
// diagonal, written backwards, or even overlapping other words.
function a() {
    // console.log(data);
    var matrix = data.map(function (x) { return x.split(''); });
    console.log(matrix);
}
console.log(a());
