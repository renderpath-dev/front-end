// Goal:
// Show that a pure expression statement loses its calculated value.

let productPrice = 100;
productPrice * 0.9;
console.log(productPrice);

productPrice = productPrice * 0.9;
console.log(productPrice);
