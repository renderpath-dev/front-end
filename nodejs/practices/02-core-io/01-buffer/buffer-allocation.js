'use strict';

const { Buffer } = require('node:buffer');

const encoded = Buffer.from('Node', 'utf8');
const safe = Buffer.alloc(4);
const unsafe = Buffer.allocUnsafe(4);
unsafe.fill(0);

console.log(encoded);
console.log(encoded.toString('hex'));
console.log(safe);
console.log(unsafe);
