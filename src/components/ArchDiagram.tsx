import type { DiagramEdge, DiagramNode, DiagramSpec, Side } from "@/data/diagrams";

/**
 * Renders a DiagramSpec to inline SVG using the site's CSS variables, so it
 * follows the light/dark theme with no per-theme assets. Server-rendered:
 * no client JS needed.
 */

const horizontal = (s: Side) => s === "left" || s === "right";

function anchor(n: DiagramNode, side: Side): [number, number] {
  switch (side) {
    case "left":
      return [n.x, n.y + n.h / 2];
    case "right":
      return [n.x + n.w, n.y + n.h / 2];
    case "top":
      return [n.x + n.w / 2, n.y];
    case "bottom":
      return [n.x + n.w / 2, n.y + n.h];
  }
}

function autoSides(a: DiagramNode, b: DiagramNode): [Side, Side] {
  const dx = b.x + b.w / 2 - (a.x + a.w / 2);
  const dy = b.y + b.h / 2 - (a.y + a.h / 2);
  if (Math.abs(dx) >= Math.abs(dy)) return dx >= 0 ? ["right", "left"] : ["left", "right"];
  return dy >= 0 ? ["bottom", "top"] : ["top", "bottom"];
}

/** Orthogonal route between two anchors. Returns the path and a label point. */
function route(
  [x1, y1]: [number, number],
  [x2, y2]: [number, number],
  sa: Side,
  sb: Side,
  bend?: number,
): { d: string; mid: [number, number] } {
  const ha = horizontal(sa);
  const hb = horizontal(sb);

  if (ha && hb) {
    if (bend === undefined && Math.abs(y1 - y2) < 2) {
      return { d: `M${x1} ${y1} L${x2} ${y2}`, mid: [(x1 + x2) / 2, (y1 + y2) / 2] };
    }
    const mx = bend ?? (x1 + x2) / 2;
    return { d: `M${x1} ${y1} H${mx} V${y2} H${x2}`, mid: [mx, (y1 + y2) / 2] };
  }
  if (!ha && !hb) {
    if (bend === undefined && Math.abs(x1 - x2) < 2) {
      return { d: `M${x1} ${y1} L${x2} ${y2}`, mid: [(x1 + x2) / 2, (y1 + y2) / 2] };
    }
    const my = bend ?? (y1 + y2) / 2;
    return { d: `M${x1} ${y1} V${my} H${x2} V${y2}`, mid: [(x1 + x2) / 2, my] };
  }
  // Mixed: one leg horizontal, one vertical.
  if (ha) return { d: `M${x1} ${y1} H${x2} V${y2}`, mid: [(x1 + x2) / 2, y1] };
  return { d: `M${x1} ${y1} V${y2} H${x2}`, mid: [x1, (y1 + y2) / 2] };
}

function Lines({
  x,
  cy,
  label,
  sub,
  anchorEnd = false,
}: {
  x: number;
  cy: number;
  label: string;
  sub?: string;
  anchorEnd?: boolean;
}) {
  const labelLines = label.split("\n");
  const lh = 15;
  const total = labelLines.length * lh + (sub ? 14 : 0);
  const top = cy - total / 2;

  return (
    <>
      {labelLines.map((line, i) => (
        <text
          key={i}
          x={x}
          y={top + lh * (i + 0.78)}
          textAnchor={anchorEnd ? "end" : "middle"}
          style={{ fill: "var(--text)", fontFamily: "var(--font-body), sans-serif", fontSize: 12.5, fontWeight: 600 }}
        >
          {line}
        </text>
      ))}
      {sub && (
        <text
          x={x}
          y={top + labelLines.length * lh + 11}
          textAnchor="middle"
          style={{ fill: "var(--muted)", fontFamily: "var(--font-mono-face), monospace", fontSize: 10.5 }}
        >
          {sub}
        </text>
      )}
    </>
  );
}

function nodeStyle(tone: DiagramNode["tone"]) {
  switch (tone) {
    case "accent":
      return { fill: "var(--accent-soft)", stroke: "var(--accent)", strokeWidth: 1.25 };
    case "muted":
      return { fill: "transparent", stroke: "var(--border-strong)", strokeWidth: 1, strokeDasharray: "4 3" };
    case "band":
      return { fill: "var(--surface-2)", stroke: "var(--border)", strokeWidth: 1 };
    default:
      return { fill: "var(--surface-2)", stroke: "var(--border-strong)", strokeWidth: 1 };
  }
}

