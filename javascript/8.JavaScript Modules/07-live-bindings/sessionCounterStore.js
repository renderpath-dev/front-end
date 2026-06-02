// Goal:
// Export mutable module state and functions that update it.

export let activeSessionCount = 0;

export function increaseActiveSessionCount() {
  activeSessionCount += 1;
}

export function resetActiveSessionCount() {
  activeSessionCount = 0;
}
