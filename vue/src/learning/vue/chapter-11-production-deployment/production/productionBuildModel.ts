export type ProductionRuntimeLayer =
  | "dev-server"
  | "type-gate"
  | "production-build"
  | "preview-server"
  | "static-host"
  | "nginx"
  | "cdn"
  | "docker-runtime"
  | "browser-runtime";

export interface ProductionStageRecord {
  readonly id: ProductionRuntimeLayer;
  readonly label: string;
  readonly owner: string;
  readonly command: string;
  readonly input: string;
  readonly output: string;
  readonly evidence: string;
  readonly boundary: string;
}

export const productionBuildStages: ReadonlyArray<ProductionStageRecord> = [
  {
    id: "dev-server",
    label: "Vite dev server",
    owner: "Local development process",
    command: "npm run dev",
    input: "index.html and source modules",
    output: "Transformed modules served on demand",
    evidence: "Browser can load the local learning shell",
    boundary: "Does not prove production chunk graph or static hosting",
  },
  {
    id: "type-gate",
    label: "Vue SFC type gate",
    owner: "vue-tsc",
    command: "npm run typecheck",
    input: "tsconfig app graph and Vue SFC files",
    output: "Compiler diagnostics with no emitted files",
    evidence: "Exit code from vue-tsc",
    boundary: "Does not execute runtime API or browser behavior",
  },
  {
    id: "production-build",
    label: "Production build",
    owner: "Vite build pipeline",
    command: "npm run build",
    input: "Vite config, env mode, source graph, public assets",
    output: "dist directory with index and hashed assets",
    evidence: "dist/index.html and dist/assets",
    boundary: "Does not prove server fallback or CDN cache behavior",
  },
  {
    id: "preview-server",
    label: "Vite preview server",
    owner: "Local static preview process",
    command: "npm run preview",
    input: "Existing dist directory",
    output: "Local static file responses",
    evidence: "HTTP response from localhost preview port",
    boundary: "Not a production host or CDN",
  },
  {
    id: "static-host",
    label: "Static host",
    owner: "File server",
    command: "Serve dist",
    input: "Built static files",
    output: "index and asset responses",
    evidence: "HTTP headers and route refresh behavior",
    boundary: "Does not run Vue source or server secrets",
  },
  {
    id: "nginx",
    label: "Nginx SPA server",
    owner: "Nginx runtime",
    command: "nginx -g daemon off;",
    input: "dist files and nginx/vue-spa.conf",
    output: "Static responses with fallback and cache headers",
    evidence: "try_files and Cache-Control rules",
    boundary: "No backend proxy is configured in this chapter",
  },
  {
    id: "cdn",
    label: "CDN cache",
    owner: "Edge cache layer",
    command: "Provider specific upload and purge",
    input: "Static host responses",
    output: "Cached index and asset responses",
    evidence: "Cache headers and purge logs",
    boundary: "This chapter documents the boundary without provider lock-in",
  },
  {
    id: "docker-runtime",
    label: "Docker static runtime",
    owner: "Final Nginx image",
    command: "docker run --rm -p 8080:80 vue-production-deployment-lab",
    input: "Dist copied from the build stage",
    output: "Containerized static site",
    evidence: "Container build and HTTP response",
    boundary: "Final image should not contain source or node_modules",
  },
  {
    id: "browser-runtime",
    label: "Browser runtime",
    owner: "Client browser",
    command: "Open deployed URL",
    input: "index, JS chunks, CSS assets, runtime config file if used",
    output: "Vue application renders and navigates",
    evidence: "DOM, network panel, console, and route refresh",
    boundary: "Cannot access backend secrets embedded at deploy time",
  },
];
