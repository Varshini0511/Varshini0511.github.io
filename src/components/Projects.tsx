"use client";

import { useMemo, useState } from "react";
import { Github, ExternalLink, Lock, Check, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";

const FILTERS = ["All", "Agents", "RAG", "Vector Search", "Multimodal", "Full-Stack", ".NET"] as const;

type Proj = (typeof profile.projects)[number];

function RepoLinks({ p }: { p: Proj }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {p.demo ? (
        <a
          href={p.demo}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)] px-3.5 py-2 text-[0.8rem] font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
        >
          <ExternalLink size={14} /> Live demo
        </a>
      ) : null}

      {p.repoPrivate ? (
        <span
          title="This repository is private — ask me for access or a walkthrough."
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3.5 py-2 text-[0.8rem] font-medium text-[var(--faint)]"
        >
          <Lock size={14} /> Private repo
        </span>
      ) : (
        <a
          href={p.repo}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-3.5 py-2 text-[0.8rem] font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface-2)]"
        >
          <Github size={14} /> Source
        </a>
      )}
    </div>
  );
}

function StackRow({ stack }: { stack: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {stack.map((t) => (
        <li key={t} className="chip font-mono">
          {t}
        </li>
      ))}
    </ul>
  );
}

/** AdviShopping — one project, three capabilities, each with its own panel. */
function Flagship({ p }: { p: Proj }) {
  const [active, setActive] = useState(0);
  const cap = p.capabilities[active];

  return (
    <article className="card card-hover overflow-hidden">
      <div className="border-b bg-[var(--surface-2)] px-6 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="chip chip-accent font-mono">
                <Sparkles size={11} /> Flagship
              </span>
              <span className="font-mono text-xs text-[var(--faint)]">{p.period}</span>
            </div>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight sm:text-[1.7rem]">{p.name}</h3>
            <p className="mt-1 text-sm text-[var(--accent)]">{p.subtitle}</p>
          </div>
          <RepoLinks p={p} />
        </div>

        <p className="mt-5 max-w-3xl text-[0.95rem] leading-relaxed text-[var(--muted)]">{p.blurb}</p>
        <div className="mt-5">
          <StackRow stack={p.stack} />
        </div>
      </div>

      <div className="grid md:grid-cols-[minmax(0,15rem)_1fr]">
        {/* Capability selector */}
        <div className="flex gap-2 overflow-x-auto border-b p-3 md:flex-col md:overflow-visible md:border-b-0 md:border-r md:p-4">
          {p.capabilities.map((c, i) => (
            <button
              key={c.name}
              onClick={() => setActive(i)}
              aria-current={i === active}
              className={`shrink-0 rounded-lg border px-3.5 py-3 text-left transition-all md:w-full ${
                i === active
                  ? "border-[var(--accent-line)] bg-[var(--accent-soft)]"
                  : "border-transparent hover:bg-[var(--surface-2)]"
              }`}
            >
              <span
                className={`block text-sm font-medium ${
                  i === active ? "text-[var(--accent)]" : "text-[var(--text)]"
                }`}
              >
                {c.name}
              </span>
              <span className="mt-0.5 hidden text-xs leading-snug text-[var(--faint)] md:block">{c.hook}</span>
            </button>
          ))}
        </div>

        {/* Active capability detail */}
        <div className="p-6 sm:p-8">
          <h4 className="text-lg font-semibold tracking-tight">{cap.name}</h4>
          <p className="mt-3 text-[0.925rem] leading-relaxed text-[var(--muted)]">{cap.detail}</p>
          <ul className="mt-6 space-y-2.5">
            {cap.points.map((pt) => (
              <li key={pt} className="flex gap-2.5 text-[0.875rem] leading-relaxed text-[var(--muted)]">
                <Check size={15} className="mt-[3px] shrink-0 text-[var(--accent)]" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function Card({ p }: { p: Proj }) {
  return (
    <article className="card card-hover flex flex-col p-6 sm:p-7">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{p.name}</h3>
          <p className="mt-1 text-sm text-[var(--accent)]">{p.subtitle}</p>
        </div>
        <span className="shrink-0 font-mono text-xs text-[var(--faint)]">{p.period}</span>
      </div>

      <p className="mt-4 text-[0.9rem] leading-relaxed text-[var(--muted)]">{p.blurb}</p>

      <ul className="mt-5 space-y-2.5">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-[0.85rem] leading-relaxed text-[var(--muted)]">
            <Check size={14} className="mt-[3px] shrink-0 text-[var(--accent)]" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <StackRow stack={p.stack} />
      </div>

      <div className="mt-6 pt-1">
        <RepoLinks p={p} />
      </div>
    </article>
  );
}

export default function Projects() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const shown = useMemo(
    () =>
      filter === "All"
        ? profile.projects
        : profile.projects.filter((p) => (p.tags as readonly string[]).includes(filter)),
    [filter],
  );

  const flagship = shown.filter((p) => p.flagship);
  const rest = shown.filter((p) => !p.flagship);

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

      <div className="space-y-6">
        {flagship.map((p) => (
          <Flagship key={p.id} p={p} />
        ))}

        {rest.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-2">
            {rest.map((p) => (
              <Card key={p.id} p={p} />
            ))}
          </div>
        )}

        {shown.length === 0 && (
          <p className="py-12 text-center text-sm text-[var(--faint)]">No projects match that filter.</p>
        )}
      </div>
    </>
  );
}
