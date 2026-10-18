"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { profile, type Project } from "@/data/profile";

const FILTERS = ["All", "Agents", "RAG", "Vector Search", "MCP", "Inference", "Multimodal", "Automation", "Full-Stack", ".NET"] as const;

function Status({ p }: { p: Project }) {
  return p.demo ? (
    <span className="label inline-flex items-center gap-1.5 text-[0.62rem] text-[var(--ok)]">
      <span className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]" /> Live
    </span>
  ) : (
    <span className="label inline-flex items-center gap-1.5 text-[0.62rem] text-[var(--faint)]">
      <span className="h-1.5 w-1.5 rounded-full border border-[var(--faint)]" /> Local
    </span>
  );
}

function Featured({ p, n }: { p: Project; n: string }) {
  return (
    <Link href={`/projects/${p.id}`} className="card card-hover group block overflow-hidden">
      <div className="grid lg:grid-cols-[1.1fr_1fr]">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="label text-[var(--accent)]">{n}</span>
            <span className="label text-[var(--faint)]">Flagship</span>
            <Status p={p} />
          </div>
          <h3 className="mt-4 text-[1.9rem] leading-[1.1] sm:text-[2.2rem]">{p.name}</h3>
          <p className="mt-2 text-[0.95rem] text-[var(--accent)]">{p.subtitle}</p>
          <p className="mt-5 max-w-xl text-[0.9rem] leading-[1.75] text-[var(--muted)]">{p.blurb}</p>

          <ul className="mt-6 flex flex-wrap gap-1.5">
            {p.stack.map((t) => (
              <li key={t} className="chip">
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
            Read the case study
            <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
          </p>
        </div>

        <ul className="grid divide-y border-t bg-[var(--surface-2)] lg:border-l lg:border-t-0">
          {p.capabilities.map((c, i) => (
            <li key={c.name} className="grid grid-cols-[2rem_1fr] gap-3 px-6 py-5 sm:px-8">
              <span className="font-mono text-[0.72rem] pt-0.5 text-[var(--faint)]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-[1.02rem] leading-snug [font-family:var(--font-display)]">{c.name}</p>
                <p className="mt-1 text-[0.8rem] leading-snug text-[var(--muted)]">{c.hook}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}

function Row({ p, n }: { p: Project; n: string }) {
  return (
    <Link
      href={`/projects/${p.id}`}
      className="group grid grid-cols-[2.25rem_1fr_1.25rem] items-start gap-x-4 gap-y-1 px-1 py-5 transition-colors hover:bg-[var(--surface)] md:grid-cols-[3rem_minmax(0,1.25fr)_minmax(0,1fr)_5rem_1.5rem] md:items-center md:px-3"
    >
      <span className="label pt-1 text-[var(--faint)] md:pt-0">{n}</span>

      <div className="min-w-0">
        <h3 className="text-[1.25rem] leading-tight transition-colors group-hover:text-[var(--accent)]">{p.name}</h3>
        <p className="mt-1 text-[0.82rem] leading-snug text-[var(--muted)]">{p.subtitle}</p>
        <div className="mt-2 flex items-center gap-3 md:hidden">
          <Status p={p} />
          <span className="truncate font-mono text-[0.68rem] text-[var(--faint)]">{p.stack.slice(0, 3).join(" · ")}</span>
        </div>
      </div>

      <p className="hidden font-mono text-[0.7rem] leading-relaxed text-[var(--faint)] md:block">
        {p.stack.slice(0, 5).join(" · ")}
      </p>

      <div className="hidden md:block">
        <Status p={p} />
      </div>

      <ArrowUpRight
        size={17}
        className="mt-1 text-[var(--faint)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)] md:mt-0"
      />
    </Link>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  // Only the AI projects live here; the mobile builds have their own section.
  // Numbering follows the data order, so a project keeps its number under any filter.
  const aiProjects = useMemo(() => profile.projects.filter((p) => p.kind === "ai"), []);
  const numbered = useMemo(
    () => aiProjects.map((p, i) => ({ p, n: String(i + 1).padStart(2, "0") })),
    [aiProjects],
  );

  const shown = useMemo(
    () => (filter === "All" ? numbered : numbered.filter(({ p }) => p.tags.includes(filter))),
    [filter, numbered],
  );

  const featured = shown.find(({ p }) => p.flagship);
  const rest = shown.filter(({ p }) => !p.flagship);

  return (
    <>
      <div className="no-print mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`chip cursor-pointer ${
              filter === f ? "chip-accent" : "hover:border-[var(--border-strong)] hover:text-[var(--text)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {featured && <Featured p={featured.p} n={featured.n} />}

      {rest.length > 0 && (
        <div className={`divide-y border-y ${featured ? "mt-8" : ""}`}>
          {rest.map(({ p, n }) => (
            <Row key={p.id} p={p} n={n} />
          ))}
        </div>
      )}

      {shown.length === 0 && (
        <p className="py-12 text-center text-sm text-[var(--faint)]">No projects match that filter.</p>
      )}

      <p className="mt-6 text-[0.8rem] text-[var(--faint)]">
        {aiProjects.filter((p) => p.demo).length} of {aiProjects.length} projects have a live demo — the rest explain
        how to run them.
      </p>
    </>
  );
}
