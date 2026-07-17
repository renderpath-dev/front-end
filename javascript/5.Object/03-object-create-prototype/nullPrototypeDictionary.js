// Goal:
// Verify that a null-prototype object does not inherit Object.prototype methods.

const keywordCounts = Object.create(null);
keywordCounts.javascript = 3;
keywordCounts.object = 2;

console.log(keywordCounts.javascript);
console.log(Object.getPrototypeOf(keywordCounts) === null);
console.log(typeof keywordCounts.toString);
