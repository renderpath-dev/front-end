// Goal:
// Verify that Date setter methods mutate the existing Date object.

const trialStartDate = new Date('2026-05-01T00:00:00Z');
trialStartDate.setUTCDate(trialStartDate.getUTCDate() + 14);

console.log(trialStartDate.toISOString());
