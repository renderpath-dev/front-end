'use strict';

const fs = require('node:fs');

console.log('Synchronous start');

setTimeout(() => {
  console.log('Top-level timeout');
}, 0);

setImmediate(() => {
  console.log('Top-level immediate');
});

fs.readFile(__filename, () => {
  console.log('I/O callback');

  setTimeout(() => {
    console.log('I/O timeout');
  }, 0);

  setImmediate(() => {
    console.log('I/O immediate');
  });
});

console.log('Synchronous end');
