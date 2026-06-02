// Goal:
// Check iterable and iterator protocol pieces

const labelList= ['alpha','beta'];
const labelIteratorFactory = labelList[Symbol.iterator];
const labelIterator = labelIteratorFactory.call(labelList);

console.log(typeof labelIteratorFactory);
console.log(typeof labelIterator);
console.log(typeof labelIterator.next);
console.log(labelIterator.next());
console.log(labelIterator.next());
console.log(labelIterator.next());