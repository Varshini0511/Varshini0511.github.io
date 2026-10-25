import type { MetadataRoute } from "next";

// Written to out/robots.txt at build time.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://varshini0511.github.io/sitemap.xml",
  };
}
