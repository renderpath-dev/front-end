// Goal:
// Export async metric loading functions.

function delay(value, ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

export function loadVisitMetric() {
  return delay({ label: 'visits', value: 120 }, 10);
}

export function loadOrderMetric() {
  return delay({ label: 'orders', value: 14 }, 10);
}
