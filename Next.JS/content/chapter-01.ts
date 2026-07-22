import type { BoundaryKind } from "@/components/learning/BoundaryBadge";
import type { RuntimeKind } from "@/components/learning/RuntimeBadge";

export type ChapterSectionLink = {
  id: string;
  title: string;
};

export type MechanismStep = {
  step: string;
  title: string;
  detail: string;
  boundary: BoundaryKind;
};

export type BoundaryAuditRow = {
  file: string;
  owner: string;
  phase: string;
  runtime: RuntimeKind;
  evidence: string;
};

export type LearningExperiment = {
  title: string;
  action: string;
  expected: string;
};

export type TailwindUtilityNote = {
  utility: string;
  cssMeaning: string;
  why: string;
};

export type CodeExample = {
  title: string;
  language: string;
  code: string;
  description: string;
  boundary: BoundaryKind;
  runtime: RuntimeKind;
  learningPoint: string;
  highlightedLines?: readonly number[];
};

export type ExperienceBoundaryNote = {
  title: string;
  detail: string;
  boundary: BoundaryKind;
};

export const chapterOneContent = {
  heroSummary:
    "Use concrete repository evidence to determine who owns a feature, when code runs, and which runtime APIs are available.",
  objectives: [
    "Distinguish React library responsibilities from Next.js framework responsibilities and deployment-platform responsibilities.",
    "Read the App Router file tree as a routing and rendering contract.",
    "Explain why Server Components are the default and where a client boundary begins.",
    "Classify values as build-time, request-time, server-runtime, browser-runtime, or platform-runtime values.",
    "Use development, production build, and production start commands as separate forms of evidence.",
  ],
  mechanismChain: [
    {
      step: "01",
      title: "Source modules define the graph",
      detail:
        "The App Router reads special files and the use client directive to separate server and client module graphs.",
      boundary: "server",
    },
    {
      step: "02",
      title: "The build validates and prepares output",
      detail:
        "next build compiles modules, generates route output, processes Tailwind utilities, and reports production-only failures.",
      boundary: "build",
    },
    {
      step: "03",
      title: "The server resolves routes",
      detail:
        "A page request selects layouts and pages, while an API request executes a Route Handler in its configured runtime.",
      boundary: "request",
    },
    {
      step: "04",
      title: "The browser receives only public output",
      detail:
        "HTML, the React Server Component payload, styles, and required client JavaScript cross the network boundary.",
      boundary: "browser",
    },
    {
      step: "05",
      title: "The client island becomes interactive",
      detail:
        "React hydrates the small mobile-navigation island so state and click handlers can run in the browser.",
      boundary: "client",
    },
    {
      step: "06",
      title: "The platform hosts the result",
      detail:
        "A deployment platform may run builds and requests, but it does not change the framework ownership of the code.",
      boundary: "platform",
    },
  ] satisfies readonly MechanismStep[],
  boundaryAudit: [
    {
      file: "app/layout.tsx",
      owner: "Next.js App Router",
      phase: "Build or request render",
      runtime: "nodejs",
      evidence: "Root layout with metadata and no use client directive.",
    },
    {
      file: "app/(learn)/chapters/[slug]/page.tsx",
      owner: "Next.js App Router",
      phase: "Build-time prerender for known slugs",
      runtime: "build",
      evidence: "generateStaticParams returns the known chapter slug.",
    },
    {
      file: "components/site/SiteMobileNav.tsx",
      owner: "React client module graph",
      phase: "Browser hydration and interaction",
      runtime: "browser",
      evidence:
        "The file starts with use client and owns menu state, event handlers, and Motion animation state.",
    },
    {
      file: "lib/codeHighlighter.ts",
      owner: "Server-only Shiki highlighting",
      phase: "Build-time prerender for structured examples",
      runtime: "build",
      evidence:
        "The module imports server-only and converts Shiki HAST to React elements before browser delivery.",
    },
    {
      file: "components/site/CopyButton.tsx",
      owner: "React client module graph",
      phase: "Browser event handling after hydration",
      runtime: "browser",
      evidence:
        "The file starts with use client and calls navigator.clipboard inside a click handler.",
    },
    {
      file: "components/site/ActiveTableOfContents.tsx",
      owner: "Browser viewport observer",
      phase: "Browser scroll observation after hydration",
      runtime: "browser",
      evidence:
        "The file starts with use client and creates an IntersectionObserver inside useEffect.",
    },
    {
      file: "app/api/runtime-check/route.ts",
      owner: "Next.js Route Handler",
      phase: "HTTP request handling",
      runtime: "nodejs",
      evidence: "The route exports runtime = nodejs and a GET handler.",
    },
    {
      file: "app/globals.css",
      owner: "Tailwind CSS and PostCSS",
      phase: "Build-time stylesheet processing",
      runtime: "build",
      evidence: "The stylesheet imports tailwindcss.",
    },
  ] satisfies readonly BoundaryAuditRow[],
  serverClientComparison: [
    {
      concern: "Default role",
      server: "Render routes and static learning content",
      client: "Add the smallest required interaction",
    },
    {
      concern: "Available APIs",
      server: "Filesystem, server environment, and request APIs",
      client: "State, event handlers, window, document, and storage",
    },
    {
      concern: "Browser JavaScript",
      server: "Component source is not shipped as client JavaScript",
      client: "Module and imported dependencies enter the client bundle",
    },
    {
      concern: "This site",
      server:
        "Layouts, pages, cards, badges, content, and server-rendered Shiki code markup",
      client:
        "Mobile navigation, copy buttons, reveal wrappers, active TOC, and reading progress",
    },
  ],
  experiments: [
    {
      title: "Inspect the runtime endpoint",
      action: "Open /api/runtime-check and compare its booleans with browser globals.",
      expected:
        "The server reports hasWindow and hasDocument as false while returning a request-time timestamp.",
    },
    {
      title: "Trace the client boundary",
      action:
        "Search for use client, then inspect every import owned by that file.",
      expected:
        "Every client boundary owns state, effects, event handlers, browser APIs, or Motion animation state.",
    },
    {
      title: "Compare build and request evidence",
      action:
        "Run pnpm build, then pnpm start and refresh the runtime endpoint.",
      expected:
        "The chapter page is prerendered for its known slug, while generatedAt changes for each API request.",
    },
    {
      title: "Translate utilities to CSS",
      action:
        "Inspect the docs shell grid and explain each responsive utility in plain CSS.",
      expected:
        "The explanation identifies grid columns, media-query breakpoints, gaps, and sticky positioning.",
    },
  ] satisfies readonly LearningExperiment[],
  commonMistakes: [
    {
      mistake: "Adding use client to a layout because it contains links.",
      correction:
        "Links and static navigation work in Server Components; add a client boundary only for state or browser interaction.",
    },
    {
      mistake: "Treating a Server Component as synonymous with request-time work.",
      correction:
        "A Server Component can execute during build-time prerendering or during server request handling, depending on route behavior.",
    },
    {
      mistake: "Reading window while a Server Component renders.",
      correction:
        "window belongs to the browser runtime. Move that access into a focused Client Component and use it after hydration when needed.",
    },
    {
      mistake: "Assuming next dev proves the production build.",
      correction:
        "Run lint and typecheck separately, then run next build because production compilation and prerendering have distinct failure modes.",
    },
    {
      mistake: "Using NEXT_PUBLIC_ for a secret.",
      correction:
        "That prefix marks a value for public browser exposure. Keep secrets server-only and never return them in markup or JSON.",
    },
  ],
  tailwindUtilityNotes: [
    {
      utility: "lg:grid-cols-[16rem_minmax(0,1fr)]",
      cssMeaning:
        "@media (width >= 64rem) { grid-template-columns: 16rem minmax(0, 1fr); }",
      why: "Creates the desktop sidebar and flexible content columns without changing the mobile document flow.",
    },
    {
      utility: "xl:grid-cols-[minmax(0,1fr)_16rem]",
      cssMeaning:
        "@media (width >= 80rem) { grid-template-columns: minmax(0, 1fr) 16rem; }",
      why: "Adds the right table of contents only when the reading column has enough room.",
    },
    {
      utility: "sticky top-20",
      cssMeaning: "position: sticky; top: 5rem;",
      why: "Keeps navigation visible while preserving normal document flow until its threshold is reached.",
    },
    {
      utility: "focus-visible:ring-2",
      cssMeaning:
        "Apply a two-pixel focus ring when keyboard-style focus should be visible.",
      why: "Makes keyboard navigation discoverable without relying only on color changes.",
    },
  ] satisfies readonly TailwindUtilityNote[],
  tableOfContents: [
    { id: "objectives", title: "Learning objectives" },
    { id: "mechanism-chain", title: "Mechanism chain" },
    { id: "boundary-audit", title: "Boundary audit" },
    { id: "server-client", title: "Server vs. client" },
    { id: "code-examples", title: "Code examples" },
    { id: "tailwind-utilities", title: "Tailwind utility notes" },
    { id: "experience-boundaries", title: "Experience boundaries" },
    { id: "experiments", title: "Debugging experiments" },
    { id: "common-mistakes", title: "Common mistakes" },
    { id: "source-documents", title: "Source documents" },
  ] satisfies readonly ChapterSectionLink[],
  codeExamples: [
    {
      title: "Server Component timestamp",
      language: "tsx",
      code: `export default function BoundaryTimestamp() {
  const renderedAt = new Date().toISOString();

  return <p>Server render timestamp: {renderedAt}</p>;
}`,
      description:
        "This component has no use client directive. In a static route it can run during prerendering; in a dynamic route it can run on the server for a request.",
      boundary: "server",
      runtime: "build",
      learningPoint:
        "Server Component source is not shipped as client JavaScript, but its rendered result crosses to the browser.",
      highlightedLines: [1, 2],
    },
    {
      title: "Client Component hydration",
      language: "tsx",
      code: `"use client";

import { useState } from "react";

export function HydratedToggle() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button type="button" onClick={() => setIsOpen((current) => !current)}>
      {isOpen ? "Panel open" : "Panel closed"}
    </button>
  );
}`,
      description:
        "The directive creates a client module boundary because this component owns state and a click handler.",
      boundary: "client",
      runtime: "browser",
      learningPoint:
        "Hydration attaches event handlers to server-rendered HTML so the button can update browser state.",
      highlightedLines: [1, 5, 8],
    },
    {
      title: "Route Handler runtime JSON",
      language: "ts",
      code: `export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    generatedAt: new Date().toISOString(),
    hasWindow: typeof window !== "undefined",
  });
}`,
      description:
        "A route.ts file handles HTTP requests outside the React component tree and returns JSON from the configured runtime.",
      boundary: "request",
      runtime: "nodejs",
      learningPoint:
        "Route Handlers use Web Request and Response primitives, and their output is not a React component render.",
      highlightedLines: [1, 3, 4],
    },
    {
      title: "Wrong Server Component localStorage read",
      language: "tsx",
      code: `export default function BrokenServerComponent() {
  const savedDraft = localStorage.getItem("draft");

  return <p>{savedDraft}</p>;
}`,
      description:
        "This is intentionally wrong because localStorage belongs to the browser, not the server render environment.",
      boundary: "server",
      runtime: "nodejs",
      learningPoint:
        "If a value requires window, document, localStorage, or navigator, move that read behind a Client Component boundary.",
      highlightedLines: [2],
    },
    {
      title: "Tailwind utility layout",
      language: "tsx",
      code: `import type { ReactNode } from "react";

export function DocsShell({ children }: { children: ReactNode }) {
  return (
    <main className="grid gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
      {children}
    </main>
  );
}`,
      description:
        "Tailwind utility strings are static class names compiled into CSS; they do not require a client boundary.",
      boundary: "build",
      runtime: "build",
      learningPoint:
        "Styling can stay in Server Components because CSS generation is tooling work, not browser state.",
      highlightedLines: [5],
    },
  ] satisfies readonly CodeExample[],
  experienceBoundaries: [
    {
      title: "Code highlighting stays server-side",
      detail:
        "Structured code examples are static page content, so Shiki can convert tokens to server-rendered JSX before the browser receives the route.",
      boundary: "server",
    },
    {
      title: "Copy buttons are browser-only",
      detail:
        "The Clipboard API is exposed through navigator.clipboard and must run from a user action after hydration.",
      boundary: "browser",
    },
    {
      title: "Motion wrappers are focused clients",
      detail:
        "Animation state and viewport timing run in the browser, but Server pages can pass server-rendered children into small client wrappers.",
      boundary: "client",
    },
    {
      title: "Tailwind does not imply client rendering",
      detail:
        "Utility classes compile to CSS and can style Server Components without shipping component source to the browser.",
      boundary: "build",
    },
    {
      title: "Reduced motion is an accessibility boundary",
      detail:
        "Motion decisions must respect the user's reduced-motion preference and remove non-essential transforms when requested.",
      boundary: "browser",
    },
  ] satisfies readonly ExperienceBoundaryNote[],
} as const;
