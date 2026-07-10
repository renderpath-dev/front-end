import { describe, expect, it } from "vitest";
import { orderDtoSchema } from "../../chapter-09-api-runtime-boundary/validators/orderValidator";
import { productDtoSchema } from "../../chapter-09-api-runtime-boundary/validators/productValidator";
import { userDtoSchema } from "../../chapter-09-api-runtime-boundary/validators/userValidator";

describe("Chapter 09 Zod validators", () => {
  it("accepts valid product, user, and order DTOs", () => {
    expect(
      productDtoSchema.safeParse({
        id: "product-1",
        product_name: "Keyboard",
        category: "Accessories",
        unit_price: 129,
        stock_count: 5,
        status: "active",
      }).success,
    ).toBe(true);
    expect(
      userDtoSchema.safeParse({
        id: "user-1",
        display_name: "Avery Admin",
        email_address: "avery@example.test",
        role: "admin",
        status: "active",
      }).success,
    ).toBe(true);
    expect(
      orderDtoSchema.safeParse({
        id: "order-1",
        customer_name: "Casey Customer",
        total_amount: 250,
        status: "processing",
        created_at: "2026-07-04T08:00:00.000Z",
      }).success,
    ).toBe(true);
  });

  it("rejects malformed DTOs at the runtime boundary", () => {
    expect(
      productDtoSchema.safeParse({
        id: "",
        product_name: "Keyboard",
        category: "Accessories",
        unit_price: -1,
        stock_count: 1.5,
        status: "unknown",
      }).success,
    ).toBe(false);
    expect(
      userDtoSchema.safeParse({
        id: "user-1",
        display_name: "",
        email_address: "invalid",
        role: "owner",
        status: "active",
      }).success,
    ).toBe(false);
    expect(
      orderDtoSchema.safeParse({
        id: "order-1",
        customer_name: "Casey Customer",
        total_amount: "250",
        status: "shipped",
        created_at: "",
      }).success,
    ).toBe(false);
  });
});
