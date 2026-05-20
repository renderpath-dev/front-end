// Goal:
// Use recursive setTimeout to control repeated work.

let pollingAttemptCount = 0;

function schedulePollingAttempt() {
  pollingAttemptCount += 1;
  console.log('poll', pollingAttemptCount);

  if (pollingAttemptCount < 3) {
    setTimeout(schedulePollingAttempt, 1000);
  }
}

setTimeout(schedulePollingAttempt, 1000);
