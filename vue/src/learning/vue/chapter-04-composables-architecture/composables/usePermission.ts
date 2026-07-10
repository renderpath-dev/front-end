import { toValue, type MaybeRefOrGetter } from "vue";

export type PermissionName =
  | "records:read"
  | "records:edit"
  | "records:delete";

export type UserRole = "viewer" | "editor" | "admin";

export type PermissionInput = {
  role: MaybeRefOrGetter<UserRole>;
  permissions: MaybeRefOrGetter<readonly PermissionName[]>;
};

export type PermissionState = {
  can: (permission: PermissionName) => boolean;
  canAny: (permissions: readonly PermissionName[]) => boolean;
  canAll: (permissions: readonly PermissionName[]) => boolean;
};

export function usePermission({
  role,
  permissions,
}: PermissionInput): PermissionState {
  function can(permission: PermissionName): boolean {
    return (
      toValue(role) === "admin" ||
      toValue(permissions).includes(permission)
    );
  }

  function canAny(requiredPermissions: readonly PermissionName[]): boolean {
    return requiredPermissions.some(can);
  }

  function canAll(requiredPermissions: readonly PermissionName[]): boolean {
    return requiredPermissions.every(can);
  }

  return {
    can,
    canAny,
    canAll,
  };
}
