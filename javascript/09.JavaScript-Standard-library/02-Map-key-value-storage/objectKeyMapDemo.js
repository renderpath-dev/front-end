const productRecordA = {sku : "KB-01"};
const productRecordB = {sku : "KB-01"};

const productStockMap = new Map();
productStockMap.set(productRecordA,12);
productStockMap.set(productRecordB,8);

console.log(productStockMap.get(productRecordA));
console.log(productStockMap.get(productRecordB));
console.log(productStockMap.size);