import Link from "next/link";
import { chapters } from "@/content/chapters";

export function SiteSidebar({ activeSlug }: { activeSlug?: string }) {
  return (
    <aside className="hidden border-r border-border lg:block">
      <nav
        aria-label="Chapter navigation"
        className="sticky top-16 max-h-[calc(100vh-4rem)] overflow-y-auto px-6 py-8"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          Learning path
        </p>
        <Link
          className="block rounded-md px-3 py-2 text-sm font-medium text-muted outline-none hover:bg-muted-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
          href="/chapters"
        >
          All chapters
        </Link>
        <div className="mt-5 border-l border-border pl-3">
          {chapters.map((chapter) => {
            const isActive = chapter.slug === activeSlug;

            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={
                  isActive
                    ? "block rounded-md bg-accent-soft px-3 py-2 text-sm font-semibold text-accent outline-none focus-visible:ring-2 focus-visible:ring-accent"
                    : "block rounded-md px-3 py-2 text-sm text-muted outline-none hover:bg-muted-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
                }
                href={chapter.route}
                key={chapter.slug}
              >
                <span className="block text-xs opacity-70">
                  Chapter {chapter.chapterNumber}
                </span>
                <span className="mt-1 block">{chapter.shortTitle}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
