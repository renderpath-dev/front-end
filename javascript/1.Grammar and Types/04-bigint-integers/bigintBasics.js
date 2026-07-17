// Goal:
// Show BigInt identity and safe integer boundaries.

// Expected output:
// bigint
// 9007199254740993
// false
// true

const unsafeNumberId = 9007199254740993;
const preciseBigIntId = 9007199254740993n;

console.log(typeof preciseBigIntId);
console.log(preciseBigIntId.toString());
console.log(Number.isSafeInteger(unsafeNumberId));
console.log(Number.isSafeInteger(Number.MAX_SAFE_INTEGER));
