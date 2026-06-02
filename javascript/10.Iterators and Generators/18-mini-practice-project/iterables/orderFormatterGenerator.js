// Goal:
// Export generators that format order batches and summaries.

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export function* createOrderLineGenerator(orderBatch) {
  for (const orderRecord of orderBatch) {
    yield `${orderRecord.id}:${orderRecord.region}:${currencyFormatter.format(orderRecord.amount)}`;
  }
}

export function* createRegionSummaryGenerator(orderRecords) {
  const regionTotalMap = new Map();

  for (const orderRecord of orderRecords) {
    const previousTotal = regionTotalMap.get(orderRecord.region) ?? 0;
    regionTotalMap.set(orderRecord.region, previousTotal + orderRecord.amount);
  }

  for (const [regionName, totalAmount] of regionTotalMap) {
    yield `${regionName}:${currencyFormatter.format(totalAmount)}`;
  }
}
