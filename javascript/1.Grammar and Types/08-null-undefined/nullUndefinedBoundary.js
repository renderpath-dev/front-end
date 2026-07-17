// Goal:
// Distinguish undefined from null.

// Expected output:
// undefined
// undefined
// object
// fallback
// 0

let selectedSize;
const productRecord = { title: "Keyboard", discount: null, stock: 0 };

console.log(selectedSize);
console.log(productRecord.missingField);
console.log(typeof productRecord.discount);
console.log(productRecord.discount ?? "fallback");
console.log(productRecord.stock ?? 10);
