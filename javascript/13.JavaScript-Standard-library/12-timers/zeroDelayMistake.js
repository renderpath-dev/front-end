// Goal:
// Verify that zero delay does not mean immediate execution.

console.log('first');

setTimeout(() => {
  console.log('third');
}, 0);

console.log('second');
