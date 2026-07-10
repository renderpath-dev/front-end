import type { RouteRecordRaw } from "vue-router";
import { pinia } from "../../chapter-07-pinia-state-management/stores/pinia";
import { useAuthStore } from "../../chapter-07-pinia-state-management/stores/authStore";
import { usePermissionStore } from "../../chapter-07-pinia-state-management/stores/permissionStore";
import {
  isAppRouteName,
  type AppRouteName,
} from "./routeNames";

export type DynamicMenuItem = {
  routeName: AppRouteName;
  label: string;
  order: number;
  children: ReadonlyArray<DynamicMenuItem>;
};

type AuthStore = ReturnType<typeof useAuthStore>;
type PermissionStore = ReturnType<typeof usePermissionStore>;

function canDisplayRoute(
  record: RouteRecordRaw,
  authStore: AuthStore,
  permissionStore: PermissionStore,
): boolean {
  if (!record.meta?.showInMenu) {
    return false;
  }

  if (record.meta.requiresAuth && !authStore.isSignedIn) {
    return false;
  }

  return permissionStore.canAccessRouteMeta(record.meta);
}

function collectMenuItems(
  records: readonly RouteRecordRaw[],
  authStore: AuthStore,
  permissionStore: PermissionStore,
): Array<DynamicMenuItem> {
  return records
    .flatMap((record) => {
      const children = record.children
        ? collectMenuItems(record.children, authStore, permissionStore)
        : [];

      if (
        !canDisplayRoute(record, authStore, permissionStore) ||
        !isAppRouteName(record.name)
      ) {
        return children;
      }

      return [
        {
          routeName: record.name,
          label: record.meta?.menuLabel ?? String(record.name),
          order: record.meta?.menuOrder ?? 0,
          children,
        },
      ];
    })
    .sort((left, right) => left.order - right.order);
}

export function generateDynamicMenu(
  records: readonly RouteRecordRaw[],
): ReadonlyArray<DynamicMenuItem> {
  const authStore = useAuthStore(pinia);
  const permissionStore = usePermissionStore(pinia);

  return collectMenuItems(records, authStore, permissionStore);
}
