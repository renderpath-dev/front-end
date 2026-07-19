export type BoundaryFact = {
  id: string;
  name: string;
  boundary: string;
  timing: string;
  description: string;
};

export type ProjectFileBoundary = {
  file: string;
  boundary: string;
  timing: string;
};

export const boundaryFacts: BoundaryFact[] = [
  {
    id: "server-component",
    name: "Server Component",
    boundary: "Server",
    timing: "Build time or request time",
    description:
      "App Router pages and layouts are Server Components by default. Dynamic APIs can move rendering from build time to request time.",
  },
  {
    id: "client-component",
    name: "Client Component",
    boundary: "Browser after hydration",
    timing: "Initial rendering plus browser hydration",
    description:
      "The use client directive creates a client module boundary for state, effects, event handlers, and browser APIs.",
  },
  {
    id: "route-handler",
    name: "Route Handler",
    boundary: "Node.js server runtime",
    timing: "HTTP request time",
    description:
      "A route.ts file handles HTTP methods with the Web Request and Response APIs outside the React component tree.",
  },
  {
    id: "environment-variable",
    name: "Environment variable",
    boundary: "Server-only or public browser bundle",
    timing: "Server runtime or build time",
    description:
      "Unprefixed variables stay on the server. NEXT_PUBLIC_ variables are inlined during next build and become visible to the browser.",
  },
  {
    id: "browser-api",
    name: "Browser API",
    boundary: "Browser",
    timing: "After client code runs",
    description:
      "window, document, and localStorage are unavailable in the Node.js server runtime and belong behind a Client Component boundary.",
  },
  {
    id: "next-dev",
    name: "next dev",
    boundary: "Local development tooling",
    timing: "On-demand compilation and request handling",
    description:
      "Starts the development server with development diagnostics and rebuilds modules as files change.",
  },
  {
    id: "next-build",
    name: "next build",
    boundary: "Build process",
    timing: "Before production starts",
    description:
      "Creates optimized production output and prerenders routes that are eligible for static generation.",
  },
  {
    id: "next-start",
    name: "next start",
    boundary: "Production Node.js server",
    timing: "After next build",
    description:
      "Serves the completed production build and executes request-time server work for dynamic routes.",
  },
];

export const projectFileBoundaries: ProjectFileBoundary[] = [
  {
    file: "app/layout.tsx",
    boundary: "Server Component",
    timing: "Build time or request time, depending on the route",
  },
  {
    file: "app/page.tsx",
    boundary: "Server Component",
    timing: "Request time because it calls connection()",
  },
  {
    file: "app/boundary-report/page.tsx",
    boundary: "Server Component",
    timing: "Eligible for build-time prerendering",
  },
  {
    file: "app/api/runtime-check/route.ts",
    boundary: "Node.js Route Handler",
    timing: "Each GET request",
  },
  {
    file: "components/HydrationClock.tsx",
    boundary: "Client Component",
    timing: "Timestamp created after browser hydration",
  },
  {
    file: "components/ClientStoragePanel.tsx",
    boundary: "Client Component",
    timing: "Browser event handlers",
  },
  {
    file: "lib/serverEnv.ts",
    boundary: "Server-only module",
    timing: "When imported by server code",
  },
  {
    file: "lib/boundaryFacts.ts",
    boundary: "Serializable shared data",
    timing: "Consumed by server rendering in this project",
  },
  {
    file: "docs/execution-boundary-report.md",
    boundary: "Documentation",
    timing: "Never executed",
  },
  {
    file: "AGENTS.md",
    boundary: "Agent instructions",
    timing: "Read by development tools, never shipped to the browser",
  },
  {
    file: ".env.example",
    boundary: "Environment variable template",
    timing: "Never loaded as a secret source",
  },
];

export const commonMistakes = [
  "Reading localStorage in app/page.tsx.",
  "Using NEXT_PUBLIC_ for a secret.",
  "Assuming TypeScript makes window available on the server.",
  "Assuming development output equals production output.",
];
