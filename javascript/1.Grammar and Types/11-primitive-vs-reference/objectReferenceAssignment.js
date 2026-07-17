// Goal:
// Show object assignment copies the reference.

// Expected output:
// 2
// 2
// true

const firstCart = { itemCount: 1 };
const secondCart = firstCart;

secondCart.itemCount = 2;

console.log(firstCart.itemCount);
console.log(secondCart.itemCount);
console.log(firstCart === secondCart);
