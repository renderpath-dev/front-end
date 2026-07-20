'use strict';

const process = require('node:process');

const requestedStatus = process.argv[2] ?? 'success';

if (requestedStatus === 'failure') {
  console.error('The simulated operation failed.');
  process.exitCode = 1;
} else {
  console.log('The simulated operation succeeded.');
  process.exitCode = 0;
}

console.log('Cleanup output can still be flushed before natural exit.');
