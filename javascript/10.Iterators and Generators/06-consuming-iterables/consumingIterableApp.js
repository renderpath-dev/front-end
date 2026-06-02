// Goal:
// Consume iterable values with spread, destructing, and Array.from

const statusSet = new Set (['queued','running','done']);
const statusList = [...statusSet];

const titleText = 'DEV';
const characterList = Array.from(titleText);

const scoreMap = new Map([
  ['quality',95],
  ['speed',88],
]);

const [[firstMetricName, firstMetricScore]] = scoreMap;

console.log(statusList);
console.log(characterList);
console.log(firstMetricName);
console.log(firstMetricScore);
