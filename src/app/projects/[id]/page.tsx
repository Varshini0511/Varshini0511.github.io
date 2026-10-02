import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Terminal, Lightbulb, User, Sparkles } from "lucide-react";
import Nav from "@/components/Nav";
import Capabilities from "@/components/Capabilities";
import { RepoLinks, StackRow, Diagram } from "@/components/project-ui";
import { profile, getProject } from "@/data/profile";

export function generateStaticParams() {
  return profile.projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const p = getProject(id);
  if (!p) return { title: "Project not found" };

  return {
    title: `${p.name} — ${p.subtitle}`,
    description: p.blurb,
    openGraph: { title: `${p.name} · ${profile.name}`, description: p.blurb },
  };
}

function Block({
  icon: Icon,
  title,
  children,
}: {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-14">
      <h2 className="label flex items-center gap-2 text-[var(--accent)]">
        <Icon size={14} /> {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProject(id);
  if (!p) notFound();

  const idx = profile.projects.findIndex((x) => x.id === id);
  const next = profile.projects[(idx + 1) % profile.projects.length];

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-4xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <Link
          href="/#work"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          <ArrowLeft size={15} /> All projects
        </Link>

        {/* ---------- Header ---------- */}
        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            {p.flagship && (
              <span className="chip chip-accent font-mono">
                <Sparkles size={11} /> Flagship
              </span>
            )}
            <span className="font-mono text-xs text-[var(--faint)]">{p.period}</span>
          </div>

          <h1 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">{p.name}</h1>
          <p className="mt-3 text-lg text-[var(--accent)]">{p.subtitle}</p>
          <p className="mt-5 text-[1.02rem] leading-relaxed text-[var(--muted)]">{p.blurb}</p>

          <div className="mt-7">
            <RepoLinks p={p} />
          </div>

          <p className="mt-6 flex items-center gap-1.5 text-[0.8rem] text-[var(--faint)]">
            <User size={13} /> {p.role}
          </p>
        </header>

        <div className="mt-10 border-t" />

        {/* ---------- The problem ---------- */}
        <Block icon={Lightbulb} title="The problem">
          <p className="text-[0.95rem] leading-[1.75] text-[var(--muted)]">{p.problem}</p>
        </Block>

        {/* ---------- Architecture ---------- */}
        <Block icon={Terminal} title="Architecture">
          <Diagram>{p.architecture}</Diagram>
        </Block>

        {/* ---------- Capabilities (flagship only) ---------- */}
        {p.capabilities.length > 0 && (
          <Block icon={Sparkles} title="Capabilities">
            <Capabilities capabilities={p.capabilities} />
          </Block>
        )}

        {/* ---------- What it does ---------- */}
        {p.highlights.length > 0 && (
          <Block icon={Check} title="What it does">
            <ul className="space-y-2.5">
              {p.highlights.map((h) => (
                <li key={h} className="flex gap-2.5 text-[0.9rem] leading-relaxed text-[var(--muted)]">
                  <Check size={15} className="mt-[3px] shrink-0 text-[var(--accent)]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {/* ---------- Deep dive ---------- */}
        <Block icon={Terminal} title="How it works">
          <div className="space-y-8">
            {p.deepDive.map((d) => (
              <div key={d.title}>
                <h3 className="text-[1.05rem] font-semibold tracking-tight">{d.title}</h3>
                <p className="mt-2.5 text-[0.925rem] leading-[1.75] text-[var(--muted)]">{d.body}</p>
              </div>
            ))}
          </div>
        </Block>

        {/* ---------- Try it ---------- */}
        {p.tryThis.length > 0 && (
          <Block icon={Terminal} title={p.demo ? "Try it yourself" : "Run it locally"}>
            <div className="card overflow-hidden">
              <ul className="divide-y">
                {p.tryThis.map((t) => (
                  <li key={t} className="px-5 py-3 font-mono text-[0.82rem] leading-relaxed text-[var(--muted)]">
                    <span className="mr-2 select-none text-[var(--accent)]">›</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {p.demo && (
              <div className="mt-4">
                <RepoLinks p={p} size="sm" />
              </div>
            )}
          </Block>
        )}

        {/* ---------- Stack ---------- */}
        <Block icon={Terminal} title="Built with">
          <StackRow stack={p.stack} />
        </Block>

        {/* ---------- Learnings ---------- */}
        <Block icon={Lightbulb} title="What I took away">
          <ul className="space-y-3">
            {p.learnings.map((l) => (
              <li
                key={l}
                className="relative pl-5 text-[0.925rem] leading-relaxed text-[var(--muted)] before:absolute before:left-0 before:top-[0.62em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-[var(--accent)]"
              >
                {l}
              </li>
            ))}
          </ul>
        </Block>

        {/* ---------- Next project ---------- */}
        <div className="mt-16 border-t pt-8">
          <Link
            href={`/projects/${next.id}`}
            className="card card-hover group flex items-center justify-between gap-4 p-5"
          >
            <div>
              <p className="label text-[var(--faint)]">Next project</p>
              <p className="mt-1.5 text-lg font-semibold tracking-tight">{next.name}</p>
              <p className="mt-0.5 text-sm text-[var(--muted)]">{next.subtitle}</p>
            </div>
            <ArrowRight
              size={20}
              className="shrink-0 text-[var(--faint)] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
            />
          </Link>
        </div>
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 px-5 py-8 text-xs text-[var(--faint)] sm:flex-row sm:px-8">
          <p>
            © {new Date().getFullYear()} {profile.name}
          </p>
          <Link href="/#contact" className="transition-colors hover:text-[var(--text)]">
            Get in touch →
          </Link>
        </div>
      </footer>
    </>
  );
}
