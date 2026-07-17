// Goal:
// Use Object.hasOwn with objects that do not inherit hasOwnProperty.

const cleanDictionary = Object.create(null);
cleanDictionary.status = "active";

console.log(Object.hasOwn(cleanDictionary, "status"));
console.log(typeof cleanDictionary.hasOwnProperty);
