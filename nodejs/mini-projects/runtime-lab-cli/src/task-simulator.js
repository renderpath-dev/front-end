'use strict';

const { performance } = require('node:perf_hooks');
const { setTimeout: delay } = require('node:timers/promises');

function runBlockingTask(durationMs) {
  const start = performance.now();

  while (performance.now() - start < durationMs) {
    // Intentionally empty.
  }

  return performance.now() - start;
}

async function runAsyncTask(durationMs) {
  const start = performance.now();
  await delay(durationMs);
  return performance.now() - start;
}

module.exports = { runAsyncTask, runBlockingTask };
