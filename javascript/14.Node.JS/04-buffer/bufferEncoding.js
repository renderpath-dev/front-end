// Goal:
// Convert between strings and binary data with Buffer.

const messageBuffer = Buffer.from('Node runtime', 'utf8');

console.log(messageBuffer.length);
console.log(messageBuffer.toString('utf8'));
console.log(messageBuffer.toString('hex'));
console.log(messageBuffer.subarray(0, 4).toString('utf8'));
