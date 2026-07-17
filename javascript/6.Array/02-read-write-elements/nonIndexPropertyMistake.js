// Goal:
// Verify that non-index properties do not count as array elements.

const tasks = ['draft', 'review'];

tasks.owner = 'Mira';
tasks['2'] = 'publish';
tasks['02'] = 'ignored by length';

console.log(tasks.length);
console.log(Object.keys(tasks));
console.log(tasks.owner);
console.log(tasks['02']);
