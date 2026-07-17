// Goal:
// Compare nullish coalescing with logical OR defaults.

const zeroCount = 0;
const emptyLabel = "";
const missingValue = undefined;

console.log(zeroCount || 10);
console.log(zeroCount ?? 10);
console.log(emptyLabel || "fallback");
console.log(emptyLabel ?? "fallback");
console.log(missingValue ?? "fallback");
