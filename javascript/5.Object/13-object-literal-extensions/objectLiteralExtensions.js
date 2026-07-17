// Goal:
// Use property shorthand, computed property names, symbol keys, and method shorthand.

const sku = "BAG-22";
const stock = 7;
const dynamicField = "warehouse";
const syncSymbol = Symbol("sync");

const inventoryItem = {
  sku,
  stock,
  [dynamicField]: "west",
  [syncSymbol]: true,
  describe() {
    return `${this.sku}:${this.stock}`;
  },
};

console.log(inventoryItem.sku);
console.log(inventoryItem.warehouse);
console.log(inventoryItem.describe());
console.log(Object.getOwnPropertySymbols(inventoryItem).length);
