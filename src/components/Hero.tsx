import { ArrowRight, MapPin, Mail, FileText, Building2 } from "lucide-react";
import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="top" className="hero-glow grid-bg relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl px-5 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40">
        {/* Current role first — it's the credibility line recruiters scan for. */}
        <div
          className="rise flex flex-wrap items-center gap-x-3 gap-y-2 text-sm"
          style={{ animationDelay: "60ms" }}
        >
          <span className="inline-flex items-center gap-1.5 font-medium text-[var(--text)]">
            <Building2 size={14} className="text-[var(--accent)]" />
            {profile.currentRole} at {profile.currentCompany}
          </span>
          <span className="text-[var(--border-strong)]">·</span>
          <span className="inline-flex items-center gap-1.5 text-[var(--faint)]">
            <MapPin size={13} /> {profile.location}
          </span>
        </div>

        <h1
          className="rise mt-6 max-w-4xl text-[2.6rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "140ms" }}
        >
          {profile.name}
        </h1>

        <p
          className="rise mt-6 max-w-3xl text-lg leading-[1.65] text-[var(--muted)] sm:text-xl"
          style={{ animationDelay: "220ms" }}
        >
          {profile.tagline}
        </p>

        <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "300ms" }}>
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
          >
            View my work
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="/Varchini-Devi-K-Resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-strong)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface-2)]"
          >
            <FileText size={16} /> Résumé
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="link-underline inline-flex items-center gap-2 px-1 py-2.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
          >
            <Mail size={15} /> {profile.email}
          </a>
        </div>

        <dl
          className="rise mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-xl border bg-[var(--border)] sm:grid-cols-4"
          style={{ animationDelay: "400ms" }}
        >
          {profile.stats.map((s) => (
            <div key={s.label} className="bg-[var(--surface)] px-5 py-5">
              <dt className="font-mono text-2xl font-semibold tracking-tight text-[var(--accent)] sm:text-[1.75rem]">
                {s.value}
              </dt>
              <dd className="mt-1.5 text-[0.8rem] leading-snug text-[var(--muted)]">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
