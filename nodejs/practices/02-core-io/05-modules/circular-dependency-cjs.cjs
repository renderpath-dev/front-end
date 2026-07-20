console.log('main starting');

const first = require('./circular-a.cjs');
const second = require('./circular-b.cjs');

console.log('main first.done:', first.done);
console.log('main second.done:', second.done);
