// Goal:
// Manually call an iterator returned by Symbol.iterator.

const taskNameList = ['design', 'build', 'test'];
const taskIterator = taskNameList[Symbol.iterator]();

console.log(taskIterator.next());
console.log(taskIterator.next());
console.log(taskIterator.next());
console.log(taskIterator.next());
