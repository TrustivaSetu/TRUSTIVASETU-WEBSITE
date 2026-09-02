import confetti from "canvas-confetti";

const BRAND_COLORS = ["#bef264", "#a3e635", "#ffffff"];

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true
  );
}

/**
 * Small, tasteful lime/brand confetti burst. Origin defaults to screen centre;
 * pass an element to originate the burst from its on-screen position.
 * No-ops when the user prefers reduced motion.
 */
export function celebrate(originEl?: HTMLElement | null): void {
  if (prefersReducedMotion()) return;

  let origin = { x: 0.5, y: 0.6 };
  if (originEl) {
    const rect = originEl.getBoundingClientRect();
    origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };
  }

  confetti({
    particleCount: 50,
    spread: 60,
    startVelocity: 32,
    gravity: 1.1,
    scalar: 0.85,
    ticks: 160,
    colors: BRAND_COLORS,
    origin,
    disableForReducedMotion: true,
  });
}
