"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let frameId = 0;

    function updateProgress() {
      frameId = 0;

      const scrollableDistance =
        document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress =
        scrollableDistance > 0 ? window.scrollY / scrollableDistance : 0;

      setProgress(Math.min(1, Math.max(0, nextProgress)));
    }

    function requestUpdate() {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    }

    updateProgress();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-transparent"
      data-reading-progress=""
    >
      <div
        className={
          shouldReduceMotion
            ? "h-full origin-left bg-accent"
            : "h-full origin-left bg-accent transition-transform duration-150 ease-out"
        }
        data-reading-progress-bar=""
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
