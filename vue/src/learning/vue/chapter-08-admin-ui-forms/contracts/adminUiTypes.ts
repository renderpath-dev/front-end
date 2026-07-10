export type AdminRole = "admin" | "manager" | "operator";

export type AdminPermission =
  | "dashboard:view"
  | "users:view"
  | "users:create"
  | "users:edit"
  | "users:delete"
  | "roles:view"
  | "roles:edit"
  | "products:view"
  | "products:create"
  | "products:edit"
  | "products:delete"
  | "orders:view"
  | "orders:status"
  | "uploads:manage";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  department: string;
  role: AdminRole;
  status: "active" | "suspended";
};

export type AdminProduct = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "active" | "draft";
};

export type AdminOrder = {
  id: string;
  customer: string;
  total: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdAt: string;
};

export type AdminMenuItem = {
  id: AdminTab["id"];
  label: string;
  requiredRoles: ReadonlyArray<AdminRole>;
};

export type AdminTab = {
  id:
    | "dashboard"
    | "users"
    | "roles"
    | "products"
    | "orders"
    | "upload";
  label: string;
  closable: boolean;
};

export type CrudMode = "create" | "edit";

export type CrudStatus = "idle" | "submitting" | "success" | "failed";

export type OperationPermission =
  | "users:create"
  | "users:edit"
  | "users:delete"
  | "roles:edit"
  | "products:create"
  | "products:edit"
  | "products:delete"
  | "orders:status"
  | "uploads:manage";
