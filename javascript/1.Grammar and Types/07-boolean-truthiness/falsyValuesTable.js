// Goal:
// Print every common falsy value.

// Expected output:
// false: false
// 0: false
// -0: false
// 0n: false
// empty string: false
// null: false
// undefined: false
// NaN: false

const falsyValues = [
  ["false", false],
  ["0", 0],
  ["-0", -0],
  ["0n", 0n],
  ["empty string", ""],
  ["null", null],
  ["undefined", undefined],
  ["NaN", NaN],
];

for (const [label, value] of falsyValues) {
  console.log(`${label}: ${Boolean(value)}`);
}
