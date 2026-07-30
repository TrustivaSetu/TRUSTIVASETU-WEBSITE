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
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const incrementTime = 20;
    const totalSteps = duration / incrementTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