export default function ArchDiagram({
  spec,
  id,
  title,
}: {
  spec: DiagramSpec;
  /** Unique per diagram on a page — namespaces the arrowhead marker. */
  id: string;
  title: string;
}) {
  const byId = new Map(spec.nodes.map((n) => [n.id, n]));
  const groups = spec.nodes.filter((n) => n.tone === "group");
  const boxes = spec.nodes.filter((n) => n.tone !== "group");
  const marker = `arrow-${id}`;

  const edges = spec.edges
    .map((e: DiagramEdge, i) => {
      const a = byId.get(e.from);
      const b = byId.get(e.to);
      if (!a || !b) return null;
      const [sa, sb] = e.sides ?? autoSides(a, b);
      const { d, mid } = route(anchor(a, sa), anchor(b, sb), sa, sb, e.bend);
      return { key: `${e.from}-${e.to}-${i}`, d, mid, e };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${spec.width} ${spec.height}`}
        role="img"
        aria-label={title}
        className="block h-auto w-full"
        style={{ minWidth: Math.round(spec.width * 0.8) }}
      >
        <title>{title}</title>
        <defs>
          <marker id={marker} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0 0L10 5L0 10z" style={{ fill: "var(--faint)" }} />
          </marker>
        </defs>

        {/* Containers first, so edges and nodes draw over them. */}
        {groups.map((g) => (
          <g key={g.id}>
            <rect
              x={g.x}
              y={g.y}
              width={g.w}
              height={g.h}
              rx={8}
              style={{ fill: "transparent", stroke: "var(--border-strong)", strokeWidth: 1, strokeDasharray: "5 4" }}
            />
            <text
              x={g.x + 14}
              y={g.y + 22}
              style={{
                fill: "var(--accent)",
                fontFamily: "var(--font-mono-face), monospace",
                fontSize: 10,
                letterSpacing: "0.14em",
                fontWeight: 500,
              }}
            >
              {g.label}
            </text>
          </g>
        ))}

        {edges.map(({ key, d, e }) => (
          <path
            key={key}
            d={d}
            fill="none"
            markerEnd={`url(#${marker})`}
            style={{
              stroke: "var(--faint)",
              strokeWidth: 1.25,
              strokeDasharray: e.dashed ? "4 3" : undefined,
            }}
          />
        ))}

        {boxes.map((n) =>
          n.tone === "band" ? (
            <g key={n.id}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={6} style={nodeStyle(n.tone)} />
              <text
                x={n.x + n.w / 2}
                y={n.y + n.h / 2 + 3.5}
                textAnchor="middle"
                style={{
                  fill: "var(--muted)",
                  fontFamily: "var(--font-mono-face), monospace",
                  fontSize: 10.5,
                  letterSpacing: "0.04em",
                }}
              >
                {n.label}
              </text>
            </g>
          ) : (
            <g key={n.id}>
              <rect x={n.x} y={n.y} width={n.w} height={n.h} rx={6} style={nodeStyle(n.tone)} />
              <Lines x={n.x + n.w / 2} cy={n.y + n.h / 2} label={n.label} sub={n.sub} />
            </g>
          ),
        )}

        {/* Edge labels last, on a backing plate so they stay legible over lines. */}
        {edges.map(({ key, mid, e }) =>
          e.label ? (
            <g key={`${key}-label`}>
              <rect
                x={mid[0] - (e.label.length * 5.8 + 10) / 2}
                y={mid[1] - 9}
                width={e.label.length * 5.8 + 10}
                height={18}
                rx={3}
                style={{ fill: "var(--surface)", stroke: "var(--border)", strokeWidth: 1 }}
              />
              <text
                x={mid[0]}
                y={mid[1] + 3.5}
                textAnchor="middle"
                style={{ fill: "var(--muted)", fontFamily: "var(--font-mono-face), monospace", fontSize: 10 }}
              >
                {e.label}
              </text>
            </g>
          ) : null,
        )}
      </svg>
    </div>
  );
}
