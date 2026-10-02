/**
 * Architecture diagrams as data. The <ArchDiagram> component renders these
 * to theme-aware SVG, so editing a box or an arrow never means touching SVG.
 *
 * Coordinates are in the diagram's own viewBox space. Component names are
 * limited to what appears in my work history — these are simplified views,
 * not internal documents.
 */

export type Side = "top" | "right" | "bottom" | "left";

export type DiagramNode = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  /** Second, smaller line in mono. */
  sub?: string;
  /** group = dashed container with a caption; band = full-width strip. */
  tone?: "default" | "accent" | "muted" | "group" | "band";
};

export type DiagramEdge = {
  from: string;
  to: string;
  label?: string;
  dashed?: boolean;
  /** Override the automatically chosen exit / entry sides. */
  sides?: [Side, Side];
  /**
   * Where the middle leg of an elbow runs: a y for top/bottom edges, an x for
   * left/right edges. Use it to route a feedback loop around other boxes.
   */
  bend?: number;
};

export type DiagramSpec = {
  width: number;
  height: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
};

/* ------------------------------------------------------------------ */
/* Event-driven ingestion on Azure (Wipro)                             */
/* ------------------------------------------------------------------ */
export const azureIngestion: DiagramSpec = {
  width: 980,
  height: 500,
  nodes: [
    { id: "orch", x: 200, y: 92, w: 524, h: 184, label: "AZURE FUNCTIONS · DURABLE ORCHESTRATION", tone: "group" },
    { id: "blob", x: 20, y: 150, w: 140, h: 64, label: "Blob Storage", sub: "file drop", tone: "accent" },
    { id: "dec", x: 220, y: 150, w: 104, h: 64, label: "Decrypt" },
    { id: "dup", x: 336, y: 150, w: 104, h: 64, label: "De-duplicate", sub: "by hash" },
    { id: "val", x: 452, y: 150, w: 104, h: 64, label: "Validate" },
    { id: "spl", x: 568, y: 150, w: 104, h: 64, label: "Split" },
    { id: "sql", x: 770, y: 150, w: 180, h: 64, label: "SQL Server", sub: "structured insert", tone: "accent" },

    { id: "sb", x: 352, y: 330, w: 220, h: 64, label: "Service Bus", sub: "topics & subscriptions" },
    { id: "dlq", x: 110, y: 330, w: 190, h: 64, label: "Dead-letter queue", sub: "retry policies", tone: "muted" },
    { id: "ds", x: 630, y: 310, w: 170, h: 48, label: "Downstream services" },
    { id: "em", x: 630, y: 376, w: 170, h: 48, label: "Email workflows" },

    { id: "cos", x: 830, y: 310, w: 130, h: 56, label: "Cosmos DB", sub: "UI read model" },
    { id: "ui", x: 830, y: 384, w: 130, h: 56, label: "Angular UI", sub: "dashboards" },

    {
      id: "band",
      x: 20,
      y: 454,
      w: 940,
      h: 34,
      label: "Managed Identity · Key Vault · App Configuration · Application Insights + KQL — cross-cutting",
      tone: "band",
    },
  ],
  edges: [
    { from: "blob", to: "dec", label: "trigger" },
    { from: "dec", to: "dup" },
    { from: "dup", to: "val" },
    { from: "val", to: "spl" },
    { from: "spl", to: "sql" },
    { from: "orch", to: "sb", sides: ["bottom", "top"], label: "events" },
    { from: "sb", to: "dlq", dashed: true, sides: ["left", "right"], label: "failed" },
    { from: "sb", to: "ds", sides: ["right", "left"] },
    { from: "sb", to: "em", sides: ["right", "left"] },
    { from: "cos", to: "ui", sides: ["bottom", "top"] },
  ],
};

