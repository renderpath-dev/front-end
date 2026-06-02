const productRecord = {};

Object.defineProperty(productRecord, 'sku', {
  value: 'KB-001',
  writable: false,
  enumerable: true,
  configurable: true,
});

try {
  productRecord.sku = 'KB-999';
} catch (error) {
  console.log(error.message);
}

console.log(productRecord.sku);
console.log(Object.keys(productRecord));
