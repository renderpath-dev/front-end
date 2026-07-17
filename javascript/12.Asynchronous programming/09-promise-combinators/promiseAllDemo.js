// Goal:
// Verify that Promise.all waits for all fulfillments.

function loadMetric(labelText, valueNumber) {
  return Promise.resolve({ label: labelText, value: valueNumber });
}

Promise.all([
  loadMetric('views', 100),
  loadMetric('orders', 12),
  loadMetric('refunds', 1),
]).then((metricList) => {
  console.log(metricList.map((metricRecord) => metricRecord.label).join(','));
});
