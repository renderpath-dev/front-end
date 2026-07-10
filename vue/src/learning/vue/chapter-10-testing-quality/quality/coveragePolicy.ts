export const coveragePolicy = {
  purpose:
    "Coverage identifies unexecuted paths; it does not prove useful assertions.",
  preferredTargets: [
    "Business branches",
    "Error normalization",
    "Permission decisions",
    "Boundary validation",
  ],
  rejectedShortcut: "Chasing a percentage without checking behavior",
} as const;
