// Goal:
// Compare sync code, nextTick, Promise microtask, and timer callback.

console.log('sync-start');

setTimeout(() => {
  console.log('timer-callback');
}, 0);

Promise.resolve().then(() => {
  console.log('promise-callback');
});

process.nextTick(() => {
  console.log('next-tick-callback');
});

console.log('sync-end');
