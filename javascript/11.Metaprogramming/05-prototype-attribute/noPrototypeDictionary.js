// Goal:
// Create an object with no prototype for dictionary-like storage.

const dictionaryRecord = Object.create(null);

dictionaryRecord.toString = 'custom value';

console.log(dictionaryRecord.toString);
console.log(Object.getPrototypeOf(dictionaryRecord));
