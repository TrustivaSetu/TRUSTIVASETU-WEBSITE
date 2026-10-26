"use client";

import { useEffect, useState } from "react";

type CounterProps = {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
};

export default function Counter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: CounterProps) {
  const target = Number(end);
  const safeTarget = Number.isFinite(target) ? target : 0;

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (safeTarget <= 0) {
      setCount(safeTarget);
      return;
    }

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion || typeof requestAnimationFrame === "undefined") {
      setCount(safeTarget);
      return;
    }

    let frame = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutCubic for a lively count-up
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(progress >= 1 ? safeTarget : Math.floor(eased * safeTarget));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [safeTarget, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
