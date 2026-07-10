import { defineStore } from "pinia";
import type { CartItem, CartProduct } from "./storeTypes";

type CartState = {
  products: Array<CartProduct>;
  items: Array<CartItem>;
  updatedAt: string | null;
};

const initialProducts: Array<CartProduct> = [
  { id: "keyboard", name: "Mechanical Keyboard", price: 89 },
  { id: "mouse", name: "Precision Mouse", price: 49 },
  { id: "stand", name: "Laptop Stand", price: 65 },
];

function nowLabel(): string {
  return new Date().toISOString();
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    products: initialProducts.map((product) => ({ ...product })),
    items: [],
    updatedAt: null,
  }),
  getters: {
    itemCount: (state): number =>
      state.items.reduce((total, item) => total + item.quantity, 0),
    subtotal: (state): number =>
      state.items.reduce((total, item) => {
        const product = state.products.find(
          (candidate) => candidate.id === item.productId,
        );
        return total + (product?.price ?? 0) * item.quantity;
      }, 0),
    isEmpty: (state): boolean => state.items.length === 0,
  },
  actions: {
    addItem(productId: string): void {
      const productExists = this.products.some(
        (product) => product.id === productId,
      );

      if (!productExists) {
        return;
      }

      const existingItem = this.items.find(
        (item) => item.productId === productId,
      );

      this.$patch((state) => {
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          state.items.push({ productId, quantity: 1 });
        }
        state.updatedAt = nowLabel();
      });
    },
    removeItem(productId: string): void {
      this.$patch({
        items: this.items.filter((item) => item.productId !== productId),
        updatedAt: nowLabel(),
      });
    },
    increment(productId: string): void {
      const item = this.items.find(
        (candidate) => candidate.productId === productId,
      );

      if (item) {
        item.quantity += 1;
        this.updatedAt = nowLabel();
      }
    },
    decrement(productId: string): void {
      const item = this.items.find(
        (candidate) => candidate.productId === productId,
      );

      if (!item) {
        return;
      }

      if (item.quantity === 1) {
        this.removeItem(productId);
        return;
      }

      item.quantity -= 1;
      this.updatedAt = nowLabel();
    },
    clearCart(): void {
      this.$patch({
        items: [],
        updatedAt: nowLabel(),
      });
    },
    replaceProducts(products: ReadonlyArray<CartProduct>): void {
      this.$patch((state) => {
        state.products = products.map((product) => ({ ...product }));
        state.items = state.items.filter((item) =>
          state.products.some((product) => product.id === item.productId),
        );
        state.updatedAt = nowLabel();
      });
    },
  },
});
