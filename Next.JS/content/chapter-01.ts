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
      evidence: "The file starts with use client and owns useState.",
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
      server: "Layouts, pages, cards, badges, code windows, and content",
      client: "Only the mobile navigation toggle",
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
        "Only SiteMobileNav creates a client module boundary in the new site shell.",
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
    { id: "tailwind-utilities", title: "Tailwind utility map" },
    { id: "experiments", title: "Experiments" },
    { id: "common-mistakes", title: "Common mistakes" },
    { id: "source-documents", title: "Source documents" },
  ] satisfies readonly ChapterSectionLink[],
  codeExamples: {
    serverPage: `export default function ChapterPage() {
  return <main>Rendered as a Server Component by default.</main>;
}`,
    clientIsland: `"use client";

import { useState } from "react";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button onClick={() => setIsOpen((current) => !current)}>
      {isOpen ? "Close menu" : "Open menu"}
    </button>
  );
}`,
  },
} as const;
