// Goal:
// Combine multiple Buffer chunks into one Buffer.

const firstChunk = Buffer.from('Node ', 'utf8');
const secondChunk = Buffer.from('stream ', 'utf8');
const thirdChunk = Buffer.from('body', 'utf8');

const combinedBuffer = Buffer.concat([firstChunk, secondChunk, thirdChunk]);

console.log(combinedBuffer.length);
console.log(combinedBuffer.toString('utf8'));
