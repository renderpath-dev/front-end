// Goal:
// Compare literal arrays, Array constructor, Array.of, and Array.from.

const literalItems = ['mouse', 'keyboard'];
const constructorLength = new Array(3);
const constructorItems = new Array('mouse', 'keyboard');
const fromText = Array.from('web');
const ofNumber = Array.of(3);

console.log(literalItems);
console.log(constructorLength.length, Object.keys(constructorLength));
console.log(constructorItems);
console.log(fromText);
console.log(ofNumber);
