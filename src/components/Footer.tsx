import { profile } from "@/data/profile";
import { TABS } from "@/lib/tabs";

/** Shared by the home page and every project page. */
export default function Footer() {
  return (
    <footer className="no-print border-t">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-[1.15rem] [font-family:var(--font-display)]">{profile.name}</p>
          <p className="mt-1 text-[0.92rem] text-[var(--muted)]">
            {profile.title} · .NET, Azure &amp; applied AI · {profile.location}
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="label text-[0.68rem] text-[var(--faint)]">Sections</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5 text-[0.92rem]">
            {TABS.map((t) => (
              <li key={t.id}>
                <a href={`/#${t.id}`} className="text-[var(--muted)] transition-colors hover:text-[var(--text)]">
                  {t.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="label text-[0.68rem] text-[var(--faint)]">Elsewhere</p>
          <ul className="mt-3 space-y-1.5 text-[0.92rem]">
            <li>
              <a href={`mailto:${profile.email}`} className="text-[var(--muted)] transition-colors hover:text-[var(--text)]">
                Email
              </a>
            </li>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer noopener" className="text-[var(--muted)] transition-colors hover:text-[var(--text)]">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={profile.github} target="_blank" rel="noreferrer noopener" className="text-[var(--muted)] transition-colors hover:text-[var(--text)]">
                GitHub
              </a>
            </li>
            <li>
              <a href="/Varchini-Devi-K-Resume.pdf" target="_blank" rel="noreferrer noopener" className="text-[var(--muted)] transition-colors hover:text-[var(--text)]">
                Résumé (PDF)
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 px-5 py-5 text-[0.76rem] text-[var(--faint)] sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <p className="font-mono">Next.js · TypeScript · Tailwind · static export</p>
        </div>
      </div>
    </footer>
  );
}
