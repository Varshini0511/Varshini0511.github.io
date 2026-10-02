"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, ExternalLink, Radio } from "lucide-react";
import { profile, type Project } from "@/data/profile";

const FILTERS = ["All", "Agents", "RAG", "Vector Search", "Multimodal", "Automation", "Full-Stack", ".NET"] as const;

function Card({ p }: { p: Project }) {
  return (
    <Link
      href={`/projects/${p.id}`}
      className={`card card-hover group relative flex flex-col p-6 sm:p-7 ${
        p.flagship ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            {p.flagship && (
              <span className="chip chip-accent font-mono">
                <Sparkles size={11} /> Flagship
              </span>
            )}
            {p.demo && (
              <span className="chip font-mono">
                <Radio size={11} className="text-[var(--accent)]" /> Live
              </span>
            )}
          </div>
          <h3 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{p.name}</h3>
          <p className="mt-1 text-sm text-[var(--accent)]">{p.subtitle}</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-[var(--faint)]">{p.period}</span>
      </div>

      <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--muted)]">{p.blurb}</p>

      {/* Flagship gets its three capabilities surfaced as a teaser. */}
      {p.capabilities.length > 0 && (
        <ul className="mt-5 grid gap-2 sm:grid-cols-3">
          {p.capabilities.map((c) => (
            <li key={c.name} className="rounded-lg border bg-[var(--surface-2)] px-3.5 py-3">
              <p className="text-[0.8rem] font-medium text-[var(--text)]">{c.name}</p>
              <p className="mt-0.5 text-[0.72rem] leading-snug text-[var(--faint)]">{c.hook}</p>
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-5 flex flex-wrap gap-1.5">
        {p.stack.slice(0, 6).map((t) => (
          <li key={t} className="chip font-mono">
            {t}
          </li>
        ))}
        {p.stack.length > 6 && <li className="chip font-mono">+{p.stack.length - 6}</li>}
      </ul>

      <div className="mt-6 flex items-center gap-2 pt-1 text-sm font-medium text-[var(--accent)]">
        Read the write-up
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const shown = useMemo(
    () => (filter === "All" ? profile.projects : profile.projects.filter((p) => p.tags.includes(filter))),
    [filter],
  );

  return (
    <>
      <div className="no-print -mt-4 mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`chip cursor-pointer font-mono ${
              filter === f ? "chip-accent" : "hover:border-[var(--border-strong)] hover:text-[var(--text)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {shown.map((p) => (
          <Card key={p.id} p={p} />
        ))}
      </div>

      {shown.length === 0 && (
        <p className="py-12 text-center text-sm text-[var(--faint)]">No projects match that filter.</p>
      )}

      <p className="mt-8 flex items-center gap-1.5 text-sm text-[var(--faint)]">
        <ExternalLink size={14} />
        {profile.projects.filter((p) => p.demo).length} of {profile.projects.length} projects have a live demo — the
        rest explain how to run them.
      </p>
    </>
  );
}
