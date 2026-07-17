// Goal:
// Show that numbers beyond the safe integer boundary can lose precision.

// Expected output:
// true
// false
// true

const safeId = Number.MAX_SAFE_INTEGER;
const unsafeId = Number.MAX_SAFE_INTEGER + 1;
const nextUnsafeId = Number.MAX_SAFE_INTEGER + 2;

console.log(Number.isSafeInteger(safeId));
console.log(Number.isSafeInteger(unsafeId));
console.log(unsafeId === nextUnsafeId);
