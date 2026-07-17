// Goal:
// Verify while loop state updates.

let retryCount = 0;
const retryLog = [];

while (retryCount < 3) {
  retryLog.push(`retry:${retryCount}`);
  retryCount++;
}

console.log(retryLog);
