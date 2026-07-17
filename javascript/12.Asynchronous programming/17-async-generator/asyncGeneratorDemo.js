// Goal:
// Verify how an async generator yields values over time.

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function* createStatusStream() {
  await delay(1000);
  yield 'queued';

  await delay(1000);
  yield 'running';

  await delay(1000);
  yield 'done';
}

for await (const statusText of createStatusStream()) {
  console.log(statusText);
}
