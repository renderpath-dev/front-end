// Goal:
// observe built-in iterable variables

const productListNames = ['keyboard','mouse','monitor'];
const titleText = 'JS';
const statusSet = new Set(['draft','published']);
const scoreMap = new Map([
  ['layout',90],
  ['accessibility',85],
]);

for (const productName of productListNames) {
  console.log(productName);
}
for (const characterText of titleText) {
  console.log(characterText);
}
for (const statuesText of statusSet) {
  console.log(statuesText);
}
for (const scoreEntry of scoreMap) {
  console.log(scoreEntry[0],scoreEntry[1]);
}