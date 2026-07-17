// Goal:
// Compare var hoisting with let and const temporal dead zone.

// Expected output:
// undefined
// ReferenceError
// TypeError

console.log(legacyStatus);
var legacyStatus = "ready";

try {
  console.log(modernStatus);
} catch (error) {
  console.log(error.constructor.name);
}

let modernStatus = "ready";

const lockedStatus = "ready";
try {
  lockedStatus = "changed";
} catch (error) {
  console.log(error.constructor.name);
}
