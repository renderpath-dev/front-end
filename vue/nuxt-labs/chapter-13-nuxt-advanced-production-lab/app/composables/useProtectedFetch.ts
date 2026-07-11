import type {
  AccountProfileResponse,
  AdminReportResponse,
} from "../../shared/types/auth";

export function useAccountProfile() {
  return useFetch<AccountProfileResponse>("/api/account/profile");
}

export function useAdminReport() {
  return useFetch<AdminReportResponse>("/api/admin/report");
}
