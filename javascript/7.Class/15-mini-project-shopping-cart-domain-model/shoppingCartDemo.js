// Goal:
// Run the shopping cart domain model.

// Expected output:
// 2
// 12400
// 11160
// Ebook: 2500 [application/pdf]
// true

import { DigitalProduct, Product } from "./productModel.js";
import { PercentageDiscountPolicy } from "./discountPolicy.js";
import { ShoppingCart } from "./cartModel.js";

const cart = new ShoppingCart(new PercentageDiscountPolicy(10));
const keyboard = new Product("p1", "Keyboard", 9900);
const ebook = new DigitalProduct("p2", "Ebook", 2500, "application/pdf");

cart.addProduct(keyboard, 1);
cart.addProduct(ebook, 1);

console.log(cart.size);
console.log(cart.subtotalCents);
console.log(cart.totalCents);
console.log(ebook.label);
console.log(JSON.stringify(cart).includes("digital"));
