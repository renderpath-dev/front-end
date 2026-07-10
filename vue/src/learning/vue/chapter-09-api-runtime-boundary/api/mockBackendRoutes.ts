import type { ApiErrorEnvelope } from "../contracts/apiEnvelopeContract";
import type { OrderDto } from "../contracts/orderContract";
import type { ProductDto } from "../contracts/productContract";
import type { UserDto } from "../contracts/userContract";
import { updateOrderStatusPayloadSchema } from "../validators/orderValidator";
import {
  createProductPayloadSchema,
  updateProductPayloadSchema,
} from "../validators/productValidator";
import { createUserPayloadSchema } from "../validators/userValidator";
import {
  deleteMockProduct,
  insertMockProduct,
  insertMockUser,
  readMockOrders,
  readMockProducts,
  readMockUsers,
  updateMockOrderStatus,
  updateMockProduct,
} from "./mockBackendDatabase";
import type { HttpMethod } from "./httpTypes";
import type { MockBackendScenario } from "./mockBackendScenarios";

export type MockBackendRequest = {
  method: HttpMethod;
  url: string;
  query: Record<string, unknown>;
  body: unknown;
  requestId: string;
  role: string;
  scenario: MockBackendScenario;
};

export type MockBackendResponse = {
  status: number;
  statusText: string;
  data: unknown;
};

function errorResponse(
  status: number,
  code: string,
  message: string,
  requestId: string,
  fieldErrors?: Record<string, ReadonlyArray<string>>,
): MockBackendResponse {
  const data: ApiErrorEnvelope = {
    error: {
      code,
      message,
      ...(fieldErrors ? { fieldErrors } : {}),
    },
    requestId,
  };

  return {
    status,
    statusText: message,
    data,
  };
}

function scenarioResponse(
  scenario: MockBackendScenario,
  requestId: string,
): MockBackendResponse | null {
  if (scenario === "badRequest") {
    return errorResponse(400, "BAD_REQUEST", "The request is malformed.", requestId);
  }
  if (scenario === "unauthenticated") {
    return errorResponse(401, "UNAUTHENTICATED", "A valid session is required.", requestId);
  }
  if (scenario === "forbidden") {
    return errorResponse(403, "FORBIDDEN", "The session cannot perform this operation.", requestId);
  }
  if (scenario === "notFound") {
    return errorResponse(404, "NOT_FOUND", "The resource was not found.", requestId);
  }
  if (scenario === "conflict") {
    return errorResponse(409, "CONFLICT", "The resource conflicts with current server state.", requestId);
  }
  if (scenario === "validationError") {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "The payload failed backend validation.",
      requestId,
      { name: ["The name is already reserved."] },
    );
  }
  if (scenario === "serverError") {
    return errorResponse(500, "SERVER_ERROR", "The service failed unexpectedly.", requestId);
  }
  return null;
}

