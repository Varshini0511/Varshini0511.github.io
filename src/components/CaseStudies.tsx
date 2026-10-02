import ArchDiagram from "./ArchDiagram";
import { profile } from "@/data/profile";

export default function CaseStudies() {
  return (
    <div>
      {/* Measured outcomes, up front. */}
      <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-[var(--border)] sm:grid-cols-3 lg:grid-cols-6">
        {profile.outcomes.map((o) => (
          <div key={o.label + o.context} className="bg-[var(--surface)] px-4 py-5">
            <dt className="numeral text-[1.75rem] leading-none text-[var(--accent)]">{o.value}</dt>
            <dd className="mt-2 text-[0.8rem] font-medium leading-snug text-[var(--text)]">{o.label}</dd>
            <dd className="mt-1 text-[0.7rem] leading-snug text-[var(--faint)]">{o.context}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-16 space-y-20">
        {profile.caseStudies.map((cs, i) => (
          <article key={cs.id} id={cs.id}>
            <header className="grid gap-4 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
              <div>
                <p className="label text-[var(--accent)]">Case study {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-[1.65rem] leading-[1.15] sm:text-[1.95rem]">{cs.title}</h3>
                <p className="label mt-4 text-[0.64rem] text-[var(--faint)]">
                  {cs.org} · {cs.period}
                </p>
              </div>
              <p className="text-[0.95rem] leading-[1.75] text-[var(--muted)] lg:pt-1">{cs.summary}</p>
            </header>

            <figure className="card mt-8 overflow-hidden">
              <div className="flex items-center justify-between border-b bg-[var(--surface-2)] px-5 py-2.5">
                <span className="label text-[0.62rem] text-[var(--faint)]">Architecture</span>
                <span className="label hidden text-[0.62rem] text-[var(--faint)] sm:block">{cs.caption}</span>
              </div>
              <div className="p-4 sm:p-6">
                <ArchDiagram spec={cs.diagram} id={cs.diagramId} title={cs.diagramTitle} />
              </div>
            </figure>

            <div className="mt-8 grid gap-x-12 gap-y-7 sm:grid-cols-2">
              {cs.decisions.map((d, di) => (
                <div key={d.title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="font-mono text-[0.72rem] pt-0.5 text-[var(--accent)]">
                    {String(di + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h4 className="text-[1.02rem] leading-snug">{d.title}</h4>
                    <p className="mt-1.5 text-[0.85rem] leading-[1.7] text-[var(--muted)]">{d.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <ul className="mt-8 flex flex-wrap gap-1.5">
              {cs.stack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}
