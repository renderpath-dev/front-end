'use strict';

//Basic Syntax.js

/** Array literal **/
const empty = [];
const primes = ['a', 'b', 'c'];
const numbers = [943, 232, 1224];
const misc = [1.1, true, 'a'];

const or = 1234;
const ser = [or, or + 1, or + 2, or + 3, or + 4, or + 5, or];
const b = [
  [1, { x: 1, y: 1 }],
  [2, { x: 3, y: 4 }],
];

const udefs = [undefined, undefined];
console.log(udefs.length); //2

//Extended Operator
const base = [1, 2, 3, 4, 5];
const extendArr = [0, ...base, 6];
console.log(extendArr);

const original = [15, 20, 25, 30];
const copy = [...original];
copy[0] = 10; //Modifying the copy will not affect the original.
console.log(original[0]);

const digits = [...'0123456789ABCDEF'];
console.log(digits);
const letters = [...'Hello World'];
console.log([...new Set(letters)]);

/** Using the Array() constructor **/
const a = [];
const common = [1, 2, 3];
const c = Array.of(3);
console.log(c);
console.log(c.length);
console.log(Array(3));
console.log(Array.of(3));
const d = Array.from({ length: 5 }, function (_, index) {
  return index;
});
console.log(d);
/** Array.from 接收一个有 length 的对象
    -> 按 length 创建 5 个位置
    -> 对每个位置执行映射函数
    -> index 依次是 0, 1, 2, 3, 4
-> 得到 [0, 1, 2, 3, 4] **/
const e = new Array(5).fill(10);
console.log(e);

// Reading and Writing Array Elements
const w = ['World'];
const value1 = w[0];
w[1] = 3.14;
const ele = 2;
w[ele] = 2;
w[ele + 1] = 'hello';
w[w[ele]] = w[0];
console.log(w);

/** Array length **/
const array = [1, 2, 3, 4, 5, 6];
delete array[array.length - 3];
console.log(3 in array);
console.log(array);

array.length = 4;
console.log(4 in array);
console.log(array);

const wordArray = ['one', 'two', 'three', 'four'];
wordArray.push('five');
wordArray.pop();

/** Iterating over Arrays **/
const letter = [...'Hello JavaScript'];
let string = '';
for (let eachLetter of letter) {
  if (letter[eachLetter] === undefined) continue;
  string += eachLetter;
}
console.log(string);

let everyOther = '';
for (let [index, eachLetter] of letter.entries()) {
  if (index % 2 === 0) everyOther += eachLetter;
}
console.log(everyOther);

let upperCase = '';
letter.forEach((eachLetter) => {
  upperCase += eachLetter.toUpperCase();
});
console.log(upperCase);

let vowels = '';
for (let i = 0; i < letters.length; i++) {
  let letter = letters[i];
  if (/[aeiou]/.test(letter)) {
    vowels += letter;
  }
}
console.log(vowels);

// Multidimensional Array
const table = Array.from({ length: 10 }, function () {
  return Array.from({ length: 10 }, function () {
    return 0;
  });
});

for (let row = 0; row < table.length; row++) {
  for (let col = 0; col < table[row].length; col++) {
    table[row][col] = row * col;
  }
}
console.log(table[5][7]);