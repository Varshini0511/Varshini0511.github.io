export default function Section({
  id,
  eyebrow,
  title,
  intro,
  children,
  className = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28 ${className}`}>
      <header className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent)]">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">{title}</h2>
        {intro && <p className="mt-4 text-[0.95rem] leading-relaxed text-[var(--muted)]">{intro}</p>}
      </header>
      <div className="mt-12">{children}</div>
    </section>
  );
}
