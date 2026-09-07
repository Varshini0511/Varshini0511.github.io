import { Mail, Linkedin, Github, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";

const CARDS = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: Linkedin, label: "LinkedIn", value: "/in/varchini-devi", href: profile.linkedin },
  { icon: Github, label: "GitHub", value: `@${profile.githubUser}`, href: profile.github },
  { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
];

export default function Contact() {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("http") ? "_blank" : undefined}
            rel={c.href.startsWith("http") ? "noreferrer noopener" : undefined}
            className="card card-hover group flex flex-col gap-3 p-5"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-9 w-9 place-items-center rounded-lg border border-[var(--accent-line)] bg-[var(--accent-soft)] text-[var(--accent)]">
                <c.icon size={16} />
              </span>
              <ArrowUpRight
                size={16}
                className="text-[var(--faint)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
              />
            </div>
            <div>
              <p className="label text-[var(--faint)]">{c.label}</p>
              <p className="mt-1 break-all text-[0.875rem] text-[var(--text)]">{c.value}</p>
            </div>
          </a>
        ))}
      </div>

      <p className="mt-8 inline-flex items-center gap-1.5 text-sm text-[var(--faint)]">
        <MapPin size={14} /> Based in {profile.location} · open to remote and hybrid roles
      </p>
    </>
  );
}
