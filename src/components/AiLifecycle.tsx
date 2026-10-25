import Link from "next/link";
import { profile, getProject } from "@/data/profile";

/**
 * Five stages from grounding to operating, each pointing at the projects
 * that show it. The connector line draws itself in as it scrolls into view.
 */
export default function AiLifecycle() {
  const stages = profile.aiLifecycle;

  return (
    <div className="relative">
      {/* Connector behind the step markers, wide screens only. */}
      <div aria-hidden className="absolute left-0 right-0 top-[1.15rem] hidden px-[10%] lg:block">
        <div data-reveal="grow" className="h-px bg-gradient-to-r from-[var(--accent)] via-[var(--accent-line)] to-[var(--accent)]" />
      </div>

      <ol className="relative grid gap-5 lg:grid-cols-5 lg:gap-4">
        {stages.map((s, i) => (
          <li key={s.step} data-reveal className="flex gap-4 lg:flex-col lg:gap-0">
            <div className="flex flex-col items-center">
              <span className="grid h-[2.3rem] w-[2.3rem] shrink-0 place-items-center rounded-full border border-[var(--accent-line)] bg-[var(--bg)] font-mono text-[0.76rem] text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {/* Vertical connector on narrow screens. */}
              {i < stages.length - 1 && <span aria-hidden className="mt-2 w-px flex-1 bg-[var(--border-strong)] lg:hidden" />}
            </div>

            <div className="card mb-1 flex flex-1 flex-col p-5 lg:mt-5">
              <p className="label text-[var(--accent)]">{s.step}</p>
              <h3 className="mt-2 text-[1.15rem] leading-snug">{s.title}</h3>
              <p className="mt-2.5 text-[0.92rem] leading-[1.65] text-[var(--muted)]">{s.text}</p>
              <ul className="mb-4 mt-4 flex flex-wrap gap-1.5">
                {s.tech.map((t) => (
                  <li key={t} className="chip whitespace-normal">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mt-auto border-t pt-3 text-[0.76rem] leading-relaxed text-[var(--faint)]">
                Seen in{" "}
                {s.projects.map((id, j) => {
                  const p = getProject(id);
                  if (!p) return null;
                  return (
                    <span key={id}>
                      {j > 0 && " · "}
                      <Link href={`/projects/${id}`} className="text-[var(--text)] transition-colors hover:text-[var(--accent)]">
                        {p.name}
                      </Link>
                    </span>
                  );
                })}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
