// Goal:
// Verify that imported bindings reflect updates from the exporting module.

import {
  activeSessionCount,
  increaseActiveSessionCount,
  resetActiveSessionCount,
} from './sessionCounterStore.js';

console.log(activeSessionCount);

increaseActiveSessionCount();
console.log(activeSessionCount);

increaseActiveSessionCount();
console.log(activeSessionCount);

resetActiveSessionCount();
console.log(activeSessionCount);
