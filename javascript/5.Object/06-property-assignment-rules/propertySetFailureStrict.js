// Goal:
// Verify that strict mode reports failed writes to read-only properties.

"use strict";

const lockedProduct = {};

Object.defineProperty(lockedProduct, "sku", {
  value: "LOCKED-1",
  writable: false,
  enumerable: true,
  configurable: true,
});

try {
  lockedProduct.sku = "LOCKED-2";
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(lockedProduct.sku);
}
