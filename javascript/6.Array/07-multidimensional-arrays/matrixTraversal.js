// Goal:
// Build and traverse a two-dimensional array.

const salesMatrix = [
  [10, 12, 14],
  [8, 11, 13],
  [15, 9, 16],
];

let totalSales = 0;

for (let rowIndex = 0; rowIndex < salesMatrix.length; rowIndex += 1) {
  const row = salesMatrix[rowIndex];

  for (let columnIndex = 0; columnIndex < row.length; columnIndex += 1) {
    totalSales += row[columnIndex];
  }
}

console.log(totalSales);
console.log(salesMatrix[1][2]);
