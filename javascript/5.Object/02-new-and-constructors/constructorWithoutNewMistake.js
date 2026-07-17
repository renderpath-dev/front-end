// Goal:
// Show why a constructor function should be called with new.

"use strict";

function ProductSnapshot(sku, price) {
  this.sku = sku;
  this.price = price;
}

try {
  ProductSnapshot("HD-204", 129);
} catch (error) {
  console.log(error instanceof TypeError);
  console.log(error.name);
}
