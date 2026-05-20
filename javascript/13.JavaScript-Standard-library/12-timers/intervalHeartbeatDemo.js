// Goal:
// Run a repeated timer and stop it after three runs.

let heartbeatCount = 0;

const heartbeatIntervalId = setInterval(() => {
  heartbeatCount += 1;
  console.log('heartbeat', heartbeatCount);

  if (heartbeatCount === 3) {
    clearInterval(heartbeatIntervalId);
  }
}, 1000);
