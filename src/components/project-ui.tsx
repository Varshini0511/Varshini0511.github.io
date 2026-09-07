import { Github, ExternalLink, Lock, Clock } from "lucide-react";
import type { Project } from "@/data/profile";

export function StackRow({ stack }: { stack: readonly string[] }) {
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

export function RepoLinks({ p, size = "md" }: { p: Project; size?: "sm" | "md" }) {
  const pad = size === "sm" ? "px-3 py-1.5 text-[0.75rem]" : "px-3.5 py-2 text-[0.8rem]";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {p.demo && (
          <a
            href={p.demo}
            target="_blank"
            rel="noreferrer noopener"
            className={`inline-flex items-center gap-1.5 rounded-lg bg-[var(--accent)] font-medium text-[var(--bg)] transition-opacity hover:opacity-90 ${pad}`}
          >
            <ExternalLink size={14} /> Live demo
          </a>
        )}

        {p.repoPrivate ? (
          <span
            title="This repository is private — ask me for access or a walkthrough."
            className={`inline-flex items-center gap-1.5 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] font-medium text-[var(--faint)] ${pad}`}
          >
            <Lock size={14} /> Private repo
          </span>
        ) : (
          <a
            href={p.repo}
            target="_blank"
            rel="noreferrer noopener"
            className={`inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface-2)] ${pad}`}
          >
            <Github size={14} /> Source
          </a>
        )}
      </div>

      {p.demoNote && (
        <p className="flex max-w-md gap-1.5 text-[0.72rem] leading-snug text-[var(--faint)]">
          <Clock size={12} className="mt-[2px] shrink-0" />
          <span>{p.demoNote}</span>
        </p>
      )}
    </div>
  );
}

/** Monospace architecture diagram — scrolls inside its own box on narrow screens. */
export function Diagram({ children }: { children: string }) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-[var(--surface-2)] p-5">
      <pre className="w-max min-w-full font-mono text-[0.72rem] leading-[1.55] text-[var(--muted)] sm:text-[0.8rem]">
        {children}
      </pre>
    </div>
  );
}
