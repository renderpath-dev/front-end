// Goal:
// Show that const prevents rebinding, not object mutation.

// Expected output:
// 2
// TypeError

const cartState = { itemCount: 1 };
cartState.itemCount = 2;

console.log(cartState.itemCount);

try {
  cartState = { itemCount: 3 };
} catch (error) {
  console.log(error.constructor.name);
}
