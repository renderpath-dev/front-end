// Goal:
// Verify that await pauses the current async function, not the whole process.

async function runTask() {
  console.log('task-start');
  await Promise.resolve();
  console.log('task-after-await');
}

runTask().then(() => {
  console.log('task-done');
});

console.log('outside-task');
