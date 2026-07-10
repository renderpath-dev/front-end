import { describe, expect, it } from "vitest";
import { productFormPayloadSchema } from "../../chapter-09-api-runtime-boundary/validators/formPayloadValidator";
import { productMutationResponseSchema } from "../../chapter-09-api-runtime-boundary/validators/productValidator";
import { validProductPayload } from "../msw/msw-fixtures";
import { setMswScenario } from "../msw/msw-scenarios";

const productsUrl = "http://localhost/chapter-10-api/products";

async function submitProduct(payload: unknown): Promise<Response> {
  const validatedPayload = productFormPayloadSchema.parse(payload);
  return fetch(productsUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(validatedPayload),
  });
}

describe("product form submission with MSW", () => {
  it("validates the payload and the successful response", async () => {
    const response = await submitProduct(validProductPayload);
    const body: unknown = await response.json();
    const parsed = productMutationResponseSchema.safeParse(body);

    expect(response.status).toBe(201);
    expect(parsed.success).toBe(true);
  });

  it("exposes validation failures as an HTTP 422 boundary", async () => {
    setMswScenario("validation");

    const response = await submitProduct(validProductPayload);
    const body = (await response.json()) as {
      error?: { fieldErrors?: Record<string, ReadonlyArray<string>> };
    };

    expect(response.status).toBe(422);
    expect(body.error?.fieldErrors?.name).toHaveLength(1);
  });

  it("rejects an invalid outgoing payload before the request", () => {
    expect(() =>
      productFormPayloadSchema.parse({
        name: "",
        category: "Workspace",
        price: -1,
        stock: 1.5,
      }),
    ).toThrow();
  });
});
