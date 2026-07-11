export interface DeploymentOutputEntry {
  readonly command: string;
  readonly output: string;
  readonly meaning: string;
}

export const deploymentOutputEntries: ReadonlyArray<DeploymentOutputEntry> = [
  {
    command: "npm run build",
    output: ".output/server and .output/public",
    meaning: "Creates a production Nuxt server output plus public assets",
  },
  {
    command: "npm run generate",
    output: ".output/public",
    meaning: "Prerenders discoverable routes for static hosting",
  },
  {
    command: "npm run preview",
    output: "Local production preview server",
    meaning: "Runs the generated production output locally",
  },
];
