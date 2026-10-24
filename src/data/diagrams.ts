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
