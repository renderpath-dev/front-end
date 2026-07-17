// Goal:
// Verify that Object.assign mutates the target object and copies enumerable own properties.

const targetProduct = {
  sku: "MUG-1",
  stock: 3,
};

const pricePatch = {
  price: 15,
};

const stockPatch = {
  stock: 8,
};

const returnedProduct = Object.assign(targetProduct, pricePatch, stockPatch);

console.log(returnedProduct === targetProduct);
console.log(targetProduct.stock);
console.log(targetProduct.price);
