import { profile } from "@/data/profile";

/** The measured results from the résumé, each labelled with where it came from. */
export default function Outcomes() {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border bg-[var(--border)] sm:grid-cols-5">
      {profile.outcomes.map((o) => (
        <div key={o.label + o.context} data-reveal className="bg-[var(--surface)] px-4 py-5 max-sm:last:col-span-2">
          <dt data-count className="numeral text-[1.75rem] leading-none text-[var(--accent)]">{o.value}</dt>
          <dd className="mt-2 text-[0.82rem] font-medium leading-snug text-[var(--text)]">{o.label}</dd>
          <dd className="mt-1 text-[0.76rem] leading-snug text-[var(--faint)]">{o.context}</dd>
        </div>
      ))}
    </dl>
  );
}
