console.log('second starting');

exports.done = false;

const first = require('./circular-a.cjs');

console.log('in second, first.done:', first.done);
exports.done = true;
console.log('second done');
