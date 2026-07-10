import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";
import type { DemoUserRole } from "../../chapter-07-pinia-state-management/stores/storeTypes";
import type { OperationPermission } from "../contracts/adminUiTypes";

const permissionRoles = {
  "users:create": ["admin", "manager"],
  "users:edit": ["admin", "manager"],
  "users:delete": ["admin"],
  "roles:edit": ["admin"],
  "products:create": ["admin", "manager"],
  "products:edit": ["admin", "manager"],
  "products:delete": ["admin"],
  "orders:status": ["admin", "manager", "operator"],
  "uploads:manage": ["admin", "manager"],
} satisfies Record<OperationPermission, ReadonlyArray<DemoUserRole>>;

export function useButtonPermission() {
  const permissionStore = usePermissionStore();

  function canOperate(permission: OperationPermission): boolean {
    return permissionStore.hasRole(permissionRoles[permission]);
  }

  function isVisible(permission: OperationPermission): boolean {
    return canOperate(permission);
  }

  function isDisabled(permission: OperationPermission): boolean {
    return !canOperate(permission);
  }

  return {
    canOperate,
    isVisible,
    isDisabled,
  };
}
