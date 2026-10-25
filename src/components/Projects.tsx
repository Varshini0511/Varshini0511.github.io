"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  Bot,
  Cpu,
  Database,
  ExternalLink,
  FlaskConical,
  Github,
  Image as ImageIcon,
  Lock,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import { profile, type Project } from "@/data/profile";

const ICONS = {
  agents: Bot,
  retrieval: Database,
  models: Cpu,
  evaluation: FlaskConical,
  safety: ShieldCheck,
  observability: Activity,
  multimodal: ImageIcon,
  automation: Workflow,
} as const;

/** What the toolkit is filtering by: one technique, or every technique in a group. */
type Selection = { label: string; ids: ReadonlySet<string>; names: ReadonlySet<string> } | null;

/** Technique names per project, in toolkit order, for the chips on each card. */
const techniquesByProject = (() => {
  const map = new Map<string, string[]>();
  for (const g of profile.aiToolkit)
    for (const item of g.items)
      for (const id of item.projects) map.set(id, [...(map.get(id) ?? []), item.name]);
  return map;
})();

const CHIP_LIMIT = 9;

function Status({ p }: { p: Project }) {
  return p.demo ? (
    <span className="label inline-flex items-center gap-1.5 text-[0.68rem] text-[var(--ok)]">
      <span className="live-dot h-1.5 w-1.5 rounded-full bg-[var(--ok)]" /> Live
    </span>
  ) : (
    <span className="label inline-flex items-center gap-1.5 text-[0.68rem] text-[var(--faint)]">
      <span className="h-1.5 w-1.5 rounded-full border border-[var(--faint)]" /> {p.repoPrivate ? "Private" : "Local"}
    </span>
  );
}

