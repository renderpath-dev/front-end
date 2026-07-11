export interface NuxtAuthSessionBoundaryItem {
  readonly flow: string;
  readonly serverRule: string;
  readonly clientRule: string;
}

export const nuxtAuthSessionBoundaryItems: ReadonlyArray<NuxtAuthSessionBoundaryItem> =
  [
    {
      flow: "Login",
      serverRule: "Validate unknown request bodies with Zod before setting a session.",
      clientRule: "Refresh session state after a successful login request.",
    },
    {
      flow: "Protected profile",
      serverRule: "Reject missing sessions with 401.",
      clientRule: "Use middleware only for navigation UX.",
    },
    {
      flow: "Admin report",
      serverRule: "Reject non-admin sessions with 403 and never return private secrets.",
      clientRule: "Do not treat hidden links as security.",
    },
  ];
