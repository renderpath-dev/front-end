// Goal:
// Use a Symbol as a property key.

// Expected output:
// Keyboard
// secret
// undefined
// 1

const internalCodeKey = Symbol("internalCode");

const productRecord = {
  title: "Keyboard",
  [internalCodeKey]: "secret",
};

console.log(productRecord.title);
console.log(productRecord[internalCodeKey]);
console.log(productRecord.internalCodeKey);
console.log(Object.getOwnPropertySymbols(productRecord).length);
