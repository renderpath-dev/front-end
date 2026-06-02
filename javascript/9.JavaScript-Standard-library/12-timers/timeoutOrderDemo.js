// Goal:
// Verify that setTimeout does not pause synchronous code.

console.log('sync-start');

const reminderTimerId = setTimeout(() => {
  console.log('timer-callback');
}, 0);

console.log('sync-end');
clearTimeout(reminderTimerId);
