// Goal:
// Create and cancel a timer.

const timeoutHandle = setTimeout(() => {
  console.log('this-will-not-run');
}, 1000);

clearTimeout(timeoutHandle);

console.log('timer-cancelled');
