// Goal:
// Verify how new creates an object and binds this.

function CartItem(productName, unitPrice) {
  this.productName = productName;
  this.unitPrice = unitPrice;
}

CartItem.prototype.describe = function () {
  return `${this.productName}:${this.unitPrice}`;
};

const cartItem = new CartItem("Desk", 240);

console.log(cartItem.productName);
console.log(cartItem.describe());
console.log(cartItem instanceof CartItem);
console.log(Object.getPrototypeOf(cartItem) === CartItem.prototype);
