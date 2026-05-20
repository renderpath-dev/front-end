// Goal:
// Verify that a global RegExp can keep lastIndex state across test calls.

const repeatedDigitPattern = /\d/g;

console.log(repeatedDigitPattern.test('a1'));
console.log(repeatedDigitPattern.test('a1'));
console.log(repeatedDigitPattern.test('a1'));
