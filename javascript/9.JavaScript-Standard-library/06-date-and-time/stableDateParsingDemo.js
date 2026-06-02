// Goal:
// Prefer ISO date-time strings with explicit time zone information.

const stableTimestampDate = new Date('2026-05-12T00:00:00Z');

console.log(stableTimestampDate.toISOString());
