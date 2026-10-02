import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

/**
 * Three roles, three faces:
 *  - Newsreader (serif) for headings and large numerals — editorial and
 *    measured, the register of a principal engineer rather than a template
 *  - Inter for body — the most legible workhorse at small sizes
 *  - JetBrains Mono for labels, metrics and diagrams
 *
 * To go back to a sans heading, swap Newsreader for any other face and keep
 * the --font-display variable name.
 */
const display = Newsreader({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const description = `${profile.title} with ${profile.yearsExperience} years building secure .NET and Next.js platforms, now building production-grade AI systems — RAG, tool-calling agents, hybrid search and multi-agent orchestration.`;

export const metadata: Metadata = {
  metadataBase: new URL("https://varchini.dev"),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s · ${profile.name}`,
  },
  description,
  keywords: [
    ".NET", "C#", "ASP.NET Core", "Next.js", "Angular", "Azure",
    "AI Engineer", "RAG", "LLM agents", "pgvector", "LangGraph", "Full-Stack Engineer",
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  creator: profile.name,
  openGraph: {
    type: "website",
    title: `${profile.name} — ${profile.title}`,
    description,
    siteName: profile.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — ${profile.title}`,
    description,
  },
  robots: { index: true, follow: true },
};

/**
 * Runs before paint so the stored theme is applied without a flash of the
 * wrong palette. Kept inline and tiny on purpose.
 */
const themeScript = `
(function(){
  var d = document.documentElement;
  try {
    var s = localStorage.getItem('theme');
    var t = s || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    d.setAttribute('data-theme', t);
  } catch (e) {
    d.setAttribute('data-theme', 'dark');
  }
  // Opts scroll-reveal in. Without this class every section stays visible,
  // so a JS failure degrades to a plain page rather than a blank one.
  d.classList.add('js');
})();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
