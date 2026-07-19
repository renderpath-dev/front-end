"use client";

import Link from "next/link";
import { useState } from "react";

type MobileChapterLink = {
  slug: string;
  chapterNumber: number;
  shortTitle: string;
};

export function SiteMobileNav({
  chapters,
}: {
  chapters: readonly MobileChapterLink[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border bg-card lg:hidden">
      <div className="mx-auto max-w-[90rem] px-4 py-3 sm:px-6">
        <button
          aria-controls="mobile-chapter-navigation"
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-left text-sm font-semibold text-foreground outline-none hover:border-accent focus-visible:ring-2 focus-visible:ring-accent"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span>Learning navigation</span>
          <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
        </button>
        {isOpen ? (
          <nav
            aria-label="Mobile chapter navigation"
            className="mt-3 grid gap-1"
            id="mobile-chapter-navigation"
          >
            <Link
              className="rounded-md px-3 py-2 text-sm font-medium text-muted outline-none hover:bg-muted-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
              href="/chapters"
            >
              All chapters
            </Link>
            {chapters.map((chapter) => (
              <Link
                className="rounded-md px-3 py-2 text-sm text-muted outline-none hover:bg-muted-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
                href={`/chapters/${chapter.slug}`}
                key={chapter.slug}
              >
                Chapter {chapter.chapterNumber}: {chapter.shortTitle}
              </Link>
            ))}
          </nav>
        ) : null}
      </div>
    </div>
  );
}