/* ------------------------------------------------------------------ */
/* Forensic evidence collection and review (Exterro)                   */
/* ------------------------------------------------------------------ */
export const forensicsPlatform: DiagramSpec = {
  width: 1200,
  height: 410,
  nodes: [
    { id: "s1", x: 20, y: 24, w: 210, h: 40, label: "Google Drive" },
    { id: "s2", x: 20, y: 76, w: 210, h: 40, label: "OneDrive" },
    { id: "s3", x: 20, y: 128, w: 210, h: 40, label: "Network shares" },
    { id: "s4", x: 20, y: 180, w: 210, h: 40, label: "Gmail · Outlook · Exchange" },
    { id: "s5", x: 20, y: 232, w: 210, h: 40, label: "Windows · Linux · macOS" },
    { id: "s6", x: 20, y: 284, w: 210, h: 40, label: "Mobile devices" },

    { id: "coll", x: 290, y: 44, w: 240, h: 288, label: "COLLECTION", tone: "group" },
    { id: "jobs", x: 310, y: 92, w: 200, h: 64, label: "Job orchestration", sub: "progress · fault tolerance" },
    { id: "conn", x: 310, y: 172, w: 200, h: 64, label: "Cloud & mail connectors", sub: "Graph · Google · Export APIs" },
    { id: "mob", x: 310, y: 252, w: 200, h: 64, label: "Mobile capture", sub: "secure TCP/IP transfer" },

    { id: "enc", x: 580, y: 156, w: 160, h: 64, label: "Encrypt & seal", sub: "certificate-based", tone: "accent" },
    { id: "ext", x: 775, y: 156, w: 185, h: 64, label: "Entity extraction", sub: "people · emails · keywords" },
    { id: "ui", x: 990, y: 156, w: 190, h: 64, label: "Angular review UI", sub: "filter · tag · link entities", tone: "accent" },
    { id: "mac", x: 780, y: 262, w: 170, h: 56, label: "macOS / iWork", sub: "via Apple APIs" },

    {
      id: "band",
      x: 20,
      y: 360,
      w: 1160,
      h: 34,
      label: "Confidentiality · integrity · auditability of evidence — requirements, not features",
      tone: "band",
    },
  ],
  edges: [
    { from: "s1", to: "conn", sides: ["right", "left"] },
    { from: "s2", to: "conn", sides: ["right", "left"] },
    { from: "s3", to: "conn", sides: ["right", "left"] },
    { from: "s4", to: "conn", sides: ["right", "left"] },
    { from: "s5", to: "conn", sides: ["right", "left"] },
    { from: "s6", to: "mob", sides: ["right", "left"] },
    { from: "coll", to: "enc", sides: ["right", "left"] },
    { from: "enc", to: "ext" },
    { from: "ext", to: "ui" },
    { from: "mac", to: "ui", sides: ["right", "bottom"] },
  ],
};

/* ------------------------------------------------------------------ */
/* Platform modernisation                                              */
/* ------------------------------------------------------------------ */
export const modernisation: DiagramSpec = {
  width: 980,
  height: 300,
  nodes: [
    { id: "legacy", x: 20, y: 99, w: 170, h: 72, label: "Legacy platform", sub: ".NET Framework", tone: "muted" },
    { id: "mig", x: 240, y: 40, w: 500, h: 190, label: "MIGRATION WORK", tone: "group" },
    { id: "n1", x: 260, y: 84, w: 210, h: 56, label: "Resolve breaking changes" },
    { id: "n2", x: 490, y: 84, w: 230, h: 56, label: "Refactor legacy components" },
    { id: "n3", x: 260, y: 156, w: 210, h: 56, label: "Modernise APIs" },
    { id: "n4", x: 490, y: 156, w: 230, h: 56, label: "Improve performance" },
    { id: "target", x: 790, y: 99, w: 170, h: 72, label: "Target: .NET 8", sub: "long-term support", tone: "accent" },
    {
      id: "band",
      x: 20,
      y: 252,
      w: 940,
      h: 34,
      label: "Earlier: .NET 4.8 upgrade · Windows Server 2012 → 2019 · AWS EC2 migration (−40% cost)",
      tone: "band",
    },
  ],
  edges: [
    { from: "legacy", to: "mig", sides: ["right", "left"] },
    { from: "mig", to: "target", sides: ["right", "left"] },
  ],
};
