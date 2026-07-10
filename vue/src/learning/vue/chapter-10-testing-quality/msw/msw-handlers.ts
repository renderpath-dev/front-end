import { delay, http, HttpResponse } from "msw";
import {
  loginFixtures,
  permissionFixtures,
  productFixtures,
  userFixtures,
} from "./msw-fixtures";
import { getMswScenario } from "./msw-scenarios";

const apiPattern = "*/chapter-10-api";

function errorResponse(
  status: number,
  code: string,
  message: string,
  fieldErrors?: Record<string, ReadonlyArray<string>>,
) {
  return HttpResponse.json(
    {
      error: { code, message, fieldErrors },
      requestId: `request-${status}`,
    },
    { status },
  );
}

async function applyScenarioDelay(): Promise<void> {
  if (getMswScenario() === "slow") {
    await delay(150);
  }
}

function scenarioFailure(): Response | null {
  const scenario = getMswScenario();
  if (scenario === "forbidden") {
    return errorResponse(403, "FORBIDDEN", "Permission denied.");
  }
  if (scenario === "server") {
    return errorResponse(500, "SERVER_ERROR", "Service unavailable.");
  }
  return null;
}

export const mswHandlers = [
  http.get(`${apiPattern}/products`, async ({ request }) => {
    await applyScenarioDelay();
    const failure = scenarioFailure();
    if (failure) return failure;

    const keyword =
      new URL(request.url).searchParams.get("keyword")?.toLowerCase() ?? "";
    const products = productFixtures.filter((product) =>
      product.product_name.toLowerCase().includes(keyword),
    );

    return HttpResponse.json({
      data: products,
      meta: {
        page: 1,
        pageSize: 10,
        total: products.length,
        sort: "product_name",
        order: "ascending",
      },
      requestId: "products-list-request",
    });
  }),
  http.get(`${apiPattern}/users`, async () => {
    await applyScenarioDelay();
    const failure = scenarioFailure();
    if (failure) return failure;

    return HttpResponse.json({
      data: userFixtures,
      meta: {
        page: 1,
        pageSize: 10,
        total: userFixtures.length,
        sort: "display_name",
        order: "ascending",
      },
      requestId: "users-list-request",
    });
  }),
  http.post(`${apiPattern}/products`, async ({ request }) => {
    await applyScenarioDelay();
    const failure = scenarioFailure();
    if (failure) return failure;

    if (getMswScenario() === "validation") {
      return errorResponse(422, "VALIDATION_ERROR", "Payload rejected.", {
        name: ["Name must contain at least two characters."],
      });
    }

    const payload = await request.json();
    if (typeof payload !== "object" || payload === null) {
      return errorResponse(400, "BAD_REQUEST", "A JSON object is required.");
    }

    return HttpResponse.json(
      {
        data: {
          id: "product-created",
          product_name: "Monitor Arm",
          category: "Workspace",
          unit_price: 79,
          stock_count: 12,
          status: "active",
        },
        message: "Product created.",
        requestId: "product-create-request",
      },
      { status: 201 },
    );
  }),
  http.post(`${apiPattern}/login`, async () => {
    await applyScenarioDelay();
    const failure = scenarioFailure();
    if (failure) return failure;
    return HttpResponse.json({ data: loginFixtures.admin });
  }),
  http.get(`${apiPattern}/permissions`, async () => {
    await applyScenarioDelay();
    const failure = scenarioFailure();
    if (failure) return failure;
    return HttpResponse.json({ data: permissionFixtures });
  }),
];
