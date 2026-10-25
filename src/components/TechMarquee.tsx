import { profile } from "@/data/profile";

/**
 * Two slow, opposing rows of technology: the AI toolkit above, the enterprise
 * stack below — the two halves of the profile in one band. Pauses on hover;
 * stands still under prefers-reduced-motion.
 */
const ai = profile.aiToolkit.flatMap((g) => g.items.map((i) => i.name));

function Row({ items, tone, reverse, duration }: { items: string[]; tone: "ai" | "core"; reverse?: boolean; duration: string }) {
  const chip =
    tone === "ai"
      ? "border-[var(--accent-line)] bg-[var(--accent-soft)] text-[var(--accent)]"
      : "border-[var(--border)] text-[var(--muted)]";
  return (
    <div className="marquee">
      <div
        className="marquee-track"
        data-reverse={reverse ? "" : undefined}
        style={{ ["--marquee-duration" as string]: duration } as React.CSSProperties}
      >
        {/* The second copy makes the loop seamless; screen readers skip it. */}
        {[0, 1].map((copy) => (
          <ul key={copy} aria-hidden={copy === 1} className="flex shrink-0 gap-2.5 pr-2.5">
            {items.map((t) => (
              <li
                key={t}
                className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 font-mono text-[0.76rem] ${chip}`}
              >
                {t}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section aria-label="Technologies" className="border-b py-8">
      <div className="space-y-3">
        <Row items={ai} tone="ai" duration="110s" />
        <Row items={profile.enterpriseStack} tone="core" reverse duration="80s" />
      </div>
    </section>
  );
}
