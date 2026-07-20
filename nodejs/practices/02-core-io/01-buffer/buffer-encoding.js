'use strict';

const { Buffer } = require('node:buffer');

const message = 'Node.js';
const utf8Bytes = Buffer.from(message, 'utf8');
const base64 = utf8Bytes.toString('base64');
const restored = Buffer.from(base64, 'base64').toString('utf8');

console.log('Byte length:', Buffer.byteLength(message, 'utf8'));
console.log('Hex:', utf8Bytes.toString('hex'));
console.log('Base64:', base64);
console.log('Restored:', restored);
