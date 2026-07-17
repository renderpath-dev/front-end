// Goal:
// Verify why Array.fill with an object or array reference can create shared rows.

const sharedGrid = new Array(3).fill([]);
sharedGrid[0].push('x');

console.log(sharedGrid);
console.log(sharedGrid[0] === sharedGrid[1]);

const isolatedGrid = Array.from({ length: 3 }, () => []);
isolatedGrid[0].push('x');

console.log(isolatedGrid);
console.log(isolatedGrid[0] === isolatedGrid[1]);
