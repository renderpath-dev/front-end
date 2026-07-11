export interface NuxtTestingBoundaryItem {
  readonly testArea: string;
  readonly evidence: string;
}

export const nuxtTestingBoundaryItems: ReadonlyArray<NuxtTestingBoundaryItem> =
  [
    {
      testArea: "Validation",
      evidence: "Invalid login and contact payloads fail before business logic runs.",
    },
    {
      testArea: "Protection",
      evidence: "Profile and admin helpers distinguish 401 from 403.",
    },
    {
      testArea: "Pages",
      evidence: "Content and dashboard pages keep their route contracts visible.",
    },
  ];
