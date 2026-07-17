// Goal:
// Verify labeled break in nested loops.

const rows = [
  ["empty", "empty"],
  ["empty", "target"],
  ["empty", "empty"],
];

let foundPosition = null;

searchGrid: for (let rowIndex = 0; rowIndex < rows.length; rowIndex++) {
  for (let columnIndex = 0; columnIndex < rows[rowIndex].length; columnIndex++) {
    if (rows[rowIndex][columnIndex] !== "target") {
      continue;
    }

    foundPosition = `${rowIndex},${columnIndex}`;
    break searchGrid;
  }
}

console.log(foundPosition);
