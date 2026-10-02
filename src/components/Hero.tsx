import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="top" className="hero-bg relative overflow-hidden border-b">
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:items-end lg:gap-16">
          <div>
            <p className="rise label flex items-center gap-2.5 text-[var(--accent)]" style={{ animationDelay: "40ms" }}>
              <span className="h-px w-8 bg-[var(--accent)]" />
              {profile.title} · {profile.yearsExperience} years
            </p>

            <h1
              className="rise mt-6 text-[2.5rem] leading-[1.04] sm:text-[3rem] lg:text-[3.4rem]"
              style={{ animationDelay: "120ms" }}
            >
              {profile.name}
            </h1>

            <p
              className="rise mt-6 max-w-[34rem] text-[1.05rem] leading-[1.7] text-[var(--muted)] sm:text-[1.12rem]"
              style={{ animationDelay: "200ms" }}
            >
              {profile.tagline}
            </p>

            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "280ms" }}>
              <a
                href="#systems"
                className="group inline-flex items-center gap-2 rounded-md bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
              >
                See the systems
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="/Varchini-Devi-K-Resume.pdf"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-md border border-[var(--border-strong)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface-2)]"
              >
                <FileText size={16} /> Résumé
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="grid h-10 w-10 place-items-center rounded-md border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)]"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="GitHub"
                className="grid h-10 w-10 place-items-center rounded-md border border-[var(--border)] text-[var(--muted)] transition-colors hover:border-[var(--border-strong)] hover:text-[var(--text)]"
              >
                <Github size={16} />
              </a>
            </div>
          </div>

          {/* Spec sheet */}
          <aside className="rise card overflow-hidden" style={{ animationDelay: "340ms" }} aria-label="Profile at a glance">
            <div className="flex items-center justify-between border-b bg-[var(--surface-2)] px-5 py-3">
              <span className="label text-[var(--faint)]">Profile</span>
              <span className="label flex items-center gap-1.5 text-[var(--ok)]">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]" /> Open to roles
              </span>
            </div>
            <dl>
              {profile.glance.map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[6.25rem_1fr] gap-4 border-t px-5 py-2.5 first:border-t-0"
                >
                  <dt className="label pt-0.5 text-[var(--faint)]">{row.k}</dt>
                  <dd className="text-[0.85rem] leading-snug text-[var(--text)]">{row.v}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>

        {/* Metrics strip */}
        <dl
          className="rise mt-14 grid grid-cols-2 gap-y-8 border-y py-7 sm:grid-cols-4"
          style={{ animationDelay: "420ms" }}
        >
          {profile.stats.map((s) => (
            <div
              key={s.label}
              className="border-l pl-5 max-sm:odd:border-l-0 max-sm:odd:pl-0 sm:first:border-l-0 sm:first:pl-0"
            >
              <dt className="numeral text-[2.2rem] leading-none text-[var(--text)] sm:text-[2.6rem]">{s.value}</dt>
              <dd className="mt-2.5 text-[0.78rem] leading-snug text-[var(--muted)]">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
