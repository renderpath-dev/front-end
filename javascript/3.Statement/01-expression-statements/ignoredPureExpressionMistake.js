// Goal:
// Show that a pure expression statement does not update state by itself.

let productPrice = 100;

productPrice * 0.9;

console.log(productPrice);

productPrice = productPrice * 0.9;

console.log(productPrice);
