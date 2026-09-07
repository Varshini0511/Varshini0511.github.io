import { profile } from "@/data/profile";

export default function Experience() {
  return (
    <ol className="relative space-y-10 border-l pl-6 sm:pl-8">
      {profile.experience.map((job) => (
        <li key={job.company} className="relative">
          <span className="absolute -left-[calc(1.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-[var(--bg)] bg-[var(--accent)] sm:-left-[calc(2rem+5px)]" />

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h3 className="text-lg font-semibold tracking-tight">
              {job.role}
              <span className="text-[var(--muted)]"> · {job.company}</span>
            </h3>
            <span className="font-mono text-xs text-[var(--faint)]">{job.period}</span>
          </div>

          <p className="mt-2 text-[0.9rem] leading-relaxed text-[var(--muted)]">{job.context}</p>

          <ul className="mt-4 space-y-2">
            {job.points.map((pt) => (
              <li
                key={pt}
                className="relative pl-4 text-[0.875rem] leading-relaxed text-[var(--muted)] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--faint)]"
              >
                {pt}
              </li>
            ))}
          </ul>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {job.stack.map((t) => (
              <li key={t} className="chip font-mono">
                {t}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
