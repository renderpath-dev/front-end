"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

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
  const shouldReduceMotion = useReducedMotion();

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <div className="border-b border-border bg-card/95 backdrop-blur lg:hidden">
      <div className="mx-auto max-w-[90rem] px-4 py-3 sm:px-6">
        <button
          aria-controls="mobile-chapter-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close learning navigation" : "Open learning navigation"}
          className="flex w-full items-center justify-between rounded-md border border-border bg-background px-3 py-2 text-left text-sm font-semibold text-foreground outline-none transition-colors hover:border-accent focus-visible:ring-2 focus-visible:ring-accent"
          data-mobile-nav-toggle=""
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <span>Learning navigation</span>
          <span
            aria-hidden="true"
            className="grid size-7 place-items-center rounded-full bg-muted-surface text-base leading-none"
          >
            {isOpen ? "−" : "+"}
          </span>
        </button>
        <AnimatePresence initial={false}>
          {isOpen ? (
            <motion.nav
              animate={{ height: "auto", opacity: 1, y: 0 }}
              aria-label="Mobile chapter navigation"
              className="mt-3 grid gap-1 overflow-hidden rounded-xl border border-border bg-background p-2 shadow-sm"
              data-mobile-nav-panel=""
              exit={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { height: 0, opacity: 0, y: -6 }
              }
              id="mobile-chapter-navigation"
              initial={
                shouldReduceMotion
                  ? { opacity: 0 }
                  : { height: 0, opacity: 0, y: -6 }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.22,
                ease: "easeOut",
              }}
            >
              <Link
                className="rounded-md px-3 py-2 text-sm font-medium text-muted outline-none hover:bg-muted-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
                href="/chapters"
                onClick={closeMenu}
              >
                All chapters
              </Link>
              {chapters.map((chapter) => (
                <Link
                  className="rounded-md px-3 py-2 text-sm text-muted outline-none hover:bg-muted-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
                  href={`/chapters/${chapter.slug}`}
                  key={chapter.slug}
                  onClick={closeMenu}
                >
                  Chapter {chapter.chapterNumber}: {chapter.shortTitle}
                </Link>
              ))}
            </motion.nav>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
