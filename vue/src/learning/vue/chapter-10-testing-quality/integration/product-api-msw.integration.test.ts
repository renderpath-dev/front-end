import { describe, expect, it } from "vitest";
import { productListResponseSchema } from "../../chapter-09-api-runtime-boundary/validators/productValidator";
import { setMswScenario } from "../msw/msw-scenarios";

const productsUrl = "http://localhost/chapter-10-api/products";

describe("product API with MSW", () => {
  it("returns a contract-valid product list", async () => {
    const response = await fetch(productsUrl);
    const body: unknown = await response.json();
    const parsed = productListResponseSchema.safeParse(body);

    expect(response.status).toBe(200);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.data[0]?.product_name).toBe("Mechanical Keyboard");
    }
  });

  it.each([
    ["forbidden", 403],
    ["server", 500],
  ] as const)("models the %s response explicitly", async (scenario, status) => {
    setMswScenario(scenario);

    const response = await fetch(productsUrl);

    expect(response.status).toBe(status);
  });
});
