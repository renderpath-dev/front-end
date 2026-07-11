export type UserRole = "user" | "admin";
export type AuthStatus = "anonymous" | "authenticated";

export interface LoginRequestBody {
  readonly email: string;
  readonly password: string;
}

export interface SafeUser {
  readonly id: string;
  readonly email: string;
  readonly name: string;
  readonly role: UserRole;
}

export interface DemoUser extends SafeUser {
  readonly password: string;
}

export interface SessionStatusResponse {
  readonly status: AuthStatus;
  readonly user: SafeUser | null;
}

export interface LoginResponse {
  readonly user: SafeUser;
}

export interface AccountProfileResponse {
  readonly user: SafeUser;
  readonly summary: string;
}

export interface AdminReportResponse {
  readonly reportId: string;
  readonly generatedFor: SafeUser;
  readonly privateConfigAvailable: boolean;
  readonly records: ReadonlyArray<string>;
}
