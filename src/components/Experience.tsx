import { profile } from "@/data/profile";

export default function Experience() {
  return (
    <ol className="divide-y border-y">
      {profile.experience.map((job) => (
        <li key={job.company} className="grid gap-6 py-10 lg:grid-cols-[16rem_1fr] lg:gap-14">
          {/* Meta rail: stays in view while the detail scrolls. */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="label text-[var(--accent)]">{job.period}</p>
            <h3 className="mt-3 text-[1.5rem] leading-tight">{job.company}</h3>
            <p className="mt-1 text-sm text-[var(--muted)]">{job.role}</p>
            <p className="label mt-4 text-[0.62rem] text-[var(--faint)]">{job.domain}</p>
            {job.current && (
              <p className="label mt-4 inline-flex items-center gap-1.5 text-[0.62rem] text-[var(--ok)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]" /> Current role
              </p>
            )}
          </div>

          <div>
            <p className="max-w-3xl text-[0.95rem] leading-[1.75] text-[var(--text)]">{job.context}</p>

            <dl className="mt-6 grid gap-px overflow-hidden rounded-md border bg-[var(--border)] sm:grid-cols-3">
              {job.impact.map((m) => (
                <div key={m.label} className="bg-[var(--surface)] px-4 py-3.5">
                  <dt className="numeral text-[1.35rem] leading-none text-[var(--accent)]">{m.value}</dt>
                  <dd className="mt-1.5 text-[0.75rem] leading-snug text-[var(--muted)]">{m.label}</dd>
                </div>
              ))}
            </dl>

            <ul className="mt-6 space-y-2.5">
              {job.points.map((pt) => (
                <li
                  key={pt}
                  className="relative pl-5 text-[0.875rem] leading-[1.7] text-[var(--muted)] before:absolute before:left-0 before:top-[0.78em] before:h-px before:w-2.5 before:bg-[var(--accent)]"
                >
                  {pt}
                </li>
              ))}
            </ul>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {job.stack.map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
