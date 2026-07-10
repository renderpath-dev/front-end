import type { ApiListEnvelope } from "./apiEnvelopeContract";
import type { PaginationQuery } from "./paginationContract";

export type UserDto = {
  id: string;
  display_name: string;
  email_address: string;
  role: "admin" | "manager" | "operator";
  status: "active" | "suspended";
};

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserDto["role"];
  status: UserDto["status"];
};

export type UserListQuery = PaginationQuery & {
  keyword: string;
};

export type CreateUserPayload = {
  name: string;
  email: string;
  role: User["role"];
};

export type UserListResponse = ApiListEnvelope<UserDto>;
