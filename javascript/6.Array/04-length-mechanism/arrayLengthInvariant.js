// Goal:
// Verify the relationship between length and the highest array index.

const inventory = ['ssd', 'ram'];

inventory[5] = 'gpu';
console.log(inventory.length);
console.log(Object.keys(inventory));

inventory.length = 2;
console.log(inventory.length);
console.log(inventory);
console.log(5 in inventory);

inventory.length = 6;
console.log(inventory.length);
console.log(Object.keys(inventory));
