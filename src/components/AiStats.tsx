import { profile } from "@/data/profile";

/** The Applied AI tab at a glance. Every number is derived from the data, except the test total. */
export default function AiStats() {
  const ai = profile.projects.filter((p) => p.kind === "ai");
  const techniques = profile.aiToolkit.reduce((n, g) => n + g.items.length, 0);

  const stats = [
    { v: String(ai.length), l: "AI systems built end to end" },
    { v: String(ai.filter((p) => p.demo).length), l: "with a live, public demo" },
    { v: profile.aiTests, l: "automated tests across the projects" },
    { v: String(techniques), l: "AI techniques and tools in use" },
  ];

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-[var(--border)] lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.l} data-reveal className="bg-[var(--surface)] px-5 py-6 sm:px-6">
          <dt data-count className="numeral text-[2.3rem] leading-none text-[var(--accent)] sm:text-[2.6rem]">
            {s.v}
          </dt>
          <dd className="mt-2.5 text-[0.82rem] leading-snug text-[var(--muted)]">{s.l}</dd>
        </div>
      ))}
    </dl>
  );
}
