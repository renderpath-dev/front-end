export type ViteBuildMode = "development" | "production" | "analyze";

export interface EnvModeRecord {
  readonly mode: ViteBuildMode;
  readonly command: string;
  readonly envFiles: ReadonlyArray<string>;
  readonly exposedPrefix: "VITE_";
  readonly purpose: string;
}

export const envModeRecords: ReadonlyArray<EnvModeRecord> = [
  {
    mode: "development",
    command: "npm run dev",
    envFiles: [
      ".env",
      ".env.local",
      ".env.development",
      ".env.development.local",
    ],
    exposedPrefix: "VITE_",
    purpose: "Local module serving and HMR",
  },
  {
    mode: "production",
    command: "npm run build",
    envFiles: [
      ".env",
      ".env.local",
      ".env.production",
      ".env.production.local",
    ],
    exposedPrefix: "VITE_",
    purpose: "Static production artifact generation",
  },
  {
    mode: "analyze",
    command: "npm run build:analyze",
    envFiles: [".env", ".env.local", ".env.analyze", ".env.analyze.local"],
    exposedPrefix: "VITE_",
    purpose: "Production build with bundle visualization",
  },
];

export const safeDemoEnv = {
  title: "Vue Production Deployment Lab",
  publicBasePath: "/",
  demoApiOrigin: "https://api.example.com",
} as const;
