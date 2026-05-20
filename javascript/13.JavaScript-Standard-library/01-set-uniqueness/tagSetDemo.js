const tagCollection = new Set();

tagCollection.add('JavaScript');
tagCollection.add('CSS');
tagCollection.add('TypeScript');
tagCollection.add('JavaScript');

const uniqueTagCount = tagCollection.size;
const hasFrontendTag = tagCollection.has('frontend');

console.log(uniqueTagCount);
console.log(hasFrontendTag);
console.log(Array.from(tagCollection));