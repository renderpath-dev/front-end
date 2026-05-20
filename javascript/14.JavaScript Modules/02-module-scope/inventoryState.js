const internalStockLimit = 100;

export function checkStockLevel (stockCount) {
  return stockCount <= internalStockLimit;
}