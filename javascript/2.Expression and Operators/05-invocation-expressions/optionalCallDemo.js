// Goal:
// Verify optional call when a callback may be missing.

function runTask(taskName, onComplete) {
  console.log(`run:${taskName}`);
  const callbackResult = onComplete?.(taskName);
  console.log(callbackResult ?? "no-callback");
}

runTask("sync", (name) => `done:${name}`);
runTask("backup");
