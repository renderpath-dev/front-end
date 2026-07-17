// Goal:
// Verify that an object stores named properties and is copied by reference.

const productRecord = {
  sku: "BK-101",
  title: "JavaScript Guide",
  stock: 8,
};

const inventoryAlias = productRecord;
inventoryAlias.stock = inventoryAlias.stock - 2;

console.log(productRecord.stock);
console.log(productRecord === inventoryAlias);
