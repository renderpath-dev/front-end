import { requestValidated } from "../api/httpClient";
import type { ApiCallOptions, ApiResult } from "../api/httpTypes";
import type { PaginatedResult } from "../contracts/paginationContract";
import type {
  CreateUserPayload,
  User,
  UserDto,
  UserListQuery,
} from "../contracts/userContract";
import {
  userListResponseSchema,
  userMutationResponseSchema,
} from "../validators/userValidator";

function mapUser(dto: UserDto): User {
  return {
    id: dto.id,
    name: dto.display_name,
    email: dto.email_address,
    role: dto.role,
    status: dto.status,
  };
}

export async function listUsers(
  query: UserListQuery,
  options: ApiCallOptions = {},
): Promise<ApiResult<PaginatedResult<User>>> {
  const result = await requestValidated(userListResponseSchema, {
    method: "GET",
    url: "/users",
    params: query,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "users:list" },
  });
  if (!result.ok) return result;

  const data: PaginatedResult<User> = {
    rows: result.data.data.map(mapUser),
    meta: result.data.meta,
  };
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}

export async function createUser(
  payload: CreateUserPayload,
  options: ApiCallOptions = {},
): Promise<ApiResult<User>> {
  const result = await requestValidated(userMutationResponseSchema, {
    method: "POST",
    url: "/users",
    body: payload,
    signal: options.signal,
    timeout: options.timeout,
    scenario: options.scenario,
    meta: { endpointName: "users:create" },
  });
  if (!result.ok) return result;

  const data = mapUser(result.data.data);
  return {
    ok: true,
    data,
    response: { ...result.response, data },
  };
}
