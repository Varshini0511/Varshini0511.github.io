import { FileText, Mail } from "lucide-react";
import { profile } from "@/data/profile";

/** The close of the home tab: what I'm looking for, and two ways to act on it. */
export default function CallToAction() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-24 pt-20 sm:px-8 sm:pt-24">
      <div className="card cta-bg grid gap-8 overflow-hidden p-7 sm:p-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-12">
        <div>
          <p className="label inline-flex items-center gap-1.5 text-[var(--ok)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--ok)]" /> Open to roles
          </p>
          <h2 className="mt-4 text-[1.75rem] leading-[1.2] sm:text-[2.2rem]">
            Looking for a senior engineer who can take AI <span className="emph">to production?</span>
          </h2>
          <p className="mt-4 max-w-xl text-[0.92rem] leading-[1.7] text-[var(--muted)]">
            Senior and AI engineering roles where correctness, security or scale matter. I bring {profile.yearsExperience}{" "}
            years of enterprise delivery, and the AI work to show I can apply it.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--accent)] px-5 py-3 text-sm font-medium text-[var(--bg)] transition-opacity hover:opacity-90"
          >
            <Mail size={16} /> {profile.email}
          </a>
          <a
            href="/Varchini-Devi-K-Resume.pdf"
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center justify-center gap-2 rounded-md border border-[var(--border-strong)] bg-[var(--bg)] px-5 py-3 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface-2)]"
          >
            <FileText size={16} /> Download résumé (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
