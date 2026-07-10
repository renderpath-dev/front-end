export const vitestEnvironmentNotes = {
  environment: "jsdom",
  provides: ["DOM APIs", "document", "window"],
  doesNotProvide: [
    "Browser layout fidelity",
    "Real navigation process",
    "Native browser rendering",
  ],
  setup:
    "MSW lifecycle, DOM cleanup, mock cleanup, and timer restoration run for every suite.",
} as const;
