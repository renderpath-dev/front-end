function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function* createAsyncLogGenerator() {
  await delay(2000);
  yield 'log-1';

  await delay(3000);
  yield 'log-2';
}

for await (const logMessage of createAsyncLogGenerator()) {
  console.log(logMessage);
}