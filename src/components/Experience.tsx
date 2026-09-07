import { profile } from "@/data/profile";

export default function Experience() {
  return (
    <div className="space-y-6">
      {profile.experience.map((job) => (
        <article key={job.company} className="card card-hover overflow-hidden">
          {/* Header band */}
          <div className="border-b bg-[var(--surface-2)] px-6 py-5 sm:px-7">
            <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{job.company}</h3>
                  {job.current && (
                    <span className="chip chip-accent font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" /> Current
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-[var(--accent)]">{job.role}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-xs text-[var(--muted)]">{job.period}</p>
                <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-[var(--faint)]">
                  {job.domain}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-3xl text-[0.875rem] leading-relaxed text-[var(--muted)]">{job.context}</p>
          </div>

          {/* Measured outcomes, up front */}
          <dl className="grid grid-cols-1 gap-px border-b bg-[var(--border)] sm:grid-cols-3">
            {job.impact.map((m) => (
              <div key={m.label} className="bg-[var(--surface)] px-6 py-4 sm:px-7">
                <dt className="font-mono text-lg font-semibold tracking-tight text-[var(--accent)]">{m.value}</dt>
                <dd className="mt-1 text-[0.78rem] leading-snug text-[var(--muted)]">{m.label}</dd>
              </div>
            ))}
          </dl>

          <div className="px-6 py-6 sm:px-7">
            <ul className="space-y-2.5">
              {job.points.map((pt) => (
                <li
                  key={pt}
                  className="relative pl-4 text-[0.875rem] leading-relaxed text-[var(--muted)] before:absolute before:left-0 before:top-[0.62em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--faint)]"
                >
                  {pt}
                </li>
              ))}
            </ul>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {job.stack.map((t) => (
                <li key={t} className="chip font-mono">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </article>
      ))}
    </div>
  );
}
