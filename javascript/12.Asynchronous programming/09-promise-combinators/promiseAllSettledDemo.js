// Goal:
// Verify that Promise.allSettled keeps both success and failure results.

const successfulTask = Promise.resolve('cache ready');
const failedTask = Promise.reject(new Error('network failed'));

Promise.allSettled([successfulTask,failedTask]).then(taskResults => {
  console.log(taskResults[0].status);
  console.log(taskResults[1].status);
});