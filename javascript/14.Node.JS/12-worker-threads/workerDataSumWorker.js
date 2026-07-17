// Goal:
// Run a calculation inside a work thread.

import {parentPort, workerData} from 'node:worker_threads';

let totalValue = 0;

for (let currentValue=1; currentValue<=workerData.maxValue; currentValue+=1) {
  totalValue += currentValue;
}

parentPort.postMessage({
  totalValue,
  workerInput:workerData
})
