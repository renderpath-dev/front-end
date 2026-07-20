'use strict';

const process = require('node:process');
const { observeEventLoopDelay } = require('./event-loop-delay');
const { getRuntimeInfo } = require('./runtime-info');
const { runAsyncTask, runBlockingTask } = require('./task-simulator');

const DEFAULT_BLOCK_DURATION_MS = 120;
const DEFAULT_ASYNC_DURATION_MS = 120;
const VALID_TASKS = new Set(['block', 'async', 'both']);

function readOption(name, fallbackValue) {
  const prefix = `--${name}=`;
  const option = process.argv.find((argument) => argument.startsWith(prefix));
  return option ? option.slice(prefix.length) : fallbackValue;
}

function readPositiveNumber(name, fallbackValue) {
  const rawValue = readOption(name, String(fallbackValue));
  const numberValue = Number(rawValue);

  if (!Number.isFinite(numberValue) || numberValue <= 0) {
    throw new Error(`--${name} must be a positive number.`);
  }

  return numberValue;
}

async function main() {
  const task = readOption('task', 'both');

  if (!VALID_TASKS.has(task)) {
    throw new Error('--task must be block, async, or both.');
  }

  const blockDurationMs = readPositiveNumber('block-ms', DEFAULT_BLOCK_DURATION_MS);
  const asyncDurationMs = readPositiveNumber('async-ms', DEFAULT_ASYNC_DURATION_MS);
  const labLabel = process.env.RUNTIME_LAB_LABEL ?? 'runtime-foundations';

  console.log(`Runtime lab: ${labLabel}`);
  console.log(JSON.stringify(getRuntimeInfo(), null, 2));

  if (task === 'block' || task === 'both') {
    const observation = await observeEventLoopDelay(() =>
      runBlockingTask(blockDurationMs),
    );
    console.log('Blocking task:', observation);
  }

  if (task === 'async' || task === 'both') {
    const observation = await observeEventLoopDelay(() =>
      runAsyncTask(asyncDurationMs),
    );
    console.log('Async task:', observation);
  }
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
