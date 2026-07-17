// Goal:
// Convert text to bytes and inspect different encodings.

const messageText = 'Node runtime';
const messageBuffer = Buffer.from(messageText, 'utf8');

console.log(messageText.length);
console.log(messageBuffer.length);
console.log(messageBuffer.toString('utf8'));
console.log(messageBuffer.toString('hex'));
console.log(messageBuffer.toString('base64'));
console.log(messageBuffer.subarray(0, 4).toString('utf8'));
