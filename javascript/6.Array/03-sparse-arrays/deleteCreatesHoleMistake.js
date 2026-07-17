// Goal:
// Verify that delete creates a hole and does not shift later elements.

const queue = ['first', 'second', 'third'];

delete queue[1];

console.log(queue.length);
console.log(queue[1]);
console.log(1 in queue);
console.log(queue);

queue.splice(1, 1);
console.log(queue.length);
console.log(queue);
