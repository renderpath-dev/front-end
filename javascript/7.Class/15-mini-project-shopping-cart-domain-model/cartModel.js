// Goal:
// Define a shopping cart class with private state.

import { DigitalProduct, Product } from "./productModel.js";
import { DiscountPolicy } from "./discountPolicy.js";

export class CartError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "CartError";
    this.code = code;
  }
}

export class ShoppingCart {
  #lines = [];
  #discountPolicy;

  constructor(discountPolicy = new DiscountPolicy()) {
    this.#discountPolicy = discountPolicy;
  }

  static fromRecords(records, discountPolicy) {
    const cart = new ShoppingCart(discountPolicy);

    for (const record of records) {
      const product = record.type === "digital"
        ? new DigitalProduct(record.id, record.title, record.priceCents, record.fileType)
        : new Product(record.id, record.title, record.priceCents);

      cart.addProduct(product, record.quantity);
    }

    return cart;
  }

  addProduct(product, quantity = 1) {
    if (!(product instanceof Product)) {
      throw new CartError("Expected a Product instance", "INVALID_PRODUCT");
    }

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new CartError("Quantity must be a positive integer", "INVALID_QUANTITY");
    }

    this.#lines.push({ product, quantity });
  }

  get subtotalCents() {
    return this.#lines.reduce(
      (sum, line) => sum + line.product.priceCents * line.quantity,
      0,
    );
  }

  get totalCents() {
    return this.#discountPolicy.apply(this.subtotalCents);
  }

  get size() {
    return this.#lines.length;
  }

  toJSON() {
    return {
      subtotalCents: this.subtotalCents,
      totalCents: this.totalCents,
      lines: this.#lines.map((line) => ({
        product: line.product.toJSON(),
        quantity: line.quantity,
      })),
    };
  }
}
