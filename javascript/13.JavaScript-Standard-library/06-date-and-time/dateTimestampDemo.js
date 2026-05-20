// Goal:
// Verify that Date stores an instant and can output a timestamp.

const releaseDate = new Date('2026-05-12T18:30:00Z');
const releaseTimestamp = releaseDate.getTime();
const releaseIsoText = releaseDate.toISOString();

console.log(releaseTimestamp);
console.log(releaseIsoText);
