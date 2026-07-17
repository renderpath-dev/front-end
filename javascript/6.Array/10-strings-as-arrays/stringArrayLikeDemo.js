// Goal:
// Compare string indexing with real array conversion.

const productCode = 'A1B2';

console.log(productCode[0]);
console.log(productCode.length);
console.log(Array.from(productCode));

const characters = Array.from(productCode);
characters[0] = 'Z';

console.log(characters.join(''));
console.log(productCode);
