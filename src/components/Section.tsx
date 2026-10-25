export default function Section({
  eyebrow,
  title,
  intro,
  children,
  lead = true,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  /** The first section in a tab clears the fixed nav; a second one sits closer. */
  lead?: boolean;
}) {
  return (
    <section
      className={`mx-auto max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28 ${lead ? "pt-28 sm:pt-32" : "pt-4"}`}
    >
      <header data-reveal className="grid gap-6 border-b pb-8 lg:grid-cols-[1fr_1.15fr] lg:items-end lg:gap-16">
        <div>
          <p className="label flex items-center gap-3 text-[var(--accent)]">
            <span className="h-px w-8 bg-[var(--accent)]" />
            {eyebrow}
          </p>
          <h2 className="mt-5 text-[1.9rem] leading-[1.12] sm:text-[2.35rem]">{title}</h2>
        </div>
        {intro && <p className="text-[1rem] leading-[1.75] text-[var(--muted)] lg:pb-1.5">{intro}</p>}
      </header>

      <div className="mt-12">{children}</div>
    </section>
  );
}
