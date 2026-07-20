'use strict';

const { monitorEventLoopDelay } = require('node:perf_hooks');
const { setTimeout: delay } = require('node:timers/promises');

const NANOSECONDS_PER_MILLISECOND = 1_000_000;

function toMilliseconds(nanoseconds) {
  return Number((nanoseconds / NANOSECONDS_PER_MILLISECOND).toFixed(3));
}

async function observeEventLoopDelay(runObservedTask, resolutionMs = 10) {
  const histogram = monitorEventLoopDelay({ resolution: resolutionMs });

  histogram.enable();
  await delay(resolutionMs * 3);
  const taskResult = await runObservedTask();
  await delay(resolutionMs * 3);
  histogram.disable();

  return {
    taskResult,
    delayMilliseconds: {
      mean: toMilliseconds(histogram.mean),
      max: toMilliseconds(histogram.max),
      percentile99: toMilliseconds(histogram.percentile(99)),
    },
  };
}

module.exports = { observeEventLoopDelay };
