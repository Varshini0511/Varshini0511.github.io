import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { profile } from "@/data/profile";

/**
 * One product on three runtimes. The comparison table is the point: it shows
 * the same problem solved with three deliberately different trade-offs.
 */
export default function Mobile() {
  const { columns, rows } = profile.rideSmartFamily;
  const mobile = profile.projects.filter((p) => p.kind === "mobile");

  return (
    <div>
      {/* Side-by-side */}
      <div data-reveal className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <thead>
              <tr className="border-b bg-[var(--surface-2)]">
                <th scope="col" className="w-[8.5rem] px-5 py-4" />
                {columns.map((c) => (
                  <th key={c.id} scope="col" className="px-5 py-4 align-top">
                    <Link
                      href={c.href}
                      className="group inline-flex items-center gap-1.5 text-[1.05rem] font-medium [font-family:var(--font-display)] hover:text-[var(--accent)]"
                    >
                      {c.name}
                      <ArrowRight
                        size={14}
                        className="text-[var(--faint)] transition-all group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                      />
                    </Link>
                    <span className="label mt-1 block text-[0.68rem] font-normal text-[var(--faint)]">{c.runtime}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.k} className="border-b align-top last:border-b-0">
                  <th scope="row" className="label px-5 py-4 text-left text-[0.68rem] font-medium text-[var(--accent)]">
                    {r.k}
                  </th>
                  {r.v.map((cell, i) => (
                    <td key={i} className="px-5 py-4 text-[0.92rem] leading-[1.6] text-[var(--muted)]">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* The two mobile builds in detail */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {mobile.map((p) => (
          <Link key={p.id} href={`/projects/${p.id}`} data-reveal className="card card-hover group flex flex-col p-6 sm:p-7">
            <p className="label text-[var(--accent)]">{p.tags[0]}</p>
            <h3 className="mt-3 text-[1.5rem] leading-tight">{p.name}</h3>
            <p className="mt-1.5 text-[0.92rem] text-[var(--accent)]">{p.subtitle}</p>
            <p className="mt-4 text-[0.92rem] leading-[1.7] text-[var(--muted)]">{p.blurb}</p>

            <ul className="mt-5 flex flex-wrap gap-1.5">
              {p.stack.slice(0, 6).map((t) => (
                <li key={t} className="chip">
                  {t}
                </li>
              ))}
            </ul>

            <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)]">
              Read the case study
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
