import { profile } from "@/data/profile";

/**
 * Technology × career. Reads as depth and continuity: what carried across
 * every role, what each stage added, and where the AI work sits.
 */
export default function TechMatrix() {
  const { columns, groups } = profile.techMatrix;

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b bg-[var(--surface-2)]">
              <th scope="col" className="label px-5 py-3.5 text-[0.62rem] font-medium text-[var(--faint)]">
                Technology
              </th>
              {columns.map((c) => (
                <th key={c.key} scope="col" className="px-3 py-3.5 text-center">
                  <span className="block text-[0.85rem] [font-family:var(--font-display)]">{c.label}</span>
                  <span className="label mt-0.5 block text-[0.58rem] font-normal text-[var(--faint)]">{c.span}</span>
                </th>
              ))}
            </tr>
          </thead>

          {groups.map((g) => (
            <tbody key={g.name}>
              <tr>
                <th
                  scope="rowgroup"
                  colSpan={columns.length + 1}
                  className="label border-b border-t bg-[var(--surface)] px-5 py-2 text-left text-[0.6rem] font-medium text-[var(--accent)]"
                >
                  {g.name}
                </th>
              </tr>
              {g.rows.map((r) => (
                <tr key={r.name} className="border-b last:border-b-0 transition-colors hover:bg-[var(--surface-2)]">
                  <th scope="row" className="px-5 py-3 text-left font-normal">
                    <span className="block text-[0.85rem] text-[var(--text)]">{r.name}</span>
                    <span className="mt-0.5 block text-[0.72rem] text-[var(--faint)]">{r.note}</span>
                  </th>
                  {columns.map((c) => {
                    const on = (r.used as readonly string[]).includes(c.key);
                    return (
                      <td key={c.key} className="px-3 py-3 text-center">
                        <span
                          role="img"
                          aria-label={on ? `Used at ${c.label}` : `Not used at ${c.label}`}
                          className={`mx-auto block h-2.5 w-2.5 rounded-[2px] ${
                            on
                              ? c.key === "ai"
                                ? "bg-[var(--accent)]"
                                : "bg-[var(--text)]"
                              : "border border-[var(--border-strong)]"
                          }`}
                        />
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <p className="border-t bg-[var(--surface-2)] px-5 py-3 text-[0.72rem] text-[var(--faint)]">
        A filled square means the technology appears in the stack or responsibilities of that role.
      </p>
    </div>
  );
}
