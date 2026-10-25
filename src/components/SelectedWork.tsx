import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile, getProject } from "@/data/profile";

const aiCount = profile.projects.filter((p) => p.kind === "ai").length;
const mobileCount = profile.projects.filter((p) => p.kind === "mobile").length;

/**
 * Four projects on the home page, each led by three numbers from its own case
 * study, then a plain way on to the rest: four cards alone read as the whole list.
 */
export default function SelectedWork() {
  const items = profile.selectedWork.flatMap((s) => {
    const p = getProject(s.id);
    return p ? [{ ...s, p }] : [];
  });

  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        {items.map(({ p, focus, proof }) => (
          <Link key={p.id} href={`/projects/${p.id}`} data-reveal className="card card-hover group flex flex-col p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="label text-[0.68rem] text-[var(--accent)]">{focus}</span>
              {p.demo ? (
                <span className="label inline-flex items-center gap-1.5 text-[0.68rem] text-[var(--ok)]">
                  <span className="live-dot h-1.5 w-1.5 rounded-full bg-[var(--ok)]" /> Live demo
                </span>
              ) : (
                <span className="label inline-flex items-center gap-1.5 text-[0.68rem] text-[var(--faint)]">
                  <span className="h-1.5 w-1.5 rounded-full border border-[var(--faint)]" />{" "}
                  {p.repoPrivate ? "Runs locally" : "Open source"}
                </span>
              )}
            </div>

            <h3 className="mt-3 flex items-start justify-between gap-3 text-[1.4rem] leading-tight">
              <span className="transition-colors group-hover:text-[var(--accent)]">{p.name}</span>
              <ArrowUpRight
                size={19}
                className="mt-1.5 shrink-0 text-[var(--faint)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
              />
            </h3>
            <p className="mb-5 mt-1 text-[0.92rem] leading-snug text-[var(--muted)]">{p.subtitle}</p>

            <dl className="mt-auto grid grid-cols-3 gap-4 border-t pt-5">
              {proof.map((m) => (
                <div key={m.l}>
                  <dt data-count className="numeral text-[1.45rem] leading-none text-[var(--text)]">{m.v}</dt>
                  <dd className="mt-1.5 text-[0.76rem] leading-snug text-[var(--faint)]">{m.l}</dd>
                </div>
              ))}
            </dl>
          </Link>
        ))}
      </div>

      <div
        data-reveal
        className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-lg border border-dashed border-[var(--border-strong)] px-5 py-4 sm:px-6"
      >
        <p className="text-[0.92rem] text-[var(--muted)]">
          {items.length} of {aiCount} AI systems shown here, plus {mobileCount} mobile builds. The Applied AI tab has
          every one, filterable by technique.
        </p>
        {/* A tab link is a hash change, not a router navigation. */}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a
          href="/#ai"
          className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-[var(--accent)] px-4 py-2 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
        >
          See all {aiCount + mobileCount} projects
          <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </>
  );
}
