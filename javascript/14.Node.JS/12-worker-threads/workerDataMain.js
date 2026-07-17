// Goal:
// Start a worker thread and handle its lifecycle events.

import { Worker } from 'node:worker_threads';

const workerInput = {
  maxValue: 100,
};

const worker = new Worker(new URL('./sumWorker.js', import.meta.url), {
  workerData: workerInput,
});

workerInput.maxValue = 1;

worker.on('message', (messageRecord) => {
  console.log(messageRecord.totalValue);
  console.log(messageRecord.workerInput.maxValue);
  console.log(workerInput.maxValue);
});

worker.on('error', (workerError) => {
  console.error(workerError.message);
});

worker.on('exit', (exitCode) => {
  console.log(`worker-exit:${exitCode}`);
});
