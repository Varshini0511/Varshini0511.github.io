import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile, getProject } from "@/data/profile";

/** Four projects on the home page, each led by three numbers from its own case study. */
export default function SelectedWork() {
  const items = profile.selectedWork.flatMap((s) => {
    const p = getProject(s.id);
    return p ? [{ ...s, p }] : [];
  });

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map(({ p, focus, proof }) => (
        <Link key={p.id} href={`/projects/${p.id}`} className="card card-hover group flex flex-col p-5 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <span className="label text-[0.62rem] text-[var(--accent)]">{focus}</span>
            {p.demo ? (
              <span className="label inline-flex items-center gap-1.5 text-[0.6rem] text-[var(--ok)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]" /> Live demo
              </span>
            ) : (
              <span className="label inline-flex items-center gap-1.5 text-[0.6rem] text-[var(--faint)]">
                <span className="h-1.5 w-1.5 rounded-full border border-[var(--faint)]" />{" "}
                {p.repoPrivate ? "Runs locally" : "Open source"}
              </span>
            )}
          </div>

          <h3 className="mt-3 flex items-start justify-between gap-3 text-[1.3rem] leading-tight">
            <span className="transition-colors group-hover:text-[var(--accent)]">{p.name}</span>
            <ArrowUpRight
              size={19}
              className="mt-1.5 shrink-0 text-[var(--faint)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
            />
          </h3>
          <p className="mb-5 mt-1 text-[0.84rem] leading-snug text-[var(--muted)]">{p.subtitle}</p>

          <dl className="mt-auto grid grid-cols-3 gap-4 border-t pt-5">
            {proof.map((m) => (
              <div key={m.l}>
                <dt className="numeral text-[1.25rem] leading-none text-[var(--text)]">{m.v}</dt>
                <dd className="mt-1.5 text-[0.7rem] leading-snug text-[var(--faint)]">{m.l}</dd>
              </div>
            ))}
          </dl>
        </Link>
      ))}
    </div>
  );
}
