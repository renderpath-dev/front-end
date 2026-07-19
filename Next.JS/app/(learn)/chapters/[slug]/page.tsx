import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BoundaryBadge } from "@/components/learning/BoundaryBadge";
import { RuntimeBadge } from "@/components/learning/RuntimeBadge";
import { TailwindUtilityExplain } from "@/components/learning/TailwindUtilityExplain";
import { CodeWindow } from "@/components/site/CodeWindow";
import { SiteTableOfContents } from "@/components/site/SiteTableOfContents";
import { chapterOneContent } from "@/content/chapter-01";
import {
  getAllChapterSlugs,
  getChapterBySlug,
} from "@/content/chapters";

type ChapterPageProps = {
  params: Promise<{ slug: string }>;
};

const sourceDocuments = [
  {
    kind: "guide",
    label: "Full learning guide",
    pathKey: "sourceGuidePath",
  },
  {
    kind: "cheatsheet",
    label: "Chapter cheatsheet",
    pathKey: "sourceCheatsheetPath",
  },
  {
    kind: "interview-questions",
    label: "Interview questions",
    pathKey: "sourceInterviewPath",
  },
] as const;

const chapterContentBySlug = {
  "chapter-01-positioning-project-structure-boundaries": chapterOneContent,
} as const;

export function generateStaticParams() {
  return getAllChapterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ChapterPageProps): Promise<Metadata> {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return {
      title: "Chapter not found | Next.js Learning Site",
    };
  }

  return {
    title: `${chapter.title} | Next.js Learning Site`,
    description: chapter.description,
  };
}

