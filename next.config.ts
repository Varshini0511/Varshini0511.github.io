import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes plain HTML to ./out, which any
  // static host (GitHub Pages, Vercel, Netlify) can serve.
  output: "export",
  // /projects/x/ -> projects/x/index.html. Works on every static host without
  // needing extension-less URL rewriting.
  trailingSlash: true,
  // No <Image> optimisation server on a static host.
  images: { unoptimized: true },
};

export default nextConfig;
