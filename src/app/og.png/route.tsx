import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

/**
 * The link-preview card shown when the site is shared on LinkedIn, Slack or X.
 * A route rather than the opengraph-image convention so the static export
 * writes a real out/og.png: GitHub Pages picks the content type from the
 * extension, and some crawlers reject an image served without one.
 */
export const dynamic = "force-static";

const size = { width: 1200, height: 630 };

const BG = "#0b0b0c";
const TEXT = "#ecebe6";
const MUTED = "#a5a39b";
const FAINT = "#727069";
const ACCENT = "#d9a94f";
const LINE = "#242428";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: BG,
          backgroundImage: "radial-gradient(circle at 85% 0%, rgba(217,169,79,0.18), rgba(11,11,12,0) 55%)",
          color: TEXT,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 48, height: 2, background: ACCENT }} />
          <div style={{ fontSize: 24, letterSpacing: 5, color: ACCENT, textTransform: "uppercase" }}>
            {`${profile.title} · Applied AI`}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -2, lineHeight: 1.05 }}>{profile.name}</div>
          <div style={{ marginTop: 22, fontSize: 40, lineHeight: 1.3, color: MUTED, display: "flex", flexWrap: "wrap" }}>
            <span>{profile.headline[0]}&nbsp;</span>
            <span style={{ color: ACCENT, fontStyle: "italic" }}>{profile.headline[1]}</span>
          </div>
        </div>

        <div style={{ display: "flex", borderTop: `1px solid ${LINE}`, paddingTop: 30 }}>
          {profile.stats.map((s, i) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                paddingLeft: i === 0 ? 0 : 28,
                borderLeft: i === 0 ? "none" : `1px solid ${LINE}`,
              }}
            >
              <div style={{ fontSize: 50, fontWeight: 600, color: TEXT }}>{s.value}</div>
              <div style={{ fontSize: 20, color: FAINT, marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
