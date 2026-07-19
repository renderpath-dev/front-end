"use client";

import { useEffect, useState } from "react";

const publicLabel =
  process.env.NEXT_PUBLIC_CHAPTER_ONE_LABEL ?? "Public label not configured";

export function HydrationClock() {
  const [hydratedAt, setHydratedAt] = useState<string | null>(null);

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setHydratedAt(new Date().toISOString());
    }, 0);

    return () => window.clearTimeout(timerId);
  }, []);

  return (
    <section className="card" aria-labelledby="hydration-clock-heading">
      <h2 id="hydration-clock-heading">Browser hydration</h2>
      <p>
        <code>{hydratedAt ?? "Waiting for browser hydration..."}</code>
      </p>
      <p>
        Public build label: <code>{publicLabel}</code>
      </p>
      <p className="supporting-text">
        This timestamp is created by an effect only after the component
        hydrates in the browser.
      </p>
    </section>
  );
}
