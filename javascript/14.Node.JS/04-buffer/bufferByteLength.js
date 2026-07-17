// Goal:
// Compare string length with UTF-8 byte length.

const currencyText = 'price:€';
const currencyBuffer = Buffer.from(currencyText, 'utf8');

console.log(currencyText.length);
console.log(currencyBuffer.length);
console.log(Buffer.byteLength(currencyText, 'utf8'));
console.log(currencyBuffer.toString('hex'));
