'use strict';

console.log('Synchronous start');

Promise.resolve().then(() => {
  console.log('Promise microtask');
});

let nextTickCount = 0;

function scheduleNextTickBurst() {
  process.nextTick(() => {
    nextTickCount += 1;
    console.log(`nextTick callback ${nextTickCount}`);

    if (nextTickCount < 3) {
      scheduleNextTickBurst();
    }
  });
}

scheduleNextTickBurst();

setImmediate(() => {
  console.log('Immediate callback');
});

console.log('Synchronous end');
