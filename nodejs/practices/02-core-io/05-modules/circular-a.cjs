console.log('first starting');

exports.done = false;

const second = require('./circular-b.cjs');

console.log('in first, second.done:', second.done);
exports.done = true;
console.log('first done');
