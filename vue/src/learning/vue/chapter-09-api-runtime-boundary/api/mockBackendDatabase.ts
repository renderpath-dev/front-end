import type { OrderDto } from "../contracts/orderContract";
import type { ProductDto } from "../contracts/productContract";
import type { UserDto } from "../contracts/userContract";

let productSequence = 503;
let userSequence = 603;

let products: Array<ProductDto> = [
  {
    id: "product-501",
    product_name: "API Workspace",
    category: "Subscription",
    unit_price: 39,
    stock_count: 800,
    status: "active",
  },
  {
    id: "product-502",
    product_name: "Contract Review",
    category: "Service",
    unit_price: 249,
    stock_count: 24,
    status: "active",
  },
  {
    id: "product-503",
    product_name: "Migration Audit",
    category: "Service",
    unit_price: 499,
    stock_count: 8,
    status: "draft",
  },
];

let users: Array<UserDto> = [
  {
    id: "user-601",
    display_name: "Ada Carter",
    email_address: "ada@example.test",
    role: "admin",
    status: "active",
  },
  {
    id: "user-602",
    display_name: "Miles Rivera",
    email_address: "miles@example.test",
    role: "manager",
    status: "active",
  },
  {
    id: "user-603",
    display_name: "Nora Patel",
    email_address: "nora@example.test",
    role: "operator",
    status: "suspended",
  },
];

let orders: Array<OrderDto> = [
  {
    id: "order-701",
    customer_name: "Northwind Studio",
    total_amount: 459,
    status: "pending",
    created_at: "2026-06-20",
  },
  {
    id: "order-702",
    customer_name: "Contoso Labs",
    total_amount: 129,
    status: "processing",
    created_at: "2026-06-23",
  },
  {
    id: "order-703",
    customer_name: "Fabrikam Works",
    total_amount: 999,
    status: "completed",
    created_at: "2026-06-26",
  },
];

export function readMockProducts(): Array<ProductDto> {
  return products.map((product) => ({ ...product }));
}

export function readMockUsers(): Array<UserDto> {
  return users.map((user) => ({ ...user }));
}

export function readMockOrders(): Array<OrderDto> {
  return orders.map((order) => ({ ...order }));
}

export function insertMockProduct(
  product: Omit<ProductDto, "id">,
): ProductDto {
  productSequence += 1;
  const created: ProductDto = {
    ...product,
    id: `product-${productSequence}`,
  };
  products = [...products, created];
  return { ...created };
}

export function updateMockProduct(
  productId: string,
  patch: Omit<ProductDto, "id">,
): ProductDto | null {
  const current = products.find((product) => product.id === productId);
  if (!current) return null;

  const updated: ProductDto = { ...patch, id: productId };
  products = products.map((product) =>
    product.id === productId ? updated : product,
  );
  return { ...updated };
}

export function deleteMockProduct(productId: string): boolean {
  const previousLength = products.length;
  products = products.filter((product) => product.id !== productId);
  return products.length !== previousLength;
}

export function insertMockUser(
  user: Omit<UserDto, "id" | "status">,
): UserDto {
  userSequence += 1;
  const created: UserDto = {
    ...user,
    id: `user-${userSequence}`,
    status: "active",
  };
  users = [...users, created];
  return { ...created };
}

export function updateMockOrderStatus(
  orderId: string,
  status: OrderDto["status"],
): OrderDto | null {
  const current = orders.find((order) => order.id === orderId);
  if (!current) return null;

  const updated: OrderDto = { ...current, status };
  orders = orders.map((order) =>
    order.id === orderId ? updated : order,
  );
  return { ...updated };
}
