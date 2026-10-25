import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";

/**
 * The case for an experienced engineer in AI, made row by row: the same habit,
 * first where it came from, then where it shows up in the AI work.
 */
export default function Bridge() {
  return (
    <div className="card overflow-hidden">
      {/* Column heads, wide screens only; on mobile each cell carries its own label. */}
      <div className="hidden grid-cols-[9rem_1fr_2.5rem_1fr] border-b bg-[var(--surface-2)] px-6 py-3 md:grid">
        <span />
        <span className="label text-[0.62rem] text-[var(--faint)]">Eight years of production</span>
        <span />
        <span className="label text-[0.62rem] text-[var(--accent)]">The AI work, 2026</span>
      </div>

      <ol className="divide-y">
        {profile.bridge.map((b, i) => (
          <li
            key={b.theme}
            className="grid gap-4 px-6 py-6 md:grid-cols-[9rem_1fr_2.5rem_1fr] md:items-start md:gap-0"
          >
            <div className="flex items-baseline gap-3 md:block">
              <span className="font-mono text-[0.68rem] text-[var(--faint)]">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-[1.2rem] leading-tight [font-family:var(--font-display)] md:mt-1.5">{b.theme}</p>
            </div>

            <div className="md:pr-2">
              <p className="label text-[0.6rem] text-[var(--faint)]">
                <span className="md:hidden">Production · </span>
                {b.enterprise.where}
              </p>
              <p className="mt-1.5 text-[0.86rem] leading-[1.65] text-[var(--muted)]">{b.enterprise.text}</p>
            </div>

            <ArrowRight size={16} aria-hidden className="mt-5 hidden justify-self-center text-[var(--accent)] md:block" />

            <div className="border-l-2 border-[var(--accent-line)] pl-4 md:border-l-0 md:pl-2">
              <p className="label text-[0.6rem] text-[var(--accent)]">
                <span className="md:hidden">AI · </span>
                {b.ai.where}
              </p>
              <p className="mt-1.5 text-[0.86rem] leading-[1.65] text-[var(--text)]">{b.ai.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
