export const productFixtures = [
  {
    id: "product-101",
    product_name: "Mechanical Keyboard",
    category: "Accessories",
    unit_price: 129,
    stock_count: 18,
    status: "active",
  },
  {
    id: "product-102",
    product_name: "USB-C Dock",
    category: "Accessories",
    unit_price: 89,
    stock_count: 7,
    status: "draft",
  },
] as const;

export const userFixtures = [
  {
    id: "user-101",
    display_name: "Avery Admin",
    email_address: "avery@example.test",
    role: "admin",
    status: "active",
  },
] as const;

export const validProductPayload = {
  name: "Monitor Arm",
  category: "Workspace",
  price: 79,
  stock: 12,
} as const;

export const loginFixtures = {
  admin: {
    token: "chapter-10-demo-token",
    user: {
      id: "admin-100",
      displayName: "Avery Admin",
      role: "admin",
    },
  },
} as const;

export const permissionFixtures = [
  "dashboard:view",
  "users:view",
  "products:create",
] as const;
