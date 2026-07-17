// Goal:
// Convert an array-like object into a real array.

const fakeNodeList = {
  0: 'header',
  1: 'main',
  2: 'footer',
  length: 3,
};

console.log(Array.isArray(fakeNodeList));

const sectionList = Array.from(fakeNodeList);
console.log(Array.isArray(sectionList));
console.log(sectionList.map((section) => section.toUpperCase()));

const slicedList = Array.prototype.slice.call(fakeNodeList);
console.log(slicedList.join(' > '));
