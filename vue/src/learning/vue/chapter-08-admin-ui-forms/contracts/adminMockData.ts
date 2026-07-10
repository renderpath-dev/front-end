import type {
  AdminOrder,
  AdminProduct,
  AdminUser,
} from "./adminUiTypes";
import type { RoleFormModel } from "./formContracts";

const users: ReadonlyArray<AdminUser> = [
  {
    id: "user-101",
    name: "Avery Stone",
    email: "avery@example.test",
    department: "Platform",
    role: "admin",
    status: "active",
  },
  {
    id: "user-102",
    name: "Morgan Lee",
    email: "morgan@example.test",
    department: "Operations",
    role: "manager",
    status: "active",
  },
  {
    id: "user-103",
    name: "Owen Brooks",
    email: "owen@example.test",
    department: "Support",
    role: "operator",
    status: "suspended",
  },
  {
    id: "user-104",
    name: "Riley Chen",
    email: "riley@example.test",
    department: "Commerce",
    role: "operator",
    status: "active",
  },
];

const products: ReadonlyArray<AdminProduct> = [
  {
    id: "product-201",
    name: "Workspace Seat",
    category: "Subscription",
    price: 29,
    stock: 999,
    status: "active",
  },
  {
    id: "product-202",
    name: "Team Analytics",
    category: "Add-on",
    price: 49,
    stock: 120,
    status: "active",
  },
  {
    id: "product-203",
    name: "Migration Package",
    category: "Service",
    price: 499,
    stock: 12,
    status: "draft",
  },
];

const orders: ReadonlyArray<AdminOrder> = [
  {
    id: "order-301",
    customer: "Northwind Studio",
    total: 348,
    status: "processing",
    createdAt: "2026-06-18",
  },
  {
    id: "order-302",
    customer: "Contoso Labs",
    total: 129,
    status: "pending",
    createdAt: "2026-06-21",
  },
  {
    id: "order-303",
    customer: "Fabrikam Works",
    total: 997,
    status: "completed",
    createdAt: "2026-06-23",
  },
];

const roles: ReadonlyArray<RoleFormModel> = [
  {
    id: "role-admin",
    name: "Administrator",
    role: "admin",
    permissions: ["dashboard:view", "users:view", "roles:view"],
  },
  {
    id: "role-manager",
    name: "Manager",
    role: "manager",
    permissions: ["dashboard:view", "users:view", "orders:view"],
  },
  {
    id: "role-operator",
    name: "Operator",
    role: "operator",
    permissions: ["dashboard:view", "orders:view"],
  },
];

export function createAdminUsers(): Array<AdminUser> {
  return users.map((user) => ({ ...user }));
}

export function createAdminProducts(): Array<AdminProduct> {
  return products.map((product) => ({ ...product }));
}

export function createAdminOrders(): Array<AdminOrder> {
  return orders.map((order) => ({ ...order }));
}

export function createAdminRoles(): Array<RoleFormModel> {
  return roles.map((role) => ({
    ...role,
    permissions: [...role.permissions],
  }));
}
