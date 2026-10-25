/**
 * A section of the home tab. Lighter than <Section>: the home page is a
 * summary, so each part gets a label, a heading and an optional link onward
 * to the tab that holds the full version.
 */
export default function HomeBlock({
  label,
  title,
  more,
  children,
}: {
  label: string;
  title: string;
  more?: { href: string; text: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-20">
      <p className="label rule-label text-[var(--accent)]">{label}</p>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <h2 className="max-w-2xl text-[1.4rem] leading-[1.2] sm:text-[1.7rem]">{title}</h2>
        {more && (
          // A tab link is a hash change, not a router navigation.
          <a
            href={more.href}
            className="link-underline pb-0.5 text-[0.85rem] font-medium text-[var(--accent)]"
          >
            {more.text} →
          </a>
        )}
      </div>
      <div className="mt-7">{children}</div>
    </section>
  );
}
