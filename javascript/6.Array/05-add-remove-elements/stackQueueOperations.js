// Goal:
// Compare push, pop, shift, and unshift.

const undoStack = [];

undoStack.push('type title');
undoStack.push('insert image');
console.log(undoStack.pop());
console.log(undoStack);

const printQueue = ['job-a'];
printQueue.push('job-b');
printQueue.push('job-c');
console.log(printQueue.shift());
console.log(printQueue);

printQueue.unshift('urgent-job');
console.log(printQueue);
