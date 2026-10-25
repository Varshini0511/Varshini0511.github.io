import { profile } from "@/data/profile";

/**
 * The names behind the eight years. Set as serif wordmarks rather than logos:
 * no trademark assets, and it stays in the site's typographic register.
 */
export default function Clients() {
  return (
    <div className="mx-auto max-w-6xl px-5 pt-14 sm:px-8">
      <p className="label text-center text-[0.62rem] text-[var(--faint)]">
        Platforms and clients across {profile.yearsExperience} years
      </p>
      <ul className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-[var(--border)] lg:grid-cols-4">
        {profile.clients.map((c) => (
          <li key={c.name} className="bg-[var(--bg)] px-4 py-4 text-center">
            <p className="text-[1.05rem] leading-tight text-[var(--text)] [font-family:var(--font-display)] sm:text-[1.15rem]">
              {c.name}
            </p>
            <p className="mt-1 text-[0.68rem] leading-snug text-[var(--faint)]">
              {c.note} <span className="text-[var(--border-strong)]">·</span> via {c.via}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
