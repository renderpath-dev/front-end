// Goal:
// Compare let, const, and var scope.

// Expected output:
// inner
// outer
// 2

let statusLabel = "outer";

if (true) {
  let statusLabel = "inner";
  var legacyCounter = 2;
  console.log(statusLabel);
}

console.log(statusLabel);
console.log(legacyCounter);
