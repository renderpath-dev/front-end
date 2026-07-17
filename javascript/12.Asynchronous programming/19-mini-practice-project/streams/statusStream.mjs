// Goal:
// Export an async generator that yields dashboard status values.

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export async function* createDashboardStatusStream() {
  await delay(5);
  yield 'loading profile';

  await delay(5);
  yield 'loading metrics';

  await delay(5);
  yield 'ready';
}
