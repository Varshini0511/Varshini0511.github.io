import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Capabilities from "@/components/Capabilities";
import ArchDiagram from "@/components/ArchDiagram";
import { RepoLinks, StackRow } from "@/components/project-ui";
import { profile, getProject, type Project } from "@/data/profile";

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
    alternates: { canonical: `/projects/${p.id}/` },
    openGraph: {
      type: "article",
      title: `${p.name} · ${profile.name}`,
      description: p.blurb,
      url: `/projects/${p.id}/`,
      images: [{ url: "/og.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${p.name} · ${profile.name}`,
      description: p.blurb,
      images: ["/og.png"],
    },
  };
}

type Part = { id: string; title: string; body: React.ReactNode };

/** The case study as an ordered list of parts; a part with nothing to show is left out. */
function parts(p: Project): Part[] {
  const all: (Part | false)[] = [
    {
      id: "problem",
      title: "The problem",
      body: <p className="text-[1rem] leading-[1.8] text-[var(--muted)]">{p.problem}</p>,
    },
    p.capabilities.length > 0 && {
      id: "capabilities",
      title: "Capabilities",
      body: <Capabilities capabilities={p.capabilities} />,
    },
    p.highlights.length > 0 && {
      id: "what-it-does",
      title: "What it does",
      body: (
        <ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-[0.92rem] leading-relaxed text-[var(--muted)]">
              <Check size={15} className="mt-[3px] shrink-0 text-[var(--accent)]" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: "how-it-works",
      title: "How it works",
      body: (
        <div className="divide-y border-y">
          {p.deepDive.map((d) => (
            <div key={d.title} className="py-7 first:pt-6">
              <h3 className="text-[1.25rem] leading-snug">{d.title}</h3>
              <p className="mt-3 text-[1rem] leading-[1.8] text-[var(--muted)]">{d.body}</p>
            </div>
          ))}
        </div>
      ),
    },
    p.tryThis.length > 0 && {
      id: "try-it",
      title: p.demo ? "Try it yourself" : "Run it locally",
      body: (
        <>
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
        </>
      ),
    },
    {
      id: "learnings",
      title: "What I took away",
      body: (
        <ol className="space-y-3">
          {p.learnings.map((l, i) => (
            <li key={l} className="grid grid-cols-[2rem_1fr] text-[1rem] leading-relaxed text-[var(--muted)]">
              <span className="numeral text-[1.05rem] text-[var(--accent)]">{i + 1}.</span>
              <span>{l}</span>
            </li>
          ))}
        </ol>
      ),
    },
  ];
  return all.filter((x): x is Part => Boolean(x));
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const p = getProject(id);
  if (!p) notFound();

  // "Next project" stays within the same group (AI or mobile); both live on the AI tab.
  const group = profile.projects.filter((x) => x.kind === p.kind);
  const idx = group.findIndex((x) => x.id === id);
  const next = group[(idx + 1) % group.length];
  const backLabel = p.kind === "mobile" ? "All projects · mobile" : "All projects";

  const sections = parts(p);
  const status = p.demo ? "Live demo" : p.repoPrivate ? "Private · runs locally" : "Open source · runs locally";
  const facts = [
    { k: "Role", v: p.role },
    { k: "Year", v: p.period },
    { k: "Status", v: status },
    { k: "Focus", v: p.tags.slice(0, 4).join(" · ") },
  ];

  return (
    <>
      <Nav />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <Link
          href="/#ai"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--muted)] transition-colors hover:text-[var(--text)]"
        >
          <ArrowLeft size={15} /> {backLabel}
        </Link>

        {/* ---------- Header ---------- */}
        <header className="mt-8 max-w-4xl">
          <div className="flex flex-wrap items-center gap-3">
            {p.flagship && (
              <span className="chip chip-accent">
                <Sparkles size={11} /> Flagship
              </span>
            )}
            <span className="label text-[var(--accent)]">Case study</span>
          </div>

          <h1 className="mt-5 text-[2.4rem] leading-[1.06] sm:text-[3rem]">{p.name}</h1>
          <p className="mt-3 text-[1.15rem] italic text-[var(--accent)] [font-family:var(--font-display)] sm:text-[1.3rem]">
            {p.subtitle}
          </p>
          <p className="mt-6 max-w-3xl text-[1.06rem] leading-[1.75] text-[var(--muted)]">{p.blurb}</p>

          <div className="mt-8">
            <RepoLinks p={p} />
          </div>
        </header>

        {/* ---------- Key facts ---------- */}
        <dl data-reveal className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-[var(--border)] lg:grid-cols-[1.6fr_0.6fr_1fr_1.2fr]">
          {facts.map((f) => (
            <div key={f.k} className="bg-[var(--surface)] px-5 py-4">
              <dt className="label text-[0.68rem] text-[var(--faint)]">{f.k}</dt>
              <dd className="mt-1.5 text-[0.92rem] leading-snug text-[var(--text)]">{f.v}</dd>
            </div>
          ))}
        </dl>

        {/* ---------- Architecture: full width, so wide diagrams don't need to scroll ---------- */}
        <figure id="architecture" data-reveal className="card mt-6 overflow-hidden">
          <div className="flex items-center justify-between border-b bg-[var(--surface-2)] px-5 py-2.5">
            <span className="label text-[0.68rem] text-[var(--accent)]">Architecture</span>
            <span className="label text-[0.68rem] text-[var(--faint)]">Simplified</span>
          </div>
          <div className="p-4 sm:p-6">
            <ArchDiagram spec={p.diagram} id={p.id} title={`${p.name} architecture`} />
          </div>
        </figure>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_13.5rem] lg:gap-16">
          {/* ---------- Body ---------- */}
          <div className="min-w-0">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} data-reveal className="pb-14">
                <h2 className="label rule-label text-[var(--accent)]">
                  <span>
                    {String(i + 1).padStart(2, "0")} <span className="text-[var(--faint)]">/</span> {s.title}
                  </span>
                </h2>
                <div className="mt-6">{s.body}</div>
              </section>
            ))}

            <section id="built-with" className="pb-4">
              <h2 className="label rule-label text-[var(--accent)]">
                <span>Built with</span>
              </h2>
              <div className="mt-5">
                <StackRow stack={p.stack} />
              </div>
            </section>
          </div>

          {/* ---------- Rail ---------- */}
          <aside className="no-print hidden lg:block">
            <nav aria-label="On this page" className="sticky top-28">
              <p className="label text-[0.68rem] text-[var(--faint)]">On this page</p>
              <ol className="mt-4 space-y-0.5 border-l">
                <li>
                  <a
                    href="#architecture"
                    className="-ml-px flex gap-2.5 border-l border-transparent py-1.5 pl-4 text-[0.92rem] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                  >
                    <span className="font-mono text-[0.76rem] leading-[1.35rem] text-[var(--faint)]">00</span>
                    Architecture
                  </a>
                </li>
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px flex gap-2.5 border-l border-transparent py-1.5 pl-4 text-[0.92rem] text-[var(--muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text)]"
                    >
                      <span className="font-mono text-[0.76rem] leading-[1.35rem] text-[var(--faint)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
              <div className="mt-8 border-t pt-6">
                <RepoLinks p={p} size="sm" hideNote />
              </div>
            </nav>
          </aside>
        </div>

        {/* ---------- Next project ---------- */}
        <div className="mt-16 border-t pt-8">
          <Link
            href={`/projects/${next.id}`}
            className="card card-hover group flex items-center justify-between gap-4 p-6"
          >
            <div>
              <p className="label text-[var(--faint)]">Next case study</p>
              <p className="mt-2 text-[1.5rem] leading-tight [font-family:var(--font-display)] transition-colors group-hover:text-[var(--accent)]">
                {next.name}
              </p>
              <p className="mt-1 text-sm text-[var(--muted)]">{next.subtitle}</p>
            </div>
            <ArrowRight
              size={20}
              className="shrink-0 text-[var(--faint)] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
            />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
