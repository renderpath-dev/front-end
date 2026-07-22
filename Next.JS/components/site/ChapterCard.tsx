import Link from "next/link";
import type { ChapterMetadata } from "@/content/chapters";

const statusStyles: Record<ChapterMetadata["status"], string> = {
  Complete:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  "In progress":
    "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  Planned:
    "border-slate-500/30 bg-slate-500/10 text-slate-700 dark:text-slate-300",
};

export function ChapterCard({ chapter }: { chapter: ChapterMetadata }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm shadow-slate-950/5 motion-safe:transition motion-safe:duration-200 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Chapter {chapter.chapterNumber}
        </span>
        <span
          className={`rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[chapter.status]}`}
        >
          {chapter.status}
        </span>
      </div>
      <h2 className="mt-5 text-xl font-semibold tracking-tight text-foreground">
        <Link
          className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-card"
          href={chapter.route}
        >
          {chapter.title}
        </Link>
      </h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-muted">
        {chapter.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {chapter.tags.map((tag) => (
          <span
            className="rounded-md bg-muted-surface px-2 py-1 text-xs text-muted"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 text-sm font-semibold text-accent">
        <span className="underline-offset-4 group-hover:underline">
          Open chapter
        </span>{" "}
        <span aria-hidden="true">→</span>
      </div>
    </article>
  );
}
