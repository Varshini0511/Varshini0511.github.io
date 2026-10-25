import { profile } from "@/data/profile";

export default function Approach() {
  return (
    <div>
      {/* Three lanes */}
      <div className="grid gap-px overflow-hidden rounded-lg border bg-[var(--border)] lg:grid-cols-3">
        {profile.focusAreas.map((f) => (
          <section key={f.id} data-reveal className="bg-[var(--surface)] p-6 sm:p-7">
            <p className="label text-[var(--accent)]">Focus {f.id}</p>
            <h3 className="mt-3 text-[1.4rem] leading-tight">{f.title}</h3>
            <p className="mt-3 text-[0.92rem] leading-[1.65] text-[var(--muted)]">{f.lead}</p>
            <ul className="mt-5 space-y-2.5 border-t pt-5">
              {f.points.map((pt) => (
                <li
                  key={pt}
                  className="relative pl-4 text-[0.92rem] leading-[1.65] text-[var(--muted)] before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2 before:bg-[var(--accent)]"
                >
                  {pt}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Principles, each with evidence from both halves of the career */}
      <div className="mt-16">
        <p className="label text-[var(--faint)]">Principles, and the evidence for them</p>
        <ol className="mt-5 divide-y border-y">
          {profile.principles.map((p, i) => (
            <li key={p.title} data-reveal className="grid gap-4 py-7 lg:grid-cols-[3rem_1fr_1.5fr] lg:gap-10">
              <span className="numeral text-[1.4rem] leading-none text-[var(--accent)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h4 className="text-[1.3rem] leading-snug">{p.title}</h4>
              <ul className="space-y-2">
                {p.proof.map((line) => {
                  const [head, ...rest] = line.split(" — ");
                  return (
                    <li key={line} className="text-[0.92rem] leading-[1.65] text-[var(--muted)]">
                      {rest.length > 0 ? (
                        <>
                          <span className="font-mono text-[0.76rem] text-[var(--text)]">{head}</span>
                          <span className="text-[var(--faint)]"> — </span>
                          {rest.join(" — ")}
                        </>
                      ) : (
                        line
                      )}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
