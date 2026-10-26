import confetti from "canvas-confetti";

const BRAND_COLORS = ["#bef264", "#a3e635", "#ffffff"];

type Cannon = ReturnType<typeof confetti.create>;
let cannon: Cannon | null = null;

/**
 * canvas-confetti's default global `confetti()` hard-codes `useWorker: true`,
 * which spins up a Web Worker from a `blob:` URL. Our CSP (`default-src 'self'`
 * with no `worker-src`) blocks that worker — and it fails SILENTLY: the canvas
 * is created, control is transferred to an OffscreenCanvas, and then nothing
 * ever renders because the worker never runs. iOS Safari has independent
 * OffscreenCanvas quirks on top of that.
 *
 * So we run our own canvas with `useWorker: false` (main-thread rendering),
 * which is CSP-safe and broadly compatible across Safari/iOS versions.
 */
function getCannon(): Cannon | null {
  if (typeof document === "undefined") return null;
  if (cannon) return cannon;

  const canvas = document.createElement("canvas");
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.position = "fixed";
  canvas.style.inset = "0";
  canvas.style.width = "100%";
  canvas.style.height = "100%";
  canvas.style.pointerEvents = "none";
  canvas.style.zIndex = "9999";
  document.body.appendChild(canvas);

  cannon = confetti.create(canvas, { resize: true, useWorker: false });
  return cannon;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Small, tasteful lime/brand confetti burst. Origin defaults to screen centre;
 * pass an element to originate the burst from its on-screen position.
 * No-ops when the user prefers reduced motion.
 */
export function celebrate(originEl?: HTMLElement | null): void {
  if (prefersReducedMotion()) return;

  const fire = getCannon();
  if (!fire) return;

  let origin = { x: 0.5, y: 0.6 };
  if (originEl) {
    const rect = originEl.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      origin = {
        x: (rect.left + rect.width / 2) / window.innerWidth,
        y: (rect.top + rect.height / 2) / window.innerHeight,
      };
    }
  }

  void fire({
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

/**
 * Plays the `.btn-shine` diagonal sweep once. The sweep is a CSS `:hover`
 * effect, which never fires on touch devices — this lets a tap trigger it too.
 * No-ops under reduced motion.
 */
export function triggerShine(el: HTMLElement | null | undefined): void {
  if (!el || prefersReducedMotion()) return;
  el.classList.remove("is-sweeping");
  // Force reflow so re-adding the class restarts the transition.
  void el.offsetWidth;
  el.classList.add("is-sweeping");
  window.setTimeout(() => el.classList.remove("is-sweeping"), 750);
}
