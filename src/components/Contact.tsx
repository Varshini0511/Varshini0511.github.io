import { Mail, Linkedin, Github, Phone, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const ROWS = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/varchini-devi", href: profile.linkedin },
  { icon: Github, label: "GitHub", value: `github.com/${profile.githubUser}`, href: profile.github },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
];

export default function Contact() {
  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
      <div>
        <p className="text-[1.7rem] leading-[1.25] [font-family:var(--font-display)] sm:text-[2rem]">
          If you are building something where correctness, security or scale actually matters, I would like to hear about it.
        </p>
        <p className="label mt-6 text-[var(--faint)]">Based in {profile.location}</p>
      </div>

      <ul className="divide-y border-y">
        {ROWS.map((r) => (
          <li key={r.label}>
            <a
              href={r.href}
              target={r.href.startsWith("http") ? "_blank" : undefined}
              rel={r.href.startsWith("http") ? "noreferrer noopener" : undefined}
              className="group grid grid-cols-[1.5rem_5.5rem_1fr_1.25rem] items-center gap-3 px-1 py-4 transition-colors hover:bg-[var(--surface)] sm:px-3"
            >
              <r.icon size={15} className="text-[var(--faint)] transition-colors group-hover:text-[var(--accent)]" />
              <span className="label text-[0.62rem] text-[var(--faint)]">{r.label}</span>
              <span className="truncate text-[0.9rem] text-[var(--text)]">{r.value}</span>
              <ArrowUpRight
                size={16}
                className="text-[var(--faint)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
