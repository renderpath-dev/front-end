// Goal:
// Verify expected domain errors.

// Expected output:
// CartError
// INVALID_QUANTITY
// CartError
// INVALID_PRODUCT

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

try {
  cart.addProduct({ id: "fake", title: "Fake", priceCents: 100 }, 1);
} catch (error) {
  console.log(error.name);
  console.log(error.code);
}