function readPositiveInteger(
  value: unknown,
  fallback: number,
): number {
  const parsed =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number.parseInt(value, 10)
        : Number.NaN;
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

function readText(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function paginate<Item>(
  rows: ReadonlyArray<Item>,
  query: Record<string, unknown>,
) {
  const page = readPositiveInteger(query.page, 1);
  const pageSize = readPositiveInteger(query.pageSize, 5);
  const start = (page - 1) * pageSize;
  return {
    rows: rows.slice(start, start + pageSize),
    meta: {
      page,
      pageSize,
      total: rows.length,
      sort: readText(query.sort, "id"),
      order:
        readText(query.order) === "descending"
          ? ("descending" as const)
          : ("ascending" as const),
    },
  };
}

function listProducts(
  request: MockBackendRequest,
): MockBackendResponse {
  if (request.scenario === "invalidProductShape") {
    return {
      status: 200,
      statusText: "OK",
      data: {
        data: [{ id: 99, product_name: null }],
        meta: {
          page: 1,
          pageSize: 5,
          total: 1,
          sort: "id",
          order: "ascending",
        },
        requestId: request.requestId,
      },
    };
  }

  const keyword = readText(request.query.keyword).toLowerCase();
  const filtered = readMockProducts().filter((product) =>
    product.product_name.toLowerCase().includes(keyword),
  );
  const page = paginate(filtered, request.query);
  const meta =
    request.scenario === "malformedPagination"
      ? { ...page.meta, total: -1 }
      : page.meta;

  return {
    status: 200,
    statusText: "OK",
    data: {
      data: page.rows,
      meta,
      requestId: request.requestId,
    },
  };
}

function createProduct(
  request: MockBackendRequest,
): MockBackendResponse {
  const parsed = createProductPayloadSchema.safeParse(request.body);
  if (!parsed.success) {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "The product payload is invalid.",
      request.requestId,
      { payload: parsed.error.issues.map((issue) => issue.message) },
    );
  }

  if (
    readMockProducts().some(
      (product) =>
        product.product_name.toLowerCase() ===
        parsed.data.name.toLowerCase(),
    )
  ) {
    return errorResponse(
      409,
      "CONFLICT",
      "A product with this name already exists.",
      request.requestId,
    );
  }

  const created = insertMockProduct({
    product_name: parsed.data.name,
    category: parsed.data.category,
    unit_price: parsed.data.price,
    stock_count: parsed.data.stock,
    status: "draft",
  });

  return {
    status: 201,
    statusText: "Created",
    data: {
      data: created,
      message: "Product created.",
      requestId: request.requestId,
    },
  };
}

function updateProductRoute(
  request: MockBackendRequest,
  productId: string,
): MockBackendResponse {
  const parsed = updateProductPayloadSchema.safeParse(request.body);
  if (!parsed.success) {
    return errorResponse(
      422,
      "VALIDATION_ERROR",
      "The product payload is invalid.",
      request.requestId,
    );
  }

  const updated = updateMockProduct(productId, {
    product_name: parsed.data.name,
    category: parsed.data.category,
    unit_price: parsed.data.price,
    stock_count: parsed.data.stock,
    status: parsed.data.status,
  });

  if (!updated) {
    return errorResponse(404, "NOT_FOUND", "The product was not found.", request.requestId);
  }

  return {
    status: 200,
    statusText: "OK",
    data: {
      data: updated,
      message: "Product updated.",
      requestId: request.requestId,
    },
  };
}

function listUsers(request: MockBackendRequest): MockBackendResponse {
  const keyword = readText(request.query.keyword).toLowerCase();
  const filtered = readMockUsers().filter((user) =>
    [user.display_name, user.email_address].some((value) =>
      value.toLowerCase().includes(keyword),
    ),
  );
  const page = paginate(filtered, request.query);
  return {
    status: 200,
    statusText: "OK",
    data: {
      data: page.rows,
      meta: page.meta,
      requestId: request.requestId,
    },
  };
}

function createUser(request: MockBackendRequest): MockBackendResponse {
  const parsed = createUserPayloadSchema.safeParse(request.body);
  if (!parsed.success) {
    return errorResponse(422, "VALIDATION_ERROR", "The user payload is invalid.", request.requestId);
  }

  const created = insertMockUser({
    display_name: parsed.data.name,
    email_address: parsed.data.email,
    role: parsed.data.role,
  });
  return {
    status: 201,
    statusText: "Created",
    data: {
      data: created,
      message: "User created.",
      requestId: request.requestId,
    },
  };
}

function listOrders(request: MockBackendRequest): MockBackendResponse {
  const status = readText(request.query.status);
  const filtered = readMockOrders().filter(
    (order) => status.length === 0 || order.status === status,
  );
  const page = paginate(filtered, request.query);
  return {
    status: 200,
    statusText: "OK",
    data: {
      data: page.rows,
      meta: page.meta,
      requestId: request.requestId,
    },
  };
}

function updateOrder(
  request: MockBackendRequest,
  orderId: string,
): MockBackendResponse {
  const parsed = updateOrderStatusPayloadSchema.safeParse(request.body);
  if (!parsed.success) {
    return errorResponse(422, "VALIDATION_ERROR", "The status payload is invalid.", request.requestId);
  }

  const updated = updateMockOrderStatus(orderId, parsed.data.status);
  if (!updated) {
    return errorResponse(404, "NOT_FOUND", "The order was not found.", request.requestId);
  }

  return {
    status: 200,
    statusText: "OK",
    data: {
      data: updated,
      message: "Order status updated.",
      requestId: request.requestId,
    },
  };
}

export function handleMockBackend(
  request: MockBackendRequest,
): MockBackendResponse {
  const forcedResponse = scenarioResponse(
    request.scenario,
    request.requestId,
  );
  if (forcedResponse) return forcedResponse;

  if (request.method === "GET" && request.url === "/products") {
    return listProducts(request);
  }
  if (request.method === "GET" && request.url.startsWith("/products/")) {
    const productId = request.url.slice("/products/".length);
    const product = readMockProducts().find((item) => item.id === productId);
    return product
      ? {
          status: 200,
          statusText: "OK",
          data: { data: product, requestId: request.requestId },
        }
      : errorResponse(404, "NOT_FOUND", "The product was not found.", request.requestId);
  }
  if (request.method === "POST" && request.url === "/products") {
    return createProduct(request);
  }
  if (request.method === "PATCH" && request.url.startsWith("/products/")) {
    return updateProductRoute(
      request,
      request.url.slice("/products/".length),
    );
  }
  if (request.method === "DELETE" && request.url.startsWith("/products/")) {
    const deleted = deleteMockProduct(
      request.url.slice("/products/".length),
    );
    return deleted
      ? {
          status: 200,
          statusText: "OK",
          data: {
            data: { deleted: true },
            requestId: request.requestId,
          },
        }
      : errorResponse(404, "NOT_FOUND", "The product was not found.", request.requestId);
  }
  if (request.method === "GET" && request.url === "/users") {
    return listUsers(request);
  }
  if (request.method === "POST" && request.url === "/users") {
    return createUser(request);
  }
  if (request.method === "GET" && request.url === "/orders") {
    return listOrders(request);
  }
  if (
    request.method === "PATCH" &&
    request.url.startsWith("/orders/") &&
    request.url.endsWith("/status")
  ) {
    const orderId = request.url
      .slice("/orders/".length)
      .replace("/status", "");
    return updateOrder(request, orderId);
  }
  if (request.method === "POST" && request.url === "/uploads") {
    return {
      status: 201,
      statusText: "Created",
      data: {
        data: { uploadId: "upload-901", accepted: true },
        message: "Upload accepted by the local adapter.",
        requestId: request.requestId,
      },
    };
  }
  if (request.method === "GET" && request.url === "/session") {
    if (request.role === "guest") {
      return errorResponse(401, "UNAUTHENTICATED", "A valid session is required.", request.requestId);
    }
    return {
      status: 200,
      statusText: "OK",
      data: {
        data: { role: request.role, authenticated: true },
        requestId: request.requestId,
      },
    };
  }

  return errorResponse(404, "NOT_FOUND", "The endpoint was not found.", request.requestId);
}
