// Goal:
// Verify why reduce should usually receive an explicit initial value.

const emptyTotals = [];

try {
  const total = emptyTotals.reduce((sum, value) => sum + value);
  console.log(total);
} catch (error) {
  console.log(error.name);
  console.log(error.message.includes('empty array'));
}

const safeTotal = emptyTotals.reduce((sum, value) => sum + value, 0);
console.log(safeTotal);
