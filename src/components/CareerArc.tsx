import { profile } from "@/data/profile";

/**
 * A Gantt-style view of the career: each role is a bar on a shared year axis,
 * with the technology of that era underneath. It turns eight years from a list
 * into a shape you can read at a glance.
 */

const AXIS_START = 2018;
const now = new Date();
const NOW = now.getFullYear() + now.getMonth() / 12;
const AXIS_END = Math.ceil(NOW); // first whole year at or beyond today
const RANGE = AXIS_END - AXIS_START;

const pct = (year: number) => ((year - AXIS_START) / RANGE) * 100;

type Lane = {
  key: string;
  name: string;
  role: string;
  start: number;
  end: number;
  current: boolean;
  eras: string;
};

function buildLanes(): Lane[] {
  const jobs: Lane[] = [...profile.experience]
    .reverse()
    .map((j) => ({
      key: j.short,
      name: j.short,
      role: j.domain,
      start: j.span[0],
      end: j.span[1] ?? NOW,
      current: j.current,
      eras: j.stack.slice(0, 6).join(" · "),
    }));

  jobs.push({
    key: "ai",
    name: "Applied AI",
    role: "Independent systems",
    start: 2026.0,
    end: NOW,
    current: true,
    eras: "RAG · agents · MCP · evals · guardrails",
  });
  return jobs;
}

/** "4 yrs", "2.5 yrs", or "8 mo" for anything under a year. */
const duration = (a: number, b: number) => {
  const y = b - a;
  if (y < 1) return `${Math.max(1, Math.round(y * 12))} mo`;
  return `${Math.round(y * 2) / 2} yrs`;
};

export default function CareerArc() {
  const lanes = buildLanes();
  const ticks = Array.from({ length: RANGE + 1 }, (_, i) => AXIS_START + i);

  return (
    <figure className="card p-5 sm:p-7" aria-label="Career timeline, 2018 to present">
      {/* Year axis */}
      <div className="grid sm:grid-cols-[10.5rem_1fr] sm:gap-6">
        <div className="hidden sm:block" />
        <div className="relative h-5">
          {ticks.slice(0, -1).map((t) => (
            <span
              key={t}
              // Every other year on narrow screens, or the labels run together.
              className={`label absolute text-[0.62rem] text-[var(--faint)] ${
                (t - AXIS_START) % 2 === 1 ? "max-sm:hidden" : ""
              }`}
              style={{ left: `${pct(t)}%` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div>
        {lanes.map((l) => (
          <div
            key={l.key}
            className="grid gap-2 border-t py-4 first:mt-2 sm:grid-cols-[10.5rem_1fr] sm:items-start sm:gap-6"
          >
            <div>
              <p className="font-[family-name:var(--font-display)] text-[1.1rem] leading-tight">{l.name}</p>
              <p className="label mt-1 text-[0.62rem] text-[var(--faint)]">{l.role}</p>
            </div>

            <div>
              <div
                className="relative h-9"
                style={{
                  backgroundImage: "linear-gradient(to right, var(--border) 1px, transparent 1px)",
                  backgroundSize: `${100 / RANGE}% 100%`,
                }}
              >
                {(() => {
                  const text = `${duration(l.start, l.end)}${l.current ? " · now" : ""}`;
                  const width = pct(l.end) - pct(l.start);
                  // A short bar can't hold its own label, so the label sits to its left.
                  const roomy = width >= 26;
                  const tone = l.key === "ai" ? "text-[var(--accent)]" : "text-[var(--muted)]";
                  return (
                    <>
                      <div
                        className={`absolute inset-y-1 flex items-center overflow-hidden rounded-[3px] border ${
                          roomy ? "px-2.5" : ""
                        } ${
                          l.key === "ai"
                            ? "border-[var(--accent)] bg-[var(--accent-soft)]"
                            : "border-[var(--border-strong)] bg-[var(--surface-3)]"
                        }`}
                        style={{ left: `${pct(l.start)}%`, width: `${width}%` }}
                      >
                        {roomy && <span className={`label whitespace-nowrap text-[0.62rem] ${tone}`}>{text}</span>}
                      </div>
                      {!roomy && (
                        <span
                          className={`label absolute top-1/2 -translate-y-1/2 whitespace-nowrap pr-2 text-right text-[0.62rem] ${tone}`}
                          style={{ right: `${100 - pct(l.start)}%` }}
                        >
                          {text}
                        </span>
                      )}
                    </>
                  );
                })()}
              </div>
              {/* On wide screens the tech line sits under its own bar. */}
              <p
                className="mt-2 hidden font-mono text-[0.72rem] leading-snug text-[var(--faint)] sm:block"
                style={{ paddingLeft: `${Math.min(pct(l.start), 50)}%` }}
              >
                {l.eras}
              </p>
              <p className="mt-2 font-mono text-[0.72rem] leading-snug text-[var(--faint)] sm:hidden">{l.eras}</p>
            </div>
          </div>
        ))}
      </div>
    </figure>
  );
}
