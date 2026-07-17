// Goal:
// Show primitive assignment copies the primitive value.

// Expected output:
// 10
// 20

let firstCount = 10;
let secondCount = firstCount;

secondCount = 20;

console.log(firstCount);
console.log(secondCount);
