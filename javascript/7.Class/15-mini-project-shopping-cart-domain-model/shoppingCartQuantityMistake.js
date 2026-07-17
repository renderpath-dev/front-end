// Goal:
// Verify invalid quantity after passing a valid product.

// Expected output:
// CartError
// INVALID_QUANTITY

import { Product } from "./productModel.js";
import { ShoppingCart } from "./cartModel.js";

const cart = new ShoppingCart();
const keyboard = new Product("p1", "Keyboard", 9900);

try {
  cart.addProduct(keyboard, 0);
} catch (error) {
  console.log(error.name);
  console.log(error.code);
}
