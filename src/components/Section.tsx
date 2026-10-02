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
        <header className="grid gap-6 border-b pb-8 lg:grid-cols-[1fr_1.15fr] lg:items-end lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="label text-[var(--accent)]">{index}</span>
              <span className="h-px w-8 bg-[var(--border-strong)]" />
              <span className="label text-[var(--faint)]">{eyebrow}</span>
            </div>
            <h2 className="mt-5 text-[2rem] leading-[1.1] sm:text-[2.7rem]">{title}</h2>
          </div>
          {intro && <p className="text-[0.95rem] leading-[1.75] text-[var(--muted)] lg:pb-1.5">{intro}</p>}
        </header>
      </Reveal>

      <Reveal delay={80}>
        <div className="mt-12">{children}</div>
      </Reveal>
    </section>
  );
}
