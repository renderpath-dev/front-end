import Link from "next/link";
import { AnimatedList } from "@/components/motion/AnimatedList";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { ChapterCard } from "@/components/site/ChapterCard";
import { SiteHeader } from "@/components/site/SiteHeader";
import { chapters } from "@/content/chapters";

const learningCards = [
  {
    title: "Tailwind CSS Shell",
    description:
      "Study utility-first styling by mapping responsive layout classes back to their generated CSS behavior.",
    href: `${chapters[0].route}#tailwind-utilities`,
    label: "Explore utility mappings",
  },
  {
    title: "Runtime Boundary Lab",
    description:
      "Compare build output, server request handling, browser APIs, and the deployment-platform boundary.",
    href: "/api/runtime-check",
    label: "Inspect runtime JSON",
  },
] as const;

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main
        className="relative overflow-hidden"
        id="main-content"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.20),transparent_34rem)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem] bg-[linear-gradient(rgba(148,163,184,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.12)_1px,transparent_1px)] bg-[size:3rem_3rem]"
        />
        <section className="border-b border-border">
          <div className="mx-auto max-w-[90rem] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <AnimatedReveal className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Local learning workspace
              </p>
              <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
                Learn Next.js by tracing real execution boundaries.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
                This docs-style site connects App Router structure, Server and
                Client Components, Tailwind CSS, build phases, request
                handling, browser APIs, and deployment platforms to concrete
                files.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  className="rounded-lg bg-foreground px-4 py-2.5 text-sm font-semibold text-background outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                  href="/chapters"
                >
                  Browse chapters
                </Link>
                <a
                  className="rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground outline-none hover:border-accent focus-visible:ring-2 focus-visible:ring-accent"
                  href="/api/runtime-check"
                >
                  Open runtime API
                </a>
              </div>
            </AnimatedReveal>
          </div>
        </section>

        <section className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8">
          <AnimatedReveal className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Start with evidence
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              One chapter, three learning surfaces
            </h2>
            <p className="mt-3 leading-7 text-muted">
              Read the curated chapter route, inspect the styling mechanism,
              and compare server evidence with browser behavior.
            </p>
          </AnimatedReveal>
          <AnimatedList className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <ChapterCard chapter={chapters[0]} />
            {learningCards.map((card) => (
              <article
                className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm shadow-slate-950/5 motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg"
                key={card.title}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
                  Learning surface
                </p>
                <h2 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
                  {card.title}
                </h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">
                  {card.description}
                </p>
                <Link
                  className="mt-6 rounded-sm text-sm font-semibold text-accent outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  href={card.href}
                >
                  {card.label} <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </AnimatedList>
        </section>
      </main>
    </>
  );
}
