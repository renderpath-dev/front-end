import type { Metadata } from "next";
import { AnimatedList } from "@/components/motion/AnimatedList";
import { AnimatedReveal } from "@/components/motion/AnimatedReveal";
import { ChapterCard } from "@/components/site/ChapterCard";
import { chapters } from "@/content/chapters";

export const metadata: Metadata = {
  title: "Chapters | Next.js Learning Site",
  description:
    "Browse the chapter routes in the local Next.js learning website.",
};

export default function ChaptersPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <AnimatedReveal>
        <header className="max-w-3xl border-b border-border pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
          Learning path
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Chapters
        </h1>
        <p className="mt-5 text-lg leading-8 text-muted">
          Each chapter connects the framework surface to its build phase,
          runtime environment, observable output, and failure modes.
        </p>
        </header>
      </AnimatedReveal>
      <section
        aria-labelledby="available-chapters-heading"
        className="py-10"
      >
        <h2
          className="text-xl font-semibold text-foreground"
          id="available-chapters-heading"
        >
          Available now
        </h2>
        <AnimatedList className="mt-6 grid gap-5 md:grid-cols-2">
          {chapters.map((chapter) => (
            <ChapterCard chapter={chapter} key={chapter.slug} />
          ))}
        </AnimatedList>
      </section>
    </div>
  );
}
