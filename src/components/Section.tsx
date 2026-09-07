import Reveal from "./Reveal";

export default function Section({
  id,
  index,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <Reveal>
        <header className="max-w-2xl">
          <div className="flex items-center gap-3">
            <span className="label text-[var(--faint)]">{index}</span>
            <span className="h-px w-8 bg-[var(--border-strong)]" />
            <span className="label text-[var(--accent)]">{eyebrow}</span>
          </div>

          <h2 className="mt-5 text-[2rem] leading-[1.12] sm:text-[2.6rem]">{title}</h2>

          {intro && <p className="mt-5 text-[0.95rem] leading-[1.7] text-[var(--muted)]">{intro}</p>}
        </header>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-12">{children}</div>
      </Reveal>
    </section>
  );
}
