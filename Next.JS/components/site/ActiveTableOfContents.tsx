"use client";

import { useEffect, useMemo, useState } from "react";

export type TableOfContentsItem = {
  id: string;
  title: string;
};

export function ActiveTableOfContents({
  items,
}: {
  items: readonly TableOfContentsItem[];
}) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const itemIds = useMemo(() => items.map((item) => item.id), [items]);
  const itemIdKey = itemIds.join("|");

  useEffect(() => {
    if (itemIds.length === 0 || !("IntersectionObserver" in window)) {
      return;
    }

    const visibleHeadings = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;

          if (entry.isIntersecting) {
            visibleHeadings.set(id, entry.boundingClientRect.top);
          } else {
            visibleHeadings.delete(id);
          }
        }

        const nextActiveId = [...visibleHeadings.entries()].sort(
          (first, second) => first[1] - second[1],
        )[0]?.[0];

        if (nextActiveId) {
          setActiveId(nextActiveId);
        }
      },
      {
        rootMargin: "-25% 0px -65% 0px",
        threshold: [0, 1],
      },
    );

    for (const id of itemIds) {
      const heading = document.getElementById(id);

      if (heading) {
        observer.observe(heading);
      }
    }

    return () => observer.disconnect();
  }, [itemIdKey, itemIds]);

  return (
    <aside className="hidden xl:block">
      <nav
        aria-label="On this page"
        className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto border-l border-border pl-6"
        data-active-table-of-contents=""
      >
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
          On this page
        </p>
        <ol className="grid gap-2">
          {items.map((item) => {
            const isActive = item.id === activeId;

            return (
              <li key={item.id}>
                <a
                  aria-current={isActive ? "location" : undefined}
                  className={
                    isActive
                      ? "block rounded-sm border-l-2 border-accent pl-3 text-sm font-semibold leading-5 text-accent outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      : "block rounded-sm border-l-2 border-transparent pl-3 text-sm leading-5 text-muted outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
                  }
                  href={`#${item.id}`}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
