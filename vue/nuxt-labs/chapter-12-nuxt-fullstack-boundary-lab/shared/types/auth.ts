export type DemoRole = "guest" | "admin";

export interface DemoSession {
  readonly role: DemoRole;
  readonly canAccessAdmin: boolean;
}
