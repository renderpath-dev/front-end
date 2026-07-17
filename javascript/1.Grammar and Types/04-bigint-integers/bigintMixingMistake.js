// Goal:
// Verify that BigInt and Number cannot be mixed in arithmetic.

// Expected output:
// TypeError
// 12

const stockCount = 10n;
const addedCount = 2;

try {
  console.log(stockCount + addedCount);
} catch (error) {
  console.log(error.constructor.name);
}

console.log(stockCount + BigInt(addedCount));
