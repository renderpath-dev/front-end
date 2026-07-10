import type {
  AdminOrder,
  AdminProduct,
  AdminRole,
  AdminUser,
} from "./adminUiTypes";

export type UserFormModel = Omit<AdminUser, "id"> & {
  id: string;
};

export type ProductFormModel = Omit<AdminProduct, "id"> & {
  id: string;
};

export type RoleFormModel = {
  id: string;
  name: string;
  role: AdminRole;
  permissions: Array<string>;
};

export type OrderStatusFormModel = {
  id: AdminOrder["id"];
  status: AdminOrder["status"];
};

export type FormSubmitResult = {
  success: boolean;
  message: string;
};

export type FormValidationState = {
  valid: boolean;
  message: string;
};
