// Goal:
// Verify that a timer callback runs after synchronous code.

console.log('start');

setTimeout(() => {
  console.log('timer callback');
}, 1000);

console.log('end');
