// Goal:
// Run a CPU-style calculation inside a worker thread.

import { parentPort, workerData } from 'node:worker_threads';

let totalValue = 0;

for (let currentValue = 1; currentValue <= workerData.maxValue; currentValue += 1) {
  totalValue += currentValue;
}

parentPort.postMessage({ totalValue });
