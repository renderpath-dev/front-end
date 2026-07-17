// Goal:
// Start a worker thread and receive its result.

import { Worker } from 'node:worker_threads';

const worker = new Worker(new URL('./sumWorker.js', import.meta.url), {
  workerData: {
    maxValue: 100,
  },
});

worker.on('message', (messageRecord) => {
  console.log(messageRecord.totalValue);
});

worker.on('error', (workerError) => {
  console.error(workerError.message);
});
