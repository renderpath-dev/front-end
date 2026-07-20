'use strict';

const { Buffer } = require('node:buffer');

const source = Buffer.from('ABCDE');
const sharedView = source.subarray(1, 4);
const copied = Buffer.from(sharedView);

sharedView[0] = 'x'.charCodeAt(0);

console.log(source.toString());
console.log(sharedView.toString());
console.log(copied.toString());
