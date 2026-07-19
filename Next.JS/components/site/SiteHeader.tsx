import Link from "next/link";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/chapters", label: "Chapters" },
  { href: "/api/runtime-check", label: "Runtime API" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <a
        className="sr-only z-50 rounded-md bg-foreground px-4 py-2 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        href="#main-content"
      >
        Skip to content
      </a>
      <div className="mx-auto flex h-16 max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <Link
          className="rounded-sm text-sm font-bold tracking-tight text-foreground outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background sm:text-base"
          href="/"
        >
          Next.js Learning Site
        </Link>
        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-1 sm:flex"
        >
          {primaryLinks.map((link) => (
            <Link
              className="rounded-md px-3 py-2 text-sm font-medium text-muted outline-none hover:bg-muted-surface hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent"
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
