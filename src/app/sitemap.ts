import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

// Written to out/sitemap.xml at build time.
export const dynamic = "force-static";

const base = "https://varshini0511.github.io";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    ...profile.projects.map((p) => ({
      url: `${base}/projects/${p.id}/`,
      changeFrequency: "monthly" as const,
      priority: p.flagship ? 0.9 : 0.7,
    })),
  ];
}
