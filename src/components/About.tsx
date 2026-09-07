import { Award, GraduationCap, Languages } from "lucide-react";
import { profile } from "@/data/profile";

export default function About() {
  return (
    <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
      <div className="space-y-5">
        {profile.about.map((para, i) => (
          <p key={i} className="text-[0.95rem] leading-[1.75] text-[var(--muted)]">
            {para}
          </p>
        ))}
      </div>

      <div className="space-y-5">
        <div className="card p-5">
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            <Award size={14} /> Recognition
          </h3>
          <ul className="mt-4 space-y-2.5">
            {profile.achievements.map((a) => (
              <li
                key={a}
                className="relative pl-4 text-[0.85rem] leading-relaxed text-[var(--muted)] before:absolute before:left-0 before:top-[0.6em] before:h-1 before:w-1 before:rounded-full before:bg-[var(--accent)]"
              >
                {a}
              </li>
            ))}
          </ul>
        </div>

        <div className="card p-5">
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            <GraduationCap size={14} /> Education
          </h3>
          <p className="mt-3 text-[0.9rem] font-medium text-[var(--text)]">{profile.education.degree}</p>
          <p className="mt-1 text-[0.85rem] text-[var(--muted)]">{profile.education.school}</p>
        </div>

        <div className="card p-5">
          <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent)]">
            <Languages size={14} /> Languages
          </h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {profile.languages.map((l) => (
              <li key={l} className="chip">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
