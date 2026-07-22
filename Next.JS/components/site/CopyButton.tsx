"use client";

import { useRef, useState } from "react";

type CopyStatus = "idle" | "copied" | "failed";

export function CopyButton({
  code,
  title,
}: {
  code: string;
  title: string;
}) {
  const [status, setStatus] = useState<CopyStatus>("idle");
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function copyCode() {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
      resetTimerRef.current = null;
    }

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }

      await navigator.clipboard.writeText(code);
      setStatus("copied");
    } catch {
      setStatus("failed");
    } finally {
      resetTimerRef.current = setTimeout(() => {
        setStatus("idle");
        resetTimerRef.current = null;
      }, 1800);
    }
  }

  const labelByStatus: Record<CopyStatus, string> = {
    idle: "Copy",
    copied: "Copied",
    failed: "Copy failed",
  };

  return (
    <button
      aria-label={`Copy code from ${title}`}
      className="rounded-md border border-slate-600 bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 outline-none transition-colors hover:border-sky-300 hover:text-white focus-visible:ring-2 focus-visible:ring-sky-300"
      data-code-copy-button={title}
      onClick={copyCode}
      type="button"
    >
      <span aria-hidden="true">{labelByStatus[status]}</span>
      <span aria-live="polite" className="sr-only">
        {status === "idle" ? "Code copy is ready." : labelByStatus[status]}
      </span>
    </button>
  );
}
