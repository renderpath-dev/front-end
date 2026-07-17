// Goal:
// Use a guard to prevent an accidental infinite loop.

let attempt = 0;
let isReady = false;

while (!isReady) {
  attempt++;

  if (attempt === 3) {
    isReady = true;
  }

  if (attempt > 10) {
    throw new Error("Loop guard triggered");
  }
}

console.log(attempt);
console.log(isReady);
