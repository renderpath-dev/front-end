// Goal:
// Verify concurrent promise startup with Promise.all.

function loadMetric(labelText) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(labelText);
    }, 10);
  });
}

async function loadMetricsConcurrently() {
  const firstMetricPromise = loadMetric('views');
  const secondMetricPromise = loadMetric('orders');

  const metricList = await Promise.all([
    firstMetricPromise,
    secondMetricPromise,
  ]);

  console.log(metricList.join(','));
}

async function main() {
  await loadMetricsConcurrently();
}
main().catch((error) => {
  console.error(error.message);
})