function TechniqueChips({ names, highlight }: { names: readonly string[]; highlight: ReadonlySet<string> }) {
  // Matching techniques first, so a filter's reason is visible at a glance.
  const sorted = [...names].sort((a, b) => Number(highlight.has(b)) - Number(highlight.has(a)));
  const shown = sorted.slice(0, CHIP_LIMIT);
  return (
    <ul className="flex flex-wrap gap-1.5">
      {shown.map((t) => (
        <li key={t} className={`chip whitespace-normal ${highlight.has(t) ? "chip-accent" : ""}`}>
          {t}
        </li>
      ))}
      {sorted.length > CHIP_LIMIT && <li className="chip border-dashed">+{sorted.length - CHIP_LIMIT} more</li>}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Toolkit                                                             */
/* ------------------------------------------------------------------ */

function Toolkit({ selection, onSelect }: { selection: Selection; onSelect: (s: Selection) => void }) {
  const total = profile.aiToolkit.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="card overflow-hidden" data-reveal>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-[var(--surface-2)] px-5 py-3.5 sm:px-6">
        <p className="label text-[var(--accent)]">AI toolkit · {total} techniques and tools</p>
        <p className="text-[0.82rem] text-[var(--faint)]">Click any technique, or a group, to see the projects that use it.</p>
      </div>

      <div className="grid gap-px bg-[var(--border)] sm:grid-cols-2 xl:grid-cols-4">
        {profile.aiToolkit.map((g) => {
          const Icon = ICONS[g.icon as keyof typeof ICONS] ?? Bot;
          const groupIds = new Set(g.items.flatMap((i) => i.projects));
          const groupActive = selection?.label === g.group;
          return (
            <section key={g.group} className="bg-[var(--surface)] p-5">
              <button
                type="button"
                onClick={() =>
                  onSelect(
                    groupActive ? null : { label: g.group, ids: groupIds, names: new Set(g.items.map((i) => i.name)) },
                  )
                }
                aria-pressed={groupActive}
                className="group flex w-full items-center gap-2.5 text-left"
              >
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-md border transition-colors ${
                    groupActive
                      ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--bg)]"
                      : "border-[var(--accent-line)] bg-[var(--accent-soft)] text-[var(--accent)] group-hover:border-[var(--accent)]"
                  }`}
                >
                  <Icon size={15} />
                </span>
                <span className="min-w-0">
                  <span className="block text-[1rem] leading-tight [font-family:var(--font-display)] group-hover:text-[var(--accent)]">
                    {g.group}
                  </span>
                  <span className="block text-[0.76rem] text-[var(--faint)]">
                    {g.items.length} techniques · {groupIds.size} projects
                  </span>
                </span>
              </button>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((item) => {
                  const active = selection?.names.has(item.name) ?? false;
                  const exact = selection?.label === item.name;
                  return (
                    <li key={item.name}>
                      <button
                        type="button"
                        onClick={() =>
                          onSelect(
                            exact ? null : { label: item.name, ids: new Set(item.projects), names: new Set([item.name]) },
                          )
                        }
                        aria-pressed={exact}
                        className={`chip cursor-pointer whitespace-normal text-left ${
                          active ? "chip-accent" : "hover:border-[var(--accent-line)] hover:text-[var(--text)]"
                        }`}
                      >
                        {item.name}
                        <span className={`text-[0.68rem] ${active ? "text-[var(--accent)]" : "text-[var(--faint)]"}`}>
                          {item.projects.length}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project cards                                                       */
/* ------------------------------------------------------------------ */

function Featured({ p, n, highlight }: { p: Project; n: string; highlight: ReadonlySet<string> }) {
  return (
    <Link href={`/projects/${p.id}`} data-reveal className="card card-hover group block overflow-hidden">
      <div className="grid lg:grid-cols-[1.15fr_1fr]">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="label text-[var(--accent)]">{n}</span>
            <span className="label text-[var(--faint)]">Flagship</span>
            <Status p={p} />
          </div>
          <h3 className="mt-4 text-[1.9rem] leading-[1.1] transition-colors group-hover:text-[var(--accent)] sm:text-[2.2rem]">
            {p.name}
          </h3>
          <p className="mt-2 text-[1rem] text-[var(--accent)]">{p.subtitle}</p>
          <p className="mt-4 max-w-xl text-[0.92rem] leading-[1.75] text-[var(--muted)]">{p.blurb}</p>

          <p className="label mt-6 text-[var(--faint)]">AI techniques</p>
          <div className="mt-2.5">
            <TechniqueChips names={techniquesByProject.get(p.id) ?? []} highlight={highlight} />
          </div>
          <p className="mt-4 font-mono text-[0.76rem] leading-relaxed text-[var(--faint)]">{p.stack.join(" · ")}</p>

          <p className="mt-7 inline-flex items-center gap-2 text-[0.92rem] font-medium text-[var(--accent)]">
            Read the case study
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </p>
        </div>

        <ul className="grid divide-y border-t bg-[var(--surface-2)] lg:border-l lg:border-t-0">
          {p.capabilities.map((c, i) => (
            <li key={c.name} className="grid grid-cols-[2rem_1fr] gap-3 px-6 py-5 sm:px-8">
              <span className="pt-0.5 font-mono text-[0.76rem] text-[var(--faint)]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[1.1rem] leading-snug [font-family:var(--font-display)]">{c.name}</p>
                <p className="mt-1 text-[0.82rem] leading-snug text-[var(--muted)]">{c.hook}</p>
                <ul className="mt-2.5 space-y-1">
                  {c.points.slice(0, 2).map((pt) => (
                    <li key={pt} className="text-[0.76rem] leading-snug text-[var(--faint)]">
                      — {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

function ProjectCard({ p, n, highlight }: { p: Project; n: string; highlight: ReadonlySet<string> }) {
  return (
    <article data-reveal className="card card-hover group relative flex flex-col p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <span className="label text-[var(--faint)]">
          {n} <span className="text-[var(--border-strong)]">/</span> {p.tags.slice(0, 2).join(" · ")}
        </span>
        <Status p={p} />
      </div>

      <h3 className="mt-3.5 text-[1.45rem] leading-tight">
        {/* The title link covers the whole card; the buttons below sit above it. */}
        <Link
          href={`/projects/${p.id}`}
          className="transition-colors after:absolute after:inset-0 after:rounded-[inherit] group-hover:text-[var(--accent)]"
        >
          {p.name}
        </Link>
      </h3>
      <p className="mt-1 text-[0.92rem] leading-snug text-[var(--accent)]">{p.subtitle}</p>
      <p className="mt-3.5 line-clamp-3 text-[0.92rem] leading-[1.7] text-[var(--muted)]">{p.blurb}</p>

      <div className="mb-5 mt-5">
        <TechniqueChips names={techniquesByProject.get(p.id) ?? []} highlight={highlight} />
      </div>
      <p className="mb-5 font-mono text-[0.76rem] leading-relaxed text-[var(--faint)]">{p.stack.slice(0, 7).join(" · ")}</p>

      <div className="relative z-10 mt-auto flex flex-wrap items-center gap-2 border-t pt-4">
        <span className="pointer-events-none mr-auto inline-flex items-center gap-1.5 text-[0.82rem] font-medium text-[var(--accent)]">
          Case study <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
        </span>
        {p.demo && (
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--accent-line)] bg-[var(--accent-soft)] px-2.5 py-1 text-[0.76rem] font-medium text-[var(--accent)] transition-colors hover:border-[var(--accent)]"
          >
            <ExternalLink size={12} /> Demo
          </a>
        )}
        {p.repoPrivate ? (
          <span className="inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-[0.76rem] text-[var(--faint)]">
            <Lock size={12} /> Private
          </span>
        ) : (
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-1.5 rounded-md border border-[var(--border-strong)] px-2.5 py-1 text-[0.76rem] font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface-2)]"
          >
            <Github size={12} /> Source
          </a>
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */

export default function Projects() {
  const [selection, setSelection] = useState<Selection>(null);

  // Only the AI projects live here; the mobile builds have their own section.
  // Numbering follows the data order, so a project keeps its number under any filter.
  const numbered = useMemo(
    () =>
      profile.projects
        .filter((p) => p.kind === "ai")
        .map((p, i) => ({ p, n: String(i + 1).padStart(2, "0") })),
    [],
  );

  const shown = selection ? numbered.filter(({ p }) => selection.ids.has(p.id)) : numbered;
  const featured = shown.find(({ p }) => p.flagship);
  const rest = shown.filter(({ p }) => !p.flagship);
  const highlight = selection?.names ?? new Set<string>();

  return (
    <>
      <div className="no-print">
        <Toolkit selection={selection} onSelect={setSelection} />
      </div>

      {/* What the list is showing, and a way back. */}
      <div className="mb-6 mt-10 flex flex-wrap items-center justify-between gap-3" aria-live="polite">
        <p className="label text-[var(--faint)]">
          {selection ? (
            <>
              {shown.length} {shown.length === 1 ? "project uses" : "projects use"}{" "}
              <span className="text-[var(--accent)]">{selection.label}</span>
            </>
          ) : (
            <>All {numbered.length} AI systems</>
          )}
        </p>
        {selection && (
          <button
            type="button"
            onClick={() => setSelection(null)}
            className="chip cursor-pointer hover:border-[var(--border-strong)] hover:text-[var(--text)]"
          >
            <X size={11} /> Clear filter
          </button>
        )}
      </div>

      {featured && <Featured key={`f-${selection?.label ?? "all"}`} p={featured.p} n={featured.n} highlight={highlight} />}

      {rest.length > 0 && (
        <div className={`grid gap-5 md:grid-cols-2 ${featured ? "mt-5" : ""}`}>
          {rest.map(({ p, n }) => (
            <ProjectCard key={`${p.id}-${selection?.label ?? "all"}`} p={p} n={n} highlight={highlight} />
          ))}
        </div>
      )}

      <p className="mt-6 text-[0.82rem] text-[var(--faint)]">
        {numbered.filter(({ p }) => p.demo).length} of {numbered.length} projects have a live demo; the rest explain how to
        run them.
      </p>
    </>
  );
}
