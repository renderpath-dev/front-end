// Goal:
// Verify CommonJS caching and exports behavior.

const firstCounterModule = require('./requestCounter.cjs');
const secondCounterModule = require('./requestCounter.cjs');

console.log(firstCounterModule.increaseRequestCount());
console.log(secondCounterModule.increaseRequestCount());
console.log(firstCounterModule === secondCounterModule);

const brokenReportModule = require('./brokenExportsExample.cjs');
const createFixedReportTitle = require('./fixedModuleExportsExample.cjs');

console.log(typeof brokenReportModule);
console.log(createFixedReportTitle());
