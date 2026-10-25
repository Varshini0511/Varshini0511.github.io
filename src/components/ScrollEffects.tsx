"use client";

import { useEffect } from "react";

/**
 * Scroll-driven motion for the whole site, in one observer:
 *
 *  - [data-reveal]        fades and rises into view (see globals.css)
 *  - [data-reveal="grow"] scales in from the left, for bars and connector lines
 *  - [data-count]         counts its number up from zero once visible
 *
 * Elements entering together are staggered by their position on screen, so
 * a grid of cards arrives left to right, top to bottom.
 *
 * Visibility is marked with a data-shown attribute rather than a class: React
 * owns className and would drop a class it didn't set on the next render.
 * Everything is gated on html.js, so without JavaScript nothing is hidden.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(
      (entries) => {
        const entering = entries
          .filter((e) => e.isIntersecting)
          .map((e) => ({ el: e.target as HTMLElement, r: e.boundingClientRect }))
          .sort((a, b) => a.r.top - b.r.top || a.r.left - b.r.left);

        entering.forEach(({ el }, i) => {
          el.style.setProperty("--reveal-delay", `${Math.min(i, 6) * 70}ms`);
          el.setAttribute("data-shown", "");
          io.unobserve(el);
          el.querySelectorAll<HTMLElement>("[data-count]").forEach((n) => countUp(n, reduce, i * 70));
          if (el.hasAttribute("data-count")) countUp(el, reduce, i * 70);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>("[data-reveal]:not([data-shown])").forEach((el) => io.observe(el));
      // Counters that sit outside any reveal wrapper get observed on their own.
      document
        .querySelectorAll<HTMLElement>("[data-count]:not([data-counted])")
        .forEach((el) => !el.closest("[data-reveal]") && io.observe(el));
    };
    scan();

    // Client-side navigation and filtering add new elements after first load.
    let queued = false;
    const mo = new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}

/** "218+" → counts 0…218 and keeps the "+". Values like "3–6 s" or "HITL" are left alone. */
function countUp(el: HTMLElement, reduce: boolean, delay: number) {
  if (el.hasAttribute("data-counted")) return;
  el.setAttribute("data-counted", "");
  const final = el.textContent ?? "";
  const m = final.match(/^(\D*)(\d+(?:\.\d+)?)(\D*)$/);
  if (!m || reduce) return;

  const [, prefix, num, suffix] = m;
  const target = parseFloat(num);
  const decimals = num.includes(".") ? num.split(".")[1].length : 0;
  const duration = 1100;
  let start = 0;

  const tick = (t: number) => {
    if (!start) start = t;
    const p = Math.min(1, (t - start) / duration);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = `${prefix}${(target * eased).toFixed(decimals)}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = final;
  };

  el.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;
  window.setTimeout(() => requestAnimationFrame(tick), delay);
}