export default async function ChapterPage({ params }: ChapterPageProps) {
  const { slug } = await params;
  const chapter = getChapterBySlug(slug);
  const chapterContent =
    chapterContentBySlug[slug as keyof typeof chapterContentBySlug];

  if (!chapter || !chapterContent) {
    notFound();
  }

  return (
    <div className="grid gap-12 xl:grid-cols-[minmax(0,1fr)_16rem]">
      <article className="min-w-0">
        <header className="border-b border-border pb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-muted">
              Chapter {chapter.chapterNumber}
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              {chapter.status}
            </span>
            <span className="rounded-full border border-border bg-muted-surface px-3 py-1 text-xs font-semibold text-muted">
              {chapter.phase}
            </span>
          </div>
          <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            {chapter.title}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
            {chapterContent.heroSummary}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {chapter.tags.map((tag) => (
              <span
                className="rounded-md bg-accent-soft px-2.5 py-1 text-xs font-semibold text-accent"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="space-y-16 py-12">
          <section className="scroll-mt-24" id="objectives">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Learning contract
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              Learning objectives
            </h2>
            <ul className="mt-6 grid gap-3">
              {chapterContent.objectives.map((objective) => (
                <li
                  className="flex gap-3 rounded-xl border border-border bg-card p-4 text-sm leading-6 text-muted"
                  key={objective}
                >
                  <span aria-hidden="true" className="font-bold text-accent">
                    ✓
                  </span>
                  <span>{objective}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="scroll-mt-24" id="mechanism-chain">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Source to runtime
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              Mechanism chain
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted">
              Follow one route from its module graph through build output,
              request handling, browser hydration, and platform hosting.
            </p>
            <ol className="mt-8 grid gap-4">
              {chapterContent.mechanismChain.map((item) => (
                <li
                  className="grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto]"
                  key={item.step}
                >
                  <span className="font-mono text-sm font-bold text-accent">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted">
                      {item.detail}
                    </p>
                  </div>
                  <div>
                    <BoundaryBadge kind={item.boundary} />
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="scroll-mt-24" id="boundary-audit">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Repository evidence
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              Boundary audit
            </h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full min-w-[50rem] border-collapse text-left text-sm">
                <thead className="bg-muted-surface">
                  <tr>
                    <th className="border-b border-border px-4 py-3">File</th>
                    <th className="border-b border-border px-4 py-3">Owner</th>
                    <th className="border-b border-border px-4 py-3">Phase</th>
                    <th className="border-b border-border px-4 py-3">
                      Runtime
                    </th>
                    <th className="border-b border-border px-4 py-3">
                      Evidence
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {chapterContent.boundaryAudit.map((row) => (
                    <tr key={row.file}>
                      <td className="px-4 py-4 align-top">
                        <code>{row.file}</code>
                      </td>
                      <td className="px-4 py-4 align-top text-muted">
                        {row.owner}
                      </td>
                      <td className="px-4 py-4 align-top text-muted">
                        {row.phase}
                      </td>
                      <td className="px-4 py-4 align-top">
                        <RuntimeBadge runtime={row.runtime} />
                      </td>
                      <td className="px-4 py-4 align-top text-muted">
                        {row.evidence}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="scroll-mt-24" id="server-client">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Module graphs
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              Server Component vs. Client Component
            </h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-border bg-card">
              <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
                <thead className="bg-muted-surface">
                  <tr>
                    <th className="border-b border-border px-4 py-3">
                      Concern
                    </th>
                    <th className="border-b border-border px-4 py-3">
                      Server Component
                    </th>
                    <th className="border-b border-border px-4 py-3">
                      Client Component
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {chapterContent.serverClientComparison.map((row) => (
                    <tr key={row.concern}>
                      <th className="px-4 py-4 align-top font-semibold text-foreground">
                        {row.concern}
                      </th>
                      <td className="px-4 py-4 align-top text-muted">
                        {row.server}
                      </td>
                      <td className="px-4 py-4 align-top text-muted">
                        {row.client}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <CodeWindow
                code={chapterContent.codeExamples.serverPage}
                language="tsx"
                title="Server page"
              />
              <CodeWindow
                code={chapterContent.codeExamples.clientIsland}
                language="tsx"
                title="Client island"
              />
            </div>
          </section>

          <section className="scroll-mt-24" id="tailwind-utilities">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Utility-first styling
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              Tailwind utility map
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted">
              Utilities are compact selectors, not hidden layout magic. This
              table connects the page shell classes to the CSS behavior they
              request.
            </p>
            <div className="mt-6">
              <TailwindUtilityExplain
                items={chapterContent.tailwindUtilityNotes}
              />
            </div>
          </section>

          <section className="scroll-mt-24" id="experiments">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Debugging practice
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              Experiments
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {chapterContent.experiments.map((experiment) => (
                <article
                  className="rounded-xl border border-border bg-card p-5"
                  key={experiment.title}
                >
                  <h3 className="font-semibold text-foreground">
                    {experiment.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    <strong className="text-foreground">Action:</strong>{" "}
                    {experiment.action}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    <strong className="text-foreground">Expected:</strong>{" "}
                    {experiment.expected}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="scroll-mt-24" id="common-mistakes">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Failure patterns
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              Common mistakes
            </h2>
            <div className="mt-6 grid gap-4">
              {chapterContent.commonMistakes.map((item) => (
                <article
                  className="rounded-xl border border-border bg-card p-5"
                  key={item.mistake}
                >
                  <h3 className="font-semibold text-foreground">
                    {item.mistake}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.correction}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="scroll-mt-24" id="source-documents">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Deep learning material
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-foreground">
              Source documents
            </h2>
            <p className="mt-3 max-w-3xl leading-7 text-muted">
              The curated route stays concise. Open the preserved Chinese
              Markdown documents for the complete explanations and practice
              material.
            </p>
            <div className="mt-6 grid gap-4">
              {sourceDocuments.map((document) => (
                <article
                  className="rounded-xl border border-border bg-card p-5"
                  key={document.kind}
                >
                  <Link
                    className="font-semibold text-accent outline-none hover:underline focus-visible:ring-2 focus-visible:ring-accent"
                    href={`/chapters/${chapter.slug}/source/${document.kind}`}
                  >
                    {document.label} <span aria-hidden="true">→</span>
                  </Link>
                  <p className="mt-2 text-sm text-muted">
                    <code>{chapter[document.pathKey]}</code>
                  </p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </article>
      <SiteTableOfContents items={chapterContent.tableOfContents} />
    </div>
  );
}
