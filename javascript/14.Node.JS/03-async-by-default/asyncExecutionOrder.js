// Goal:
// Verify that asynchronous callbacks run after synchronous code.

console.log('sync-start');

setTimeout(() => {
  console.log('timer-callback');
}, 0);

Promise.resolve().then(() => {
  console.log('promise-callback');
});

console.log('sync-end');
