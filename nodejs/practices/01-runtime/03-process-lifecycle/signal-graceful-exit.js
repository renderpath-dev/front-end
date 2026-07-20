'use strict';

const process = require('node:process');

let shuttingDown = false;

const keepAliveTimer = setInterval(() => {
  console.log('Service heartbeat');
}, 1_000);

function beginGracefulShutdown(signal) {
  if (shuttingDown) {
    return;
  }

  shuttingDown = true;
  console.log(`Received ${signal}`);
  clearInterval(keepAliveTimer);
  process.exitCode = 0;

  setImmediate(() => {
    console.log('Cleanup complete');
  });
}

process.once('SIGINT', beginGracefulShutdown);
process.once('SIGTERM', beginGracefulShutdown);

console.log(`Service started with PID ${process.pid}`);

if (process.argv.includes('--self-signal')) {
  setTimeout(() => {
    process.emit('SIGINT', 'SIGINT');
  }, 50);
}
