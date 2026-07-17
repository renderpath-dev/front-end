// Goal:
// Print important explicit conversion results.

// Expected output:
// See the printed table.

const values = ["", "0", "false", "42", "42px", null, undefined, true, false];

for (const value of values) {
  console.log(`${String(value)} -> number:${Number(value)} boolean:${Boolean(value)}`);
}
