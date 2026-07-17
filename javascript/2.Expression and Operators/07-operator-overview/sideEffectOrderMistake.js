// Goal:
// Show why mixing update side effects in one expression is hard to read.

let counter = 1;
const mixedResult = counter++ + counter++;

console.log(mixedResult);
console.log(counter);
