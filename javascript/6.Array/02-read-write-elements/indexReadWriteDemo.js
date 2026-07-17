// Goal:
// Verify array element read, write, overwrite, and out-of-range assignment.

const cartItems = ['book', 'pen'];

console.log(cartItems[0]);
console.log(cartItems[5]);

cartItems[1] = 'notebook';
cartItems[4] = 'lamp';

console.log(cartItems.length);
console.log(cartItems);
console.log(Object.keys(cartItems));
