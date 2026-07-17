// Goal:
// Verify serial await execution.

function loadMetric(labelText) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(labelText);
    }, 10);
  });
}

async function loadMetricsSerially() {
  const firstMetric = await loadMetric('views');
  const secondMetric = await loadMetric('orders');

  console.log(firstMetric);
  console.log(secondMetric);
}

async function main() {
  await loadMetricsSerially();
}
main().catch((error) => {
  console.error(error.message);
})