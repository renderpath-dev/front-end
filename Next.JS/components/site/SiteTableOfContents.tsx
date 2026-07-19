type TableOfContentsItem = {
  id: string;
  title: string;
};

export function SiteTableOfContents({
  items,
}: {
  items: readonly TableOfContentsItem[];
}) {
  return (
    <aside className="hidden xl:block">
      <nav
        aria-label="On this page"
        className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto border-l border-border pl-6"
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          On this page
        </p>
        <ol className="grid gap-2">
          {items.map((item) => (
            <li key={item.id}>
              <a
                className="block rounded-sm text-sm leading-5 text-muted outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
                href={`#${item.id}`}
              >
                {item.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </aside>
  );
}
