// Goal:
// Verify why new Array(3) does not create [3].

const expectedSingleValue = new Array(3);
const actualSingleValue = Array.of(3);

console.log(expectedSingleValue);
console.log(expectedSingleValue.length);
console.log(0 in expectedSingleValue);
console.log(actualSingleValue);
