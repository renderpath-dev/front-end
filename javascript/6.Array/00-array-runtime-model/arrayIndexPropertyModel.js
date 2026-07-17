// Goal:
// Verify that array indexes are special property names and length tracks numeric indexes.

const shoppingList = [];

shoppingList[0] = 'keyboard';
shoppingList[2] = 'monitor';
shoppingList.note = 'office order';

console.log(shoppingList.length);
console.log(Object.keys(shoppingList));
console.log(shoppingList[1]);
console.log(1 in shoppingList);
console.log('note' in shoppingList);
