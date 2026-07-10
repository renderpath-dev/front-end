import { beforeEach, describe, expect, it } from "vitest";
import { useCartStore } from "../stores/cartStore";
import { activateFreshPinia } from "./piniaStoreTest";

describe("cart store", () => {
  beforeEach(() => {
    activateFreshPinia();
  });

  it("derives quantity and subtotal from collection state", () => {
    const cartStore = useCartStore();

    cartStore.addItem("keyboard");
    cartStore.addItem("keyboard");
    cartStore.addItem("mouse");

    expect(cartStore.itemCount).toBe(3);
    expect(cartStore.subtotal).toBe(227);
    expect(cartStore.isEmpty).toBe(false);
  });

  it("uses grouped updates for add and remove flows", () => {
    const cartStore = useCartStore();

    cartStore.addItem("stand");
    cartStore.increment("stand");
    cartStore.decrement("stand");

    expect(cartStore.items).toEqual([
      { productId: "stand", quantity: 1 },
    ]);

    cartStore.removeItem("stand");

    expect(cartStore.items).toEqual([]);
  });

  it("ignores products outside the declared catalog", () => {
    const cartStore = useCartStore();

    cartStore.addItem("missing-product");

    expect(cartStore.itemCount).toBe(0);
  });
});
