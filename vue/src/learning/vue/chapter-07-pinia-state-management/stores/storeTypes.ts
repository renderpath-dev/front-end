export type DemoUserRole = "admin" | "manager" | "operator";

export type DemoPermission =
  | "dashboard:view"
  | "users:view"
  | "users:detail"
  | "roles:view"
  | "orders:view";

export type DemoUser = {
  id: string;
  displayName: string;
  role: DemoUserRole;
  permissions: ReadonlyArray<DemoPermission>;
};

export type ThemeMode = "light" | "dark" | "system";

export type SidebarState = {
  collapsed: boolean;
  pinned: boolean;
};

export type PreferenceState = {
  compactLayout: boolean;
  tableDensity: "comfortable" | "compact";
  dismissedTips: Array<string>;
};

export type CartProduct = {
  id: string;
  name: string;
  price: number;
};

export type CartItem = {
  productId: string;
  quantity: number;
};

export type SelectionItem = {
  id: string;
  label: string;
};

export type PersistedStoreId = "theme" | "preferences" | "cart";

export type PersistedStateEnvelope = {
  version: 1;
  storeId: PersistedStoreId;
  savedAt: string;
  state: Record<string, unknown>;
};

export type PersistenceError = {
  code: "read-failed" | "parse-failed" | "invalid-envelope" | "write-failed";
  storeId: PersistedStoreId;
  message: string;
};

export type RouteAccessMeta = {
  requiresAuth?: boolean;
  requiredRoles?: ReadonlyArray<DemoUserRole | "guest">;
  requiredPermissions?: ReadonlyArray<DemoPermission>;
};